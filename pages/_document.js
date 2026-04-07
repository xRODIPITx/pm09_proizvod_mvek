import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ru">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Lora:wght@400;700&display=swap"
            rel="stylesheet"
          />
          <meta
            name="description"
            content="Товары для пикника и туризма — это интернет-магазин, предлагающий разнообразные товары для активного отдыха, пикников и туризма. Пользователи могут удобно просматривать и фильтровать товары, оформлять заказы, а также читать полезные статьи на блоге и оставлять отзывы о продуктах."
          />

          <link
            rel="icon"
            type="image/png"
            href="/favicon-96x96.png"
            sizes="96x96"
          />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <meta
            name="apple-mobile-web-app-title"
            content="Товары для пикника и туризма"
          />
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
