// handlers/posts.js
import { query } from "../db/aurora.js";
import { graph } from "../db/neptune.js";
import { ok } from "../utils/response.js";
import { v4 as uuid } from "uuid";

export async function createPost(event) {
  const { user_id, body, visibility } = JSON.parse(event.body);
  const contentId = uuid();

  await query(
    `INSERT INTO content (user_id, content_id, content_type, visibility, body)
     VALUES (
       (SELECT id FROM users WHERE user_id=$1),
       $2, 'POST', $3, $4
     )`,
    [user_id, contentId, visibility, body]
  );

  const g = graph();
  await g.addV("Content")
    .property("content_id", contentId)
    .property("content_type", "POST")
    .property("visibility", visibility)
    .next();

  await g.V().has("User", "user_id", user_id)
    .addE("CREATED")
    .to(g.V().has("Content", "content_id", contentId))
    .next();

  return ok({ contentId });
}