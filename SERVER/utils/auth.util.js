import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  if (!process.env.SECRET_KEY) {
    throw new Error("Secret key is not defined in environment variables");
  }

  try {
    return jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email, 
      },
      process.env.SECRET_KEY,
      { expiresIn: "7d" } 
    );
  } catch (error) {
    throw new Error("Error generating token: " + error.message);
  }
};
