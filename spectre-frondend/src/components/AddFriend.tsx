import React, { useState } from "react";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";

export const AddFriend: React.FC = () => {
  const { userId } = useAuth();
  const [friendId, setFriendId] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  if (!userId) return null;

  const submit = async () => {
    setStatus(null);
    try {
      await api.addFriend(userId, friendId);
      setStatus("Friend added.");
    } catch (err: any) {
      setStatus(err.message || "Failed");
    }
  };

  return (
    <div>
      <h3>Add Friend</h3>
      <input
        placeholder="Friend user_id"
        value={friendId}
        onChange={e => setFriendId(e.target.value)}
      />
      <button onClick={submit}>Add</button>
      {status && <div>{status}</div>}
    </div>
  );
};