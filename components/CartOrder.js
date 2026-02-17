import { useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function CartOrder({
  cart,
  token,
  setCart,
  setCartQty,
  setCartPrice,
  setMessage,
  setModalBox,
  onClose,
}) {
  const [buyer, setBuyer] = useState({
    name: "",
    phone: "",
    address: "",
  });

  function numberFormat(e) {
    let value = e.target.value.replace(/\D/g, ""); // убираем всё кроме цифр

    if (value.startsWith("8")) {
      value = "7" + value.slice(1); // заменяем 8 на 7
    }

    if (!value.startsWith("7")) {
      value = "7" + value; // подставляем 7 если нет
    }

    // Формируем маску
    const formatted =
      "+7 " +
      (value.length > 1 ? "(" + value.substring(1, 4) : "") +
      (value.length >= 4 ? ") " + value.substring(4, 7) : "") +
      (value.length >= 7 ? "-" + value.substring(7, 9) : "") +
      (value.length >= 9 ? "-" + value.substring(9, 11) : "");

    setBuyer({ ...buyer, phone: formatted });
  }

  async function submit() {
    if (!buyer.name || !buyer.phone || !buyer.address) {
      alert("Заполните все поля");
      return;
    }

    // Массив товаров
    const items = cart.map((item) => ({
      productId: item.id,
      header: item.header,
      price: item.price,
      qty: item.qty || 1,
    }));

    const total = cart.reduce(
      (sum, item) => sum + item.price * (item.qty || 1),
      0,
    );

    let userId = null;
    if (token) {
      try {
        userId = jwtDecode(token).id;
      } catch (err) {
        console.log("Ошибка токена:", err);
      }
    }

    const orderData = {
      userId,
      items,
      total,
      name: buyer.name,
      phone: buyer.phone,
      address: buyer.address,
    };

    const res = await fetch("/api/orders/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    const data = await res.json();

    if (res.status === 201) {
      // очищаем корзину
      setCart([]);
      setCartQty(0);
      setCartPrice(0);

      setMessage("Заказ оформлен!");
      setModalBox("MessageBox");
    } else {
      alert(data.message || "Ошибка оформления заказа");
    }
  }

  return (
    <div className="order-form">
      <h2>Оформление заказа</h2>

      <input
        type="text"
        placeholder="Ваше имя"
        value={buyer.name}
        onChange={(e) => setBuyer({ ...buyer, name: e.target.value })}
        required
      />

      <input
        type="tel"
        placeholder="+7 (___) ___-__-__"
        value={buyer.phone}
        onChange={(e) => numberFormat(e)}
        maxLength={18}
        required
      />

      <input
        type="text"
        placeholder="Адрес доставки"
        value={buyer.address}
        onChange={(e) => setBuyer({ ...buyer, address: e.target.value })}
        required
      />

      <div>
        <button className="order-btn" onClick={submit}>
          Подтвердить
        </button>

        <button className="back-btn" onClick={onClose}>
          Отмена
        </button>
      </div>
    </div>
  );
}
