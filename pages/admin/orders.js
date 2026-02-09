import { useEffect, useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    const res = await fetch("/api/orders");
    const data = await res.json();
    setOrders(data.data);
  }

  async function deleteOrder(id) {
    if (!confirm("Удалить заказ?")) return;

    const res = await fetch(`/api/orders/delete?id=${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    alert(data.message);
    fetchOrders(); // обновляем таблицу после удаления
  }

  return (
    <div className="AdminOrders">
      <div className="section-title">
        <h1>Заказы</h1>
      </div>

      <div className="products-table">
        <table>
          <thead>
            <tr>
              <th>ID пользователя</th>
              <th>Сумма</th>
              <th>Имя</th>
              <th>Телефон</th>
              <th>Адрес</th>
              <th>Дата</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                <td>{o.userId}</td>
                <td>{o.total} ₽</td>
                <td>{o.name}</td>
                <td>{o.phone}</td>
                <td>{o.address}</td>
                <td>{o.createdAt}</td>
                <td className="actions">
                  <button className="danger" onClick={() => deleteOrder(o._id)}>
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
