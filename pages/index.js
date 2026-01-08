import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from "../views/Main";
import Cart from "../views/Cart";
import Cabinet from "../views/Cabinet.js";
import Blog from "../views/Blog";

export default function HomePage({ token, setToken, setModalBox, setMessage }) {
  const [page, setPage] = useState("Main");
  const [cart, setCart] = useState([]);
  const [cartPrice, setCartPrice] = useState(0);
  const [cartQty, setCartQty] = useState(0);

  const pages = {
    Main: (
      <Main
        setCart={setCart}
        setCartPrice={setCartPrice}
        setCartQty={setCartQty}
        cart={cart}
        setMessage={setMessage}
        token={token}
        setPage={setPage}
        setModalBox={setModalBox}
      />
    ),
    Cart: (
      <Cart
        cart={cart}
        setCart={setCart}
        cartPrice={cartPrice}
        setCartPrice={setCartPrice}
        cartQty={cartQty}
        setCartQty={setCartQty}
        setMessage={setMessage}
      />
    ),
    Cabinet: <Cabinet token={token} />,
    Blog: (
      <Blog token={token} setModalBox={setModalBox} setMessage={setMessage} />
    ),
  };

  return (
    <div className="App">
      <Header
        setPage={setPage}
        token={token}
        setToken={setToken}
        setModalBox={setModalBox}
      />
      {pages[page]}
      <Footer />
    </div>
  );
}
