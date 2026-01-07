function ProductAdd({ setModalBox, setMessage, token }) {
  function AddProduct() {
    const header = document.getElementById("header").value;
    const price = document.getElementById("price").value;

    let message;

    if (header.length === 0) {
      document.getElementById("addProductError").innerText =
        "Данные введены неправильно";
      return;
    }

    const data = {
      header: header,
      price: price,
    };

    const api = "/api/products/add";

    fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((result) => result.json())
      .then((result) => (message = result.message));

    setTimeout(() => {
      setMessage(message);
      setModalBox("MessageBox");
    }, 100);
  }

  return (
    <div className="ProductAdd">
      <h1>Добавить товар</h1>
      <input id="header" placeholder="Наименование" type="text" />
      <input id="price" placeholder="Стоимость" type="number" />
      <button id="send" onClick={() => AddProduct()}>
        Добавить
      </button>
      <p id="addProductError"></p>
    </div>
  );
}

export default ProductAdd;
