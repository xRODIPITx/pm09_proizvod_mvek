import { useState, useEffect } from "react";
import Product from "../components/Product";

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
        setProducts(result.data);
      });

    const fetchPosts = async () => {
      const res = await fetch("/api/blog?page=home"); // Добавляем параметр page=home
      const data = await res.json();
      setPosts(data.data);
    };

    fetchPosts();
  }, []);

  function AddProduct() {
    if (token !== null) {
      return (
        <>
          <button
            className="addProduct"
            onClick={() => setModalBox("ProductAdd")}
          >
            Добавить товар
          </button>
        </>
      );
    }
  }

  return (
    <div className="Main">
      <div className="section-title">
        <h1>Каталог</h1>
      </div>
      <AddProduct />
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
    </div>
  );
}
