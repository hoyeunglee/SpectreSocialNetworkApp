// handlers/auth.js
import bcrypt from "bcryptjs";
import { query } from "../db/aurora.js";
import { sign } from "../utils/jwt.js";
import { ok, error } from "../utils/response.js";

export async function login(event) {
  const { email, password } = JSON.parse(event.body);

  const rows = await query(
    "SELECT id, user_id, password_hash FROM users WHERE email=$1",
    [email]
  );

  if (rows.length === 0) return error("Invalid credentials", 401);

  const user = rows[0];
  const valid = await bcrypt.compare(password, user.password_hash);

  if (!valid) return error("Invalid credentials", 401);

  return ok({ token: sign({ uid: user.user_id }) });
}