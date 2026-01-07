import connectDB from "../../../lib/mongodb.js";
import jwt from "jsonwebtoken";
import User from "../../../models/User.js";

export default async function handler(req, res) {
  await connectDB(); // Подключение к базе данных

  if (req.method === "POST") {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ message: "Токен не найден" });
    }

    try {
      // Проверка токена
      const { login } = jwt.verify(token, process.env.secret);

      // Обновление пользователя с новым email
      const user = await User.findOneAndUpdate(
        { login },
        { password },
        { returnOriginal: false }
      );

      if (!user) {
        return res.status(400).json({ message: "Пользователь не найден" });
      }

      return res.json({
        message: "Пароль изменен",
        newPass: user.password,
      });
    } catch (err) {
      // Обработка ошибок при проверке токена или обновлении
      if (err.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Неверный токен" });
      }

      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Истек срок действия токена" });
      }

      console.error(err);
      return res.status(500).json({ message: "Неизвестная ошибка" });
    }
  } else {
    // Обработка других методов, если не POST
    return res.status(405).json({ message: "Метод не поддерживается" });
  }
}
