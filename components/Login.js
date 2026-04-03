import { useState } from "react";

export default function Login({ setModalBox, setMessage, setToken }) {
  const [error, setError] = useState(""); // Состояние для ошибки

  function Log() {
    const login = document.getElementById("login").value;
    const password = document.getElementById("password").value;

    // Очистка предыдущих ошибок
    setError("");

    // Проверка на пустые поля
    if (password.length === 0 || login.length === 0) {
      setError("Ошибка ввода данных. Пожалуйста, заполните все поля.");
      return;
    }

    const data = {
      login: login,
      password: password,
    };

    const api = "/api/login";

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
          setError(result.message || "Ошибка при входе");
        }
      })
      .catch((err) => {
        // На случай сетевых ошибок или других проблем
        setError("Ошибка при подключении к серверу. Попробуйте снова.");
        console.error(err);
      });
  }

  return (
    <div className="login-cont">
      <h1>Логин</h1>
      <input id="login" type="text" placeholder="Логин" />
      <input id="password" type="password" placeholder="Пароль" />
      <button onClick={Log}>Войти</button>

      {/* Отображение ошибки, если она есть */}
      {error && <p id="formError">{error}</p>}
    </div>
  );
}
