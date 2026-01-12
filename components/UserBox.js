import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";

export default function UserBox({ setModalBox, setToken, token }) {
  const router = useRouter();

  function signOut() {
    if (typeof window !== "undefined") {
      setToken(null);
      localStorage.removeItem("token");
      router.push("/");
    }
  }

  const isLoggedIn = token && token !== "undefined";

  if (isLoggedIn) {
    const login = jwtDecode(token).login;

    return (
      <div className="UserBox">
        <p>Привет, {login}!</p>

        <button onClick={() => router.push("/cabinet")}>Личный кабинет</button>

        <button onClick={signOut}>Выйти</button>
      </div>
    );
  }

  return (
    <div className="UserBox">
      <button onClick={() => setModalBox("Login")}>Вход</button>
      <button onClick={() => setModalBox("Registration")}>Регистрация</button>
    </div>
  );
}
