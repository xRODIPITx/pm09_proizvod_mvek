import "../styles/index.css";
import "../styles/Cabinet.css";
import "../styles/Cart.css";
import "../styles/Footer.css";
import "../styles/Header.css";
import "../styles/Main.css";
import "../styles/MessageBox.css";
import "../styles/ModalBox.css";
import "../styles/Product.css";
import "../styles/ProductCart.css";
import "../styles/UserBox.css";
import "../styles/Blog.css";
import "../styles/ProductAdd.css";
import "../styles/Catalog.css";
import "../styles/Admin.css";

import { useState, useEffect } from "react";
import ModalBox from "../components/ModalBox";
import Login from "../components/Login";
import Registration from "../components/Registration";
import MessageBox from "../components/MessageBox";
import ProductAdd from "../components/ProductAdd";
import BlogPostAdd from "../components/BlogPostAdd";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserBox from "../components/UserBox";
import ProductEdit from "../components/ProductEdit";

export default function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState([]);
  const [cartPrice, setCartPrice] = useState(0);
  const [cartQty, setCartQty] = useState(0);
  const [message, setMessage] = useState("");
  const [modalBox, setModalBox] = useState("none");
  const [token, setToken] = useState(null);
  const [editProduct, setEditProduct] = useState(null);

  async function fetchProducts() {
    // Это заглушка, её перезапишет страница admin/products
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const modalBoxes = {
    none: null,

    Login: (
      <ModalBox setModalBox={setModalBox}>
        <Login
          setModalBox={setModalBox}
          setMessage={setMessage}
          setToken={setToken}
        />
      </ModalBox>
    ),

    Registration: (
      <ModalBox setModalBox={setModalBox}>
        <Registration setModalBox={setModalBox} setMessage={setMessage} />
      </ModalBox>
    ),

    MessageBox: (
      <ModalBox setModalBox={setModalBox}>
        <MessageBox message={message} setModalBox={setModalBox} />
      </ModalBox>
    ),

    ProductAdd: (
      <ModalBox setModalBox={setModalBox}>
        <ProductAdd
          setModalBox={setModalBox}
          setMessage={setMessage}
          setToken={setToken}
        />
      </ModalBox>
    ),
    BlogPostAdd: (
      <ModalBox setModalBox={setModalBox}>
        <BlogPostAdd
          setModalBox={setModalBox}
          setMessage={setMessage}
          setToken={setToken}
        />
      </ModalBox>
    ),
    ProductEdit: (
      <ModalBox setModalBox={setModalBox}>
        <ProductEdit
          product={editProduct}
          setModalBox={setModalBox}
          setMessage={setMessage}
          onUpdated={fetchProducts}
        />
      </ModalBox>
    ),
  };

  return (
    <>
      <Header token={token} setToken={setToken} setModalBox={setModalBox}>
        <UserBox token={token} setToken={setToken} setModalBox={setModalBox} />
      </Header>

      <Component
        {...pageProps}
        cart={cart}
        setCart={setCart}
        cartPrice={cartPrice}
        setCartPrice={setCartPrice}
        cartQty={cartQty}
        setCartQty={setCartQty}
        token={token}
        setToken={setToken}
        modalBox={modalBox}
        setModalBox={setModalBox}
        message={message}
        setMessage={setMessage}
        editProduct={editProduct}
        setEditProduct={setEditProduct}
        fetchProducts={fetchProducts}
      />
      {modalBoxes[modalBox]}
      <Footer />
    </>
  );
}
