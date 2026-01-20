import jwt from "jsonwebtoken";

export const generateAccessToken = (id, login, email, role) => {
  const payload = { id, login, email, role };
  return jwt.sign(payload, process.env.secret, { expiresIn: "24h" });
};
