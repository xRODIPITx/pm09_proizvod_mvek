import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";

export default function AdminPage({ token }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [stats, setStats] = useState({
    productCount: 0,
    orderCount: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      if (decoded.role === "admin") {
        setIsAdmin(true);
        fetchStats();
      }
    } catch (err) {
      console.log("Ошибка декодирования токена:", err);
    }
  }, [token]);

  async function fetchStats() {
    const res = await fetch("/api/orders/stats");
    const data = await res.json();
    setStats(data);
  }

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
        <div>
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
        </div>
        {/* Статистика */}
        <div className="stats">
          <h2>Статистика</h2>
          <div className="stats-cont">
            <div className="stats-item">
              <span>Общее количество товаров:</span>
              <strong>{stats.productCount}</strong>
            </div>
            <div className="stats-item">
              <span>Общее количество заказов:</span>
              <strong>{stats.orderCount}</strong>
            </div>
            <div className="stats-item">
              <span>Общая выручка:</span>
              <strong>{stats.totalRevenue} ₽</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
