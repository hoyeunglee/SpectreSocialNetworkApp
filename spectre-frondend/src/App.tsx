import React from "react";
import { AuthProvider, useAuth } from "./AuthContext";
import { Login } from "./components/Login";
import { PostComposer } from "./components/PostComposer";
import { AddFriend } from "./components/AddFriend";
import { Ads } from "./components/Ads";

const Main: React.FC = () => {
  const { userId, logout } = useAuth();

  return (
    <div style={{ padding: 16 }}>
      <h1>SPECTRE Social</h1>
      {userId ? (
        <>
          <div>
            Logged in as <code>{userId}</code>{" "}
            <button onClick={logout}>Logout</button>
          </div>
          <PostComposer />
          <AddFriend />
          <Ads region="US" />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

const App: React.FC = () => (
  <AuthProvider>
    <Main />
  </AuthProvider>
);

export default App;