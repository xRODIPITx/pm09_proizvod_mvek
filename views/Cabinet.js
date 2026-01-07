import { jwtDecode } from "jwt-decode";

function Cabinet({ token }) {
  function emailChange() {
    const email = document.getElementById("email").value;
    const data = { token: token, email: email };

    const emailRegex = email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

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

  return (
    <div className="Cabinet">
      <h1>Личный кабинет</h1>
      <p id="showEmail">Текущий e-mail: {jwtDecode(token).email}</p>
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

export default Cabinet;
