import jwt from "jsonwebtoken";

export const generateAccessToken = (id, login, email) => {
  const payload = { id, login, email };
  return jwt.sign(payload, process.env.secret, { expiresIn: "24h" });
};
