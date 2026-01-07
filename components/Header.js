import UserBox from "./UserBox";

function Header({ setPage, setModalBox, token, setToken }) {
  function Cart() {
    if (token !== null && token !== undefined) {
      return <li onClick={() => setPage("Cart")}>Корзина</li>;
    }
  }

  return (
    <div className="Header">
      <ul>
        <li onClick={() => setPage("Main")}>Главная</li>
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

export default Header;
