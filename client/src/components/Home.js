import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";

const Home = ({ socket }) => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(userName);
    socket.auth = { userName };
    socket.connect();
    console.log(socket.id);
    socket.emit("newUser", { userName, socketId: socket.id });
    navigate("/chat");
  };
  return (
    <form className="home__container" onSubmit={handleSubmit}>
      <h2 className="home__header">Sign in to Open Chat</h2>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        minLength={6}
        name="username"
        id="username"
        className="username__input"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button className="home__cta">SIGN IN</button>
    </form>
  );
};

export default Home;
