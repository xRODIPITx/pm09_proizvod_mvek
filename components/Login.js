export default function Login({ setModalBox, setMessage, setToken }) {
  function Log() {
    const login = document.getElementById("login").value;
    const password = document.getElementById("password").value;

    let message;

    if (password.length === 0) {
      document.getElementById("loginError").innerText = "Ошибка ввода данных";
      return;
    }

    const data = {
      login: login,
      password: password,
    };
    // console.log(data);

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
        message = result.message;
        if (result.token !== undefined && typeof window !== "undefined") {
          localStorage.setItem("token", result.token);
          setToken(result.token);
        }
      });
    setTimeout(() => {
      setMessage(message);
      setModalBox("MessageBox");
    }, 100);
  }

  return (
    <>
      <h1>Логин</h1>
      <input id="login" type="text" placeholder="Логин" />
      <input id="password" type="password" placeholder="Пароль" />
      <button onClick={Log}>Войти</button>
    </>
  );
}
