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
import "../styles/Banner.css";
import "../styles/Blog.css";

import { useState, useEffect } from "react";
import ModalBox from "../components/ModalBox";
import Login from "../components/Login";
import Registration from "../components/Registration";
import MessageBox from "../components/MessageBox";
import ProductAdd from "../components/ProductAdd";
import BlogPostAdd from "../components/BlogPostAdd";

export default function MyApp({ Component, pageProps }) {
  const [modalBox, setModalBox] = useState("none");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(null);

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
  };

  return (
    <>
      <Component
        {...pageProps}
        token={token}
        setToken={setToken}
        setModalBox={setModalBox}
        setMessage={setMessage}
      />
      {modalBoxes[modalBox]}
    </>
  );
}
