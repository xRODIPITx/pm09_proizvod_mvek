import { jwtDecode } from "jwt-decode";

export default function UserBox({ setPage, setModalBox, setToken, token }) {
  function signOut() {
    if (typeof window !== "undefined") {
      setToken(null);
      localStorage.removeItem("token");
      setPage("Main");
    }
  }

  function LoginPanel() {
    if (token && token !== "undefined") {
      const login = jwtDecode(token).login;

      return (
        <div className="UserBox">
          <p>Привет, {login}!</p>
          <button onClick={() => setPage("Cabinet")}>Личный кабинет</button>
          <button onClick={() => signOut()}>Выйти</button>
        </div>
      );
    } else {
      return (
        <div className="UserBox">
          <button onClick={() => setModalBox("Login")}>Вход</button>
          <button onClick={() => setModalBox("Registration")}>
            Регистрация
          </button>
        </div>
      );
    }
  }

  return <LoginPanel />;
}
