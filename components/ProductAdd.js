import { useState } from "react";
import { useRouter } from "next/router";

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
    "Защитные средства",
  ];
  const [category, setCategory] = useState(categories[0]);
  const router = useRouter();

  async function AddProduct() {
    const header = document.getElementById("header").value;
    const description = document.getElementById("description").value;
    const price = Number(document.getElementById("price").value);

    if (header.length === 0 || description.length === 0) {
      document.getElementById("addError").innerText = "Поля не заполнены";
      return;
    }

    const res = await fetch("/api/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ header, description, price, category }),
    });

    const result = await res.json();

    setMessage(result.message);
    setModalBox("MessageBox");

    setTimeout(() => {
      setModalBox("none");
      router.reload();
    }, 1500);
  }

  return (
    <>
      <h1>Добавить товар</h1>
      <input
        id="header"
        placeholder="Наименование"
        type="text"
        required
        minLength="4"
      />
      <textarea
        id="description"
        placeholder="Описание товара"
        type="text"
        rows="5"
      />
      <input
        id="price"
        placeholder="Стоимость"
        type="number"
        required
        minLength="1"
        min="1"
      />
      <label>Категория:</label>
      <select
        className="productAddModal"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <button id="send" onClick={() => AddProduct()}>
        Добавить
      </button>
      <p id="addError"></p>
    </>
  );
}
