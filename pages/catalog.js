import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Product from "../components/Product";

export default function Main({
  setCart,
  setCartPrice,
  setCartQty,
  cart,
  token,
  setModalBox,
  setMessage,
}) {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const router = useRouter();
  const search = router.query.search || "";

  const categories = [
    "Все",
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

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch(
        `/api/products?search=${encodeURIComponent(search)}`
      );
      const data = await res.json();
      setProducts(data.data);
    }

    fetchProducts();
  }, [search]);

  // Фильтрация продуктов по выбранной категории
  const filteredProducts =
    selectedCategory === "Все"
      ? products
      : products.filter((item) => item.category === selectedCategory);

  return (
    <div className="Main">
      <div className="section-title">
        <h1>Каталог</h1>
      </div>

      {/* Фильтр по категориям */}
      <div className="filter-block">
        <label>Категория:</label>
        <select
          className="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {search && (
        <p style={{ marginTop: "10px" }}>
          Результаты поиска: <strong>{search}</strong>
        </p>
      )}

      <div className="prodGrid">
        {filteredProducts.map((item) => (
          <Product
            key={item._id}
            id={item._id}
            header={item.header}
            image="/images/placeholder.png"
            price={item.price}
            setCart={setCart}
            setCartPrice={setCartPrice}
            setCartQty={setCartQty}
            cart={cart}
            token={token}
            setMessage={setMessage}
            setModalBox={setModalBox}
          />
        ))}
      </div>
    </div>
  );
}
