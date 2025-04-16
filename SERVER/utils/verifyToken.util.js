import jwt from "jsonwebtoken";

export const verifyToken = (token) => {
  try {
    const secretKey = process.env.SECRET_KEY;
    return jwt.verify(token, secretKey);
  } catch (error) {
    return { error: error.message };
  }
};
