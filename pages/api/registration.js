import connectDB from "../../lib/mongodb";
import User from "../../models/User";
import { generateAccessToken } from "../../lib/jwt";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  await connectDB(); // Подключение к базе данных

  if (req.method === "POST") {
    try {
      const { login, password, email } = req.body;
      if (!login || !email || !password) {
        return res
          .status(400)
          .json({ message: "Все поля обязательны для заполнения" });
      }

      // Хешируем пароль
      const hashedPassword = await bcrypt.hash(password, 10); // 10 — соль

      // Создаём юзера
      const user = new User({
        login,
        email,
        password: hashedPassword,
      });
      await user.save();

      // Генерация JWT токена
      const token = generateAccessToken(
        user._id,
        user.login,
        user.email,
        user.role,
      );

      return res.status(201).json({
        success: true,
        message: "Пользователь успешно зарегистрирован",
        token,
      });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(409).json({ message: "Пользователь уже существует" });
      }
      return res
        .status(500)
        .json({ message: "Произошла ошибка при регистрации", error });
    }
  } else {
    return res.status(405).json({ message: "Метод не поддерживается" });
  }
}
