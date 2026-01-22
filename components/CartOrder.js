import { useState } from "react";

export default function CartOrder({ cart, onSubmit, onClose }) {
  const [buyer, setBuyer] = useState({
    name: "",
    phone: "",
    address: "",
  });

  function handleSubmit() {
    if (!buyer.name || !buyer.phone || !buyer.address) {
      alert("Заполните все поля");
      return;
    }

    onSubmit(buyer);
  }

  return (
    <div className="order-form">
      <h2>Оформление заказа</h2>

      <input
        type="text"
        placeholder="Ваше имя"
        value={buyer.name}
        onChange={(e) => setBuyer({ ...buyer, name: e.target.value })}
      />

      <input
        type="text"
        placeholder="Телефон"
        value={buyer.phone}
        onChange={(e) => setBuyer({ ...buyer, phone: e.target.value })}
      />

      <input
        type="text"
        placeholder="Адрес доставки"
        value={buyer.address}
        onChange={(e) => setBuyer({ ...buyer, address: e.target.value })}
      />

      <div>
        <button className="order-btn" onClick={handleSubmit}>
          Подтвердить
        </button>

        <button className="back-btn" onClick={onClose}>
          Отмена
        </button>
      </div>
    </div>
  );
}
