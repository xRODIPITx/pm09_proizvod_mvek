import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from "../views/Main";
import Cart from "../views/Cart";
import Cabinet from "../views/Cabinet.js";
import ModalBox from "../components/ModalBox";
import Login from "../components/Login";
import Registration from "../components/Registration";
import MessageBox from "../components/MessageBox";
import ProductAdd from "../components/ProductAdd";

const HomePage = () => {
  const [page, setPage] = useState("Main");
  const [modalBox, setModalBox] = useState("none");
  const [token, setToken] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartPrice, setCartPrice] = useState(0);
  const [cartQty, setCartQty] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const pages = {
    Main: (
      <Main
        setCart={setCart}
        setCartPrice={setCartPrice}
        setCartQty={setCartQty}
        cart={cart}
        setMessage={setMessage}
        setModalBox={setModalBox}
        token={token}
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
        setModalBox={setModalBox}
      />
    ),
    Cabinet: <Cabinet token={token} />,
  };

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
        <MessageBox setModalBox={setModalBox} message={message} />
      </ModalBox>
    ),
    ProductAdd: (
      <ModalBox setModalBox={setModalBox}>
        <ProductAdd setModalBox={setModalBox} setMessage={setMessage} />
      </ModalBox>
    ),
  };

  return (
    <div className="App">
      <Header
        setPage={setPage}
        setModalBox={setModalBox}
        token={token}
        setToken={setToken}
      />
      {pages[page]}
      {modalBoxes[modalBox]}
      <Footer />
    </div>
  );
};

export default HomePage;
