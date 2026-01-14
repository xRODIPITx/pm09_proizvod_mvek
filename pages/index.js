import { useState, useEffect } from "react";
import Product from "../components/Product";
import Link from "next/link";

export default function Main({
  setCart,
  setCartPrice,
  setCartQty,
  cart,
  token,
  setModalBox,
  setMessage,
}) {
  const [products, setProducts] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const api = "/api/products";
    fetch(api, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((result) => result.json())
      .then((result) => {
        // console.log(result);
        setProducts(result.data.slice(0, 5));
      });

    const fetchPosts = async () => {
      const res = await fetch("/api/blog?page=home"); // Добавляем параметр page=home
      const data = await res.json();
      setPosts(data.data);
    };

    fetchPosts();
  }, []);

  return (
    <div className="Main">
      <div className="banner">
        <p className="banner_message">
          Добро пожаловать в наш магазин! Здесь вы найдете все необходимое для
          пикника и туризма.
        </p>
      </div>
      <div className="section-title">
        <h1>Рекомендуемые товары</h1>
      </div>
      <div className="prodGrid">
        {products.map((item) => (
          <Product
            key={item._id}
            id={item._id}
            header={item.header}
            image="/images/product.jpg"
            price={item.price}
            setCart={setCart}
            setCartPrice={setCartPrice}
            setCartQty={setCartQty}
            cart={cart}
            token={token}
            setMessage={setMessage}
            setModalBox={setModalBox}
          />
        ))}
      </div>

      {/* Добавляем блок с последними статьями */}
      <div className="section-title">
        <h1>Последние статьи</h1>
      </div>
      <div className="blog-posts">
        {posts.map((post) => (
          <div key={post._id} className="blog-post">
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 150)}...</p>
            <Link href={`/blog/${post._id}`} className="read-more">
              Читать дальше
            </Link>
          </div>
        ))}
      </div>

      {/* Ссылка на полную страницу блога */}
      <div className="blog-link">
        <Link href="/blog">Посмотреть все статьи</Link>
      </div>
    </div>
  );
}
