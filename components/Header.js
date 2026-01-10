import UserBox from "./UserBox";
import Link from "next/link";

export default function Header({ setPage, setModalBox, token, setToken }) {
  function Cart() {
    if (token !== null && token !== undefined) {
      return <li onClick={() => setPage("Cart")}>Корзина</li>;
    }
  }

  return (
    <div className="Header">
      <ul>
        <li onClick={() => setPage("Main")}>Главная</li>
        <Link href="/blog">
          <li>Блог</li>
        </Link>
        <Cart />
      </ul>
      <UserBox
        setModalBox={setModalBox}
        token={token}
        setToken={setToken}
        setPage={setPage}
      />
    </div>
  );
}
