import jwt from "jsonwebtoken";
import { Role } from "@prisma/client";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const generateToken = (
  id: string,
  role: Role
): string => {
  return jwt.sign(
    { id, role },
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};