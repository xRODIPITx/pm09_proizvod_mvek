import connectDB from "../../lib/mongodb";
import User from "../../models/User";
import { generateAccessToken } from "../../lib/jwt";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  await connectDB(); // Подключение к базе данных

  if (req.method === "POST") {
    const { login, password } = req.body;

    if (!login || !password) {
      return res.status(400).json({ message: "Не указаны данные для входа" });
    }

    try {
      const user = await User.findOne({ login });

      if (!user) {
        return res.status(400).json({ message: "Пользователь не найден" });
      }

      // Проверка пароля
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Неверный пароль" });
      }

      // Генерация JWT токена
      const token = generateAccessToken(user._id, user.login, user.email);

      return res.status(200).json({
        message: "Вы успешно вошли на сайт!",
        token,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Неизвестная ошибка" });
    }
  } else {
    // Обработка других методов, если не POST
    return res.status(405).json({ message: "Метод не поддерживается" });
  }
}
