import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export default function Cabinet({ token }) {
  const [localToken, setLocalToken] = useState(token || null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    if (!localToken && typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) setLocalToken(storedToken);
    }
  }, [localToken]);

  useEffect(() => {
    // Декодируем токен, когда он появился
    if (token && typeof token === "string") {
      try {
        const decoded = jwtDecode(token);
        setEmail(decoded.email);
      } catch (err) {
        console.warn("Ошибка декодирования токена:", err);
      }
    }
  }, [token]);

  function emailChange() {
    const emailValue = document.getElementById("email").value;
    const data = { token: token, email: emailValue };

    const emailRegex = emailValue.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

    if (!emailRegex) {
      document.getElementById("errorMessage").innerText =
        "Данные введены неправильно";
      return;
    }

    const api = "/api/user/changeEmail";

    fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((result) => result.json())
      .then((result) => {
        document.getElementById("errorMessage").innerText = result.message;
      });
  }

  function passwordChange() {
    const password = document.getElementById("password").value;

    if (password.length <= 3) {
      document.getElementById("errorMessage").innerText =
        "Неправильно введены данные";
      return;
    }

    const data = { token: token, password: password };

    const api = "/api/user/changePassword";

    fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((result) => result.json())
      .then((result) => {
        document.getElementById("errorMessage").innerText = result.message;
      });
  }

  // Показ до авторизации
  if (!email) {
    return (
      <div className="Cabinet">
        <h1>Личный кабинет</h1>
        <p>Вы не авторизованы</p>
      </div>
    );
  }

  return (
    <div className="Cabinet">
      <div className="section-title">
        <h1>Личный кабинет</h1>
      </div>
      <p id="showEmail">Текущий e-mail: {email}</p>

      <input id="email" placeholder="Новый Email" type="email" />
      <button id="sendEmail" onClick={emailChange}>
        Сменить почту
      </button>

      <p id="errorMessage"></p>

      <input
        id="password"
        placeholder="Новый пароль (от 4 символов)"
        type="password"
      />
      <button id="sendPassword" onClick={passwordChange}>
        Сменить пароль
      </button>

      <p id="errorMessage"></p>
    </div>
  );
}
