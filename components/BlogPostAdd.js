export default function BlogPostAdd({ setModalBox, setMessage }) {
  async function AddBlogPost() {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    if (title.length === 0 || content.length === 0) {
      document.getElementById("addError").innerText =
        "Поля обязательны для заполнения";
      return;
    }

    const res = await fetch("/api/blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    const result = await res.json();

    setMessage(result.message);
    setModalBox("MessageBox");

    setTimeout(() => {
      setModalBox("none");
      window.location.href = "/";
    }, 1500);
  }

  return (
    <>
      <h1>Добавить пост</h1>
      <input
        id="title"
        placeholder="Заголовок поста"
        type="text"
        minLength="4"
      />
      <textarea
        id="content"
        placeholder="Содержимое поста"
        type="text"
        rows="5"
      />
      <button id="send" onClick={() => AddBlogPost()}>
        Создать
      </button>
      <p id="addError"></p>
    </>
  );
}
