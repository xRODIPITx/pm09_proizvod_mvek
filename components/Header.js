import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Header({ token, children }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function searchFunction(e) {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/catalog?search=${encodeURIComponent(query.trim())}`);
  }

  return (
    <div className="Header">
      <ul className="nav-menu">
        <li>
          <Link href="/" className="nav-link">
            Главная
          </Link>
        </li>

        {/* Форма поиска */}
        <form className="search-form" onSubmit={searchFunction}>
          <input
            type="text"
            placeholder="Поиск товара..."
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="search-btn">
            🔍
          </button>
        </form>

        <li>
          <Link href="/catalog" className="nav-link">
            Каталог
          </Link>
        </li>

        {token && (
          <li>
            <Link href="/cart" className="nav-link">
              Корзина
            </Link>
          </li>
        )}
        <li>
          <Link href="/blog" className="nav-link">
            Блог
          </Link>
        </li>
      </ul>

      {children}
    </div>
  );
}
