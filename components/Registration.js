import { useState } from "react";

export default function Registration({ setModalBox, setMessage, setToken }) {
  const [error, setError] = useState(""); // Состояние для ошибки

  function Reg() {
    const login = document.getElementById("login").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;

    setError("");

    const emailRegex = email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

    if (!emailRegex) {
      document.getElementById("regError").innerText =
        "Вы ввели данные неправильно!";
      return;
    }

    if (password.length <= 3 && login.length < 3) {
      document.getElementById("regError").innerText =
        "Вы ввели данные неправильно!";
      return;
    }

    const data = {
      login: login,
      password: password,
      email: email,
    };
    // console.log(data);

    const api = "/api/registration";

    fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((result) => result.json())
      .then((result) => {
        if (result.token) {
          // Сохраняет токен если он есть и показывает сообщение
          localStorage.setItem("token", result.token);
          setToken(result.token);
          setMessage(result.message);
          setModalBox("MessageBox");
        } else {
          // Показывает ошибку если токен отсутствует
          setError(result.message || "Ошибка регистрации");
        }
      })
      .catch((err) => {
        // На случай сетевых ошибок или других проблем
        setError("Ошибка при подключении к серверу. Попробуйте снова.");
        console.error(err);
      });
  }

  return (
    <>
      <h1>Регистрация</h1>
      <input
        id="login"
        type="text"
        placeholder="Логин (от 3 символов)"
        required
        minLength="3"
      />
      <input
        id="password"
        type="password"
        placeholder="Пароль (от 4 символов)"
        required
        minLength="4"
      />
      <input id="email" type="email" placeholder="Адрес почты" required />
      <button onClick={Reg}>Сохранить</button>
      {error && <p id="formError">{error}</p>}
    </>
  );
}
