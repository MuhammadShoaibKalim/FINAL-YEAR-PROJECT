import jwt from "jsonwebtoken";
export const generateToken = (user) => {
  if (!process.env.SECRET_KEY) {
    throw new Error("Secret key is not defined in environment variables");
  }

  const payload = {
    id: user._id,
    role: user.role,
    email: user.email,
  };
  
  if (user.role === "labadmin" && user.labId) {
    payload.lab = user.labId; 
  }
  

  try {
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "7d" });
  } catch (error) {
    throw new Error("Error generating token: " + error.message);
  }
};
