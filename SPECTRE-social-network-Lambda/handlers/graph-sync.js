// handlers/graph-sync.js
import { query } from "../db/aurora.js";
import { graph } from "../db/neptune.js";
import { ok } from "../utils/response.js";

export async function syncUser(event) {
  const { user_id } = JSON.parse(event.body);

  const rows = await query(
    `SELECT users.user_id, countries.country_code
     FROM users
     LEFT JOIN countries ON countries.country_code = 'US'
     WHERE users.user_id=$1`,
    [user_id]
  );

  if (rows.length === 0) return ok({ skipped: true });

  const u = rows[0];
  const g = graph();

  await g.V().has("User", "user_id", u.user_id)
    .fold()
    .coalesce(
      __.unfold(),
      __.addV("User")
        .property("user_id", u.user_id)
        .property("country_code", u.country_code)
    )
    .next();

  return ok({ ok: true });
}