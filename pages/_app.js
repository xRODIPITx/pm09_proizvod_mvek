import "../styles/index.css";
import "../styles/Cabinet.css";
import "../styles/Cart.css";
import "../styles/Footer.css";
import "../styles/Header.css";
import "../styles/Main.css";
import "../styles/MessageBox.css";
import "../styles/ModalBox.css";
import "../styles/Product.css";
import "../styles/ProductAdd.css";
import "../styles/ProductCart.css";
import "../styles/UserBox.css";
import "../styles/Banner.css";
import "../styles/Blog.css";

function MyApp({ Component, pageProps }) {
  return (
    // Здесь можно добавить глобальные компоненты, например, контексты
    <Component {...pageProps} />
  );
}

export default MyApp;
