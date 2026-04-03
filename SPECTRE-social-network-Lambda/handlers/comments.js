// handlers/comments.js
import { query } from "../db/aurora.js";
import { ok } from "../utils/response.js";

export async function comment(event) {
  const { user_id, content_id, body } = JSON.parse(event.body);

  await query(
    `INSERT INTO content (user_id, content_id, content_type, visibility, body)
     VALUES (
       (SELECT id FROM users WHERE user_id=$1),
       gen_random_uuid(), 'COMMENT', 'PUBLIC', $2
     )`,
    [user_id, body]
  );

  return ok({ ok: true });
}