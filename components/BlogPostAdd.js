function BlogPostAdd({ setModalBox, setMessage, token }) {
  function AddBlogPost() {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    let message;

    if (header.length === 0) {
      document.getElementById("addProductError").innerText =
        "Данные введены неправильно";
      return;
    }

    const data = {
      title,
      content,
    };

    const api = "/api/blog";

    fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((result) => result.json())
      .then((result) => (message = result.message));

    setTimeout(() => {
      setMessage(message);
      setModalBox("MessageBox");
    }, 100);
  }

  return (
    <>
      <h1>Добавить пост</h1>
      <input id="title" placeholder="Заголовок поста" type="text" />
      <input id="content" placeholder="Содержимое поста" type="text" />
      <button id="send" onClick={() => AddBlogPost()}>
        Создать
      </button>
      <p id="addProductError"></p>
    </>
  );
}

export default BlogPostAdd;
