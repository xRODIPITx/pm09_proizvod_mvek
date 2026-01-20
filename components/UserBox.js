import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";
import Link from "next/link";

export default function UserBox({ setModalBox, setToken, token }) {
  const router = useRouter();

  function signOut() {
    if (typeof window !== "undefined") {
      setToken(null);
      localStorage.removeItem("token");
      router.push("/");
    }
  }

  function LoginPanel() {
    if (token && token !== "undefined") {
      const decoded = jwtDecode(token);
      const login = decoded.login;
      const role = decoded.role;

      return (
        <div className="UserBox">
          <p>Привет, {login}!</p>

          {role === "admin" ? (
            <Link href="/admin">
              <button className="admin-btn">Админ-панель</button>
            </Link>
          ) : (
            <Link href="/cabinet">
              <button className="cabinet-btn">Личный кабинет</button>
            </Link>
          )}

          <button onClick={signOut}>Выйти</button>
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
