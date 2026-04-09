import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Product from "../components/Product";

export default function Main({
  setCart,
  setCartPrice,
  setCartQty,
  cart,
  token,
  setMessage,
  setModalBox,
}) {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [sortOption, setSortOption] = useState("rating-desc");
  const router = useRouter();
  const search = router.query.search || "";
  const [ratings, setRatings] = useState({});

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
        `/api/products?search=${encodeURIComponent(search)}`,
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

  // Обработчик для получения рейтинга
  const handleRatingLoaded = (id, rating) => {
    setRatings((prevRatings) => ({ ...prevRatings, [id]: rating }));
  };

  // Функция для сортировки товаров
  const sortProducts = (products, option) => {
    return [...products].sort((a, b) => {
      const [criterion, direction] = option.split("-");
      let comparison = 0;

      if (criterion === "order") {
        comparison = a._id.localeCompare(b._id);
      } else if (criterion === "price") {
        comparison = a.price - b.price;
      } else if (criterion === "header") {
        comparison = a.header.localeCompare(b.header);
      } else if (criterion === "rating") {
        const aRating = ratings[a._id] || 0;
        const bRating = ratings[b._id] || 0;
        comparison = aRating - bRating;
      }

      return direction === "asc" ? comparison : -comparison;
    });
  };

  // Отсортированные товары
  const sortedProducts = sortProducts(filteredProducts, sortOption);

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

      {/* Сортировка по критерию и направлению */}
      <div className="sorting-controls">
        <label>Сортировка:</label>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="order-asc">По порядку (сначала старые)</option>
          <option value="order-desc">По порядку (сначала новые)</option>
          <option value="price-asc">Цена (по возрастанию)</option>
          <option value="price-desc">Цена (по убыванию)</option>
          <option value="rating-asc">Рейтинг (по возрастанию)</option>
          <option value="rating-desc">Рейтинг (по убыванию)</option>
          <option value="header-asc">Название (по возрастанию)</option>
          <option value="header-desc">Название (по убыванию)</option>
        </select>
      </div>

      {search && (
        <p style={{ marginTop: "10px" }}>
          Поиск по запросу: <strong>{search}</strong>
        </p>
      )}

      <div className="prodGrid">
        {sortedProducts.map((item) => (
          <Product
            key={item._id}
            id={item._id}
            header={item.header}
            image={item.image}
            price={item.price}
            setCart={setCart}
            setCartPrice={setCartPrice}
            setCartQty={setCartQty}
            cart={cart}
            token={token}
            setMessage={setMessage}
            setModalBox={setModalBox}
            onRatingLoaded={handleRatingLoaded}
          />
        ))}
      </div>
    </div>
  );
}
