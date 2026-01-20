import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";

export default function AdminPage({ token, setModalBox, setMessage }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      if (decoded.role === "admin") {
        setIsAdmin(true);
      }
    } catch (err) {
      console.log("Ошибка декодирования токена:", err);
    }
  }, [token]);

  // блок для обычных пользователей
  if (!token || !isAdmin) {
    return (
      <div className="Admin">
        <h1>Доступ запрещён</h1>
        <h4>Эта страница доступна только администраторам.</h4>
        <Link href="/">
          <button className="back-to-main">На главную</button>
        </Link>
      </div>
    );
  }

  // блок для администратора
  return (
    <div className="Admin">
      <div className="section-title">
        <h1>Панель администратора</h1>
      </div>

      <div className="admin-grid">
        {/* Управление товарами */}
        <div className="admin-card">
          <h2>Управление товарами</h2>
          <div className="admin-card-btn">
            <Link href="/admin/products">
              <button>Список товаров</button>
            </Link>
          </div>
        </div>

        {/* Управление заказами */}
        <div className="admin-card">
          <h2>Управление заказами</h2>
          <div className="admin-card-btn">
            <Link href="/admin/orders">
              <button>Посмотреть заказы</button>
            </Link>
          </div>
        </div>

        {/* Статистика */}
        <div className="admin-card">
          <h2>Статистика</h2>
          <div className="admin-card-btn">
            <Link href="/admin/stats">
              <button>Просмотр статистики</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
