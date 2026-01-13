import Link from "next/link";

export default function Header({ token, children }) {
  return (
    <div className="Header">
      <ul>
        <li>
          <Link href="/" className="nav-link">
            Главная
          </Link>
        </li>
        <li>
          <Link href="/catalog" className="nav-link">
            Каталог
          </Link>
        </li>
        <li>
          <Link href="/blog" className="nav-link">
            Блог
          </Link>
        </li>
        {token && (
          <li>
            <Link href="/cart" className="nav-link">
              Корзина
            </Link>
          </li>
        )}
      </ul>

      {children}
    </div>
  );
}
