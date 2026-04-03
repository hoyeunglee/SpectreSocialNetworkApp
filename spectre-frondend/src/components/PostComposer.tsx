import React, { useState } from "react";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";

export const PostComposer: React.FC = () => {
  const { userId } = useAuth();
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  if (!userId) return <div>Please log in.</div>;

  const submit = async () => {
    setStatus(null);
    try {
      await api.createPost(userId, body, "PUBLIC");
      setBody("");
      setStatus("Posted.");
    } catch (err: any) {
      setStatus(err.message || "Failed to post");
    }
  };

  return (
    <div>
      <h3>Create Post</h3>
      <textarea
        value={body}
        onChange={e => setBody(e.target.value)}
        rows={3}
      />
      <br />
      <button onClick={submit}>Post</button>
      {status && <div>{status}</div>}
    </div>
  );
};