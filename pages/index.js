import { useState, useEffect } from "react";
import Product from "../components/Product";
import Link from "next/link";

export default function Main({
  setCart,
  setCartPrice,
  setCartQty,
  cart,
  token,
  setMessage,
  setModalBox,
}) {
  const [products, setProducts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [ratings, setRatings] = useState({});
  const [sortOption, setSortOption] = useState("rating-desc");

  // Обработчик для получения рейтинга
  const handleRatingLoaded = (id, rating) => {
    setRatings((prevRatings) => ({ ...prevRatings, [id]: rating }));
  };

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
        setProducts(result.data);
      });

    const fetchPosts = async () => {
      const res = await fetch("/api/blog?page=home");
      const data = await res.json();
      setPosts(data.data);
    };

    fetchPosts();
  }, []);

  // Функция для сортировки товаров по рейтингу
  const sortProducts = (products, option) => {
    return [...products].sort((a, b) => {
      const [criterion, direction] = option.split("-");
      let comparison = 0;

      if (criterion === "rating") {
        const aRating = ratings[a._id] || 0;
        const bRating = ratings[b._id] || 0;
        comparison = aRating - bRating;
      }

      return direction === "asc" ? comparison : -comparison;
    });
  };

  // Сортированные товары
  const sortedProducts = sortProducts(products, sortOption);

  // Отображать только первые 5 товаров
  const topProducts = sortedProducts.slice(0, 5);

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
        {topProducts.map((item) => (
          <Product
            key={item._id}
            id={item._id}
            header={item.header}
            image={item.image}
            price={item.price}
            setCart={setCart}
            setCartPrice={setCartPrice}
            setCartQty={setCartQty}
            cart={cart}
            token={token}
            setMessage={setMessage}
            setModalBox={setModalBox}
            onRatingLoaded={handleRatingLoaded}
          />
        ))}
      </div>

      <Link href={"/catalog"} className="read-more">
        Открыть каталог
      </Link>

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

      {/* Ссылка на страницу блога */}
      <div className="blog-link">
        <Link href="/blog">Посмотреть все статьи</Link>
      </div>
    </div>
  );
}
