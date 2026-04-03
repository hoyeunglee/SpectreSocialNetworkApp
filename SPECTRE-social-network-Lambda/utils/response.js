// utils/response.js
export function ok(body) {
  return { statusCode: 200, body: JSON.stringify(body) };
}

export function error(msg, code = 400) {
  return { statusCode: code, body: JSON.stringify({ error: msg }) };
}