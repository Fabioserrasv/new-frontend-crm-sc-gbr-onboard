import { jwtDecode } from "jwt-decode";
import { User } from "../../core/entities/User";

export function getUserFromToken(token: string): User {
  const decodedToken = jwtDecode(token);
  return JSON.parse(decodedToken.sub!) as User;
}
