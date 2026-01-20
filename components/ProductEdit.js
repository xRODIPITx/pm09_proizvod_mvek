import { useState, useEffect } from "react";

export default function ProductEdit({
  product,
  setModalBox,
  setMessage,
  onUpdated,
}) {
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

  const [header, setHeader] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(categories[0]);

  useEffect(() => {
    if (product) {
      setHeader(product.header);
      setPrice(product.price);
      setCategory(product.category);
    }
  }, [product]);

  async function updateProduct() {
    if (!header || !price) {
      setMessage("Заполните все поля!");
      setModalBox("MessageBox");
      return;
    }

    const res = await fetch(`/api/products/update?id=${product._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ header, price, category }),
    });

    const data = await res.json();

    setMessage(data.message);
    setModalBox("MessageBox");

    if (res.status === 200 && onUpdated) {
      onUpdated(); // обновить список товаров в админке
    }
  }

  return (
    <div className="ProductEdit">
      <h1>Редактировать товар</h1>

      <label>Название:</label>
      <input
        type="text"
        value={header}
        onChange={(e) => setHeader(e.target.value)}
      />

      <label>Цена:</label>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <label>Категория:</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <button className="prod-edit-save" onClick={updateProduct}>
        Сохранить
      </button>
    </div>
  );
}
