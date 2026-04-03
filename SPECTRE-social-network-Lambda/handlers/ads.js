// handlers/ads.js
import { query } from "../db/aurora.js";
import { ok } from "../utils/response.js";

export async function getAds(event) {
  const { region } = JSON.parse(event.body);

  const ads = await query(
    "SELECT * FROM ads WHERE target_region=$1 ORDER BY created_at DESC LIMIT 20",
    [region]
  );

  return ok({ ads });
}