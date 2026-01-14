import { useState } from "react";

export default function ProductAdd({ setModalBox, setMessage }) {
  const categories = [
    "Палатки",
    "Спальные мешки и коврики",
    "Туристическая мебель",
    "Посуда и кухонные принадлежности",
    "Грили и мангалы",
    "Питьевые системы и термосы",
    "Рюкзаки и сумки",
    "Тенты и навесы",
    "Аксессуары для костра",
    "Средства от насекомых и солнца",
  ];
  const [category, setCategory] = useState(categories[0]);

  function AddProduct() {
    const header = document.getElementById("header").value;
    const price = document.getElementById("price").value;
    // const category = document.getElementById("category").value;

    let message;

    if (header.length === 0) {
      document.getElementById("addProductError").innerText =
        "Данные введены неправильно";
      return;
    }

    const data = { header, price, category };

    const api = "/api/products/add";

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
      <h1>Добавить товар</h1>
      <input
        id="header"
        placeholder="Наименование"
        type="text"
        required
        minlength="4"
      />
      <input
        id="price"
        placeholder="Стоимость"
        type="number"
        required
        minlength="1"
      />
      <label>Категория:</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <button id="send" onClick={() => AddProduct()}>
        Добавить
      </button>
      <p id="addProductError"></p>
    </>
  );
}
