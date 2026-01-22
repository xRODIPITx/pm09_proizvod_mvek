import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";

export default function AdminProducts({
  token,
  setModalBox,
  setEditProduct,
  fetchProducts,
}) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      if (decoded.role === "admin") {
        setIsAdmin(true);
        fetchProducts();
      }
    } catch (err) {
      console.log("Ошибка токена:", err);
    }
  }, [token]);

  async function fetchProducts() {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data.data);
  }

  async function deleteProduct(id) {
    if (!confirm("Удалить товар?")) return;

    const res = await fetch(`/api/products/delete?id=${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    // setMessage(data.message);
    // setModalBox("MessageBox");

    fetchProducts(); // обновление списка
  }

  if (!token || !isAdmin) {
    return (
      <div className="Admin">
        <h2>Доступ запрещён</h2>
        <Link href="/">
          <button>На главную</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="AdminProducts">
      <div>
        <h1>Управление товарами</h1>
      </div>
      <div className="prod-head-btn">
        <button onClick={() => setModalBox("ProductAdd")}>
          Добавить товар
        </button>
        <Link href="/admin">
          <button>Назад</button>
        </Link>
      </div>

      <div className="products-table">
        <table>
          <thead>
            <tr>
              <th>Название</th>
              <th>Категория</th>
              <th>Цена</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>{p.header}</td>
                <td>{p.category}</td>
                <td>{p.price} ₽</td>
                <td className="actions">
                  <button
                    onClick={() => {
                      setEditProduct(p);
                      setModalBox("ProductEdit");
                    }}
                  >
                    Изменить
                  </button>
                  <button
                    className="danger"
                    onClick={() => deleteProduct(p._id)}
                  >
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
