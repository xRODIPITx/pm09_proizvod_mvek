function Registration({ setModalBox, setMessage }) {
  function Reg() {
    const login = document.getElementById("login").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;

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

    let message;

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
        message = result.message;
        setMessage(message);
        setModalBox("MessageBox");
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
        minlength="3"
      />
      <input
        id="password"
        type="password"
        placeholder="Пароль (от 4 символов)"
        required
        minlength="4"
      />
      <input id="email" type="email" placeholder="Адрес почты" required />
      <button onClick={Reg}>Сохранить</button>
      <p id="regError"></p>
    </>
  );
}

export default Registration;
