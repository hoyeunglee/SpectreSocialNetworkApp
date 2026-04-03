import React from "react";
import { PostComposer } from "../components/PostComposer";
import { AddFriend } from "../components/AddFriend";
import { AdsPanel } from "../components/AdsPanel";
import { useAuth } from "../context/AuthContext";

export const Home: React.FC = () => {
  const { userId } = useAuth();

  if (!userId) return <div>Please log in.</div>;

  return (
    <div>
      <h2>Home</h2>
      <PostComposer />
      <AddFriend />
      <AdsPanel region="US" />
    </div>
  );
};