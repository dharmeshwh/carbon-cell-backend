import jwt from "jsonwebtoken";

export const signJwt = (userId: string) => {
  const jwtSecret = process.env.JWT_SECRET || "";
  return jwt.sign({ userId }, jwtSecret, {
    expiresIn: 60 * 60 * 12,
  });
};
