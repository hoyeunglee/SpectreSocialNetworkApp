// handlers/friends.js
import { graph } from "../db/neptune.js";
import { ok } from "../utils/response.js";

export async function addFriend(event) {
  const { user_id, friend_id } = JSON.parse(event.body);

  const g = graph();

  await g.V().has("User", "user_id", user_id)
    .addE("FRIEND_OF")
    .to(g.V().has("User", "user_id", friend_id))
    .property("since", Date.now())
    .next();

  return ok({ ok: true });
}