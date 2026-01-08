import UserBox from "./UserBox";

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
        <li onClick={() => setPage("Blog")}>Блог</li>
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
