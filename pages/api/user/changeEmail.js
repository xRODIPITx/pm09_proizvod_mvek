import connectDB from "../../../lib/mongodb.js";
import jwt from "jsonwebtoken";
import User from "../../../models/User.js";

export default async function handler(req, res) {
  await connectDB(); // Подключение к базе данных

  if (req.method === "POST") {
    const { token, email } = req.body;

    if (!token || !email) {
      console.log({ token });
      return res.status(400).json({ message: "Токен не найден" });
    }

    try {
      // Проверка токена
      const { login } = jwt.verify(token, process.env.secret);

      // Обновление пользователя с новым email
      const user = await User.findOneAndUpdate(
        { login },
        { email },
        { returnOriginal: false }
      );

      if (!user) {
        console.log({ login });
        return res.status(400).json({ message: "Пользователь не найден" });
      }

      return res.json({
        message:
          "Email изменен, для отображения нового адреса почты войдите заново",
        newEmail: user.email,
      });
    } catch (err) {
      // Обработка ошибок при проверке токена или обновлении
      if (err.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Неверный токен" });
      }

      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Истек срок действия токена" });
      }

      if (err.code === 11000) {
        return res.status(400).json({ message: "Почта уже используется" });
      }

      console.error(err);
      return res.status(500).json({ message: "Неизвестная ошибка" });
    }
  } else {
    // Обработка других методов, если не POST
    return res.status(405).json({ message: "Метод не поддерживается" });
  }
}
