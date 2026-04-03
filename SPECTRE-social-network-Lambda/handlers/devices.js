// handlers/devices.js
import { query } from "../db/aurora.js";
import { ok } from "../utils/response.js";

export async function registerDevice(event) {
  const { user_id, device_id_hash, platform, os_version } =
    JSON.parse(event.body);

  await query(
    `INSERT INTO devices (user_id, device_id_hash, platform, os_version)
     VALUES (
       (SELECT id FROM users WHERE user_id=$1),
       $2, $3, $4
     )`,
    [user_id, device_id_hash, platform, os_version]
  );

  return ok({ ok: true });
}