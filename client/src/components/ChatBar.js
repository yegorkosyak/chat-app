import React, { useState, useEffect } from "react";

const ChatBar = ({ socket }) => {
  const [users, setUsers] = useState([]);
  const [room, setRoom] = useState("");

  useEffect(() => {
    socket.on("newUserResponse", (data) => setUsers(data));
  }, [socket, users]);

  const createNewRoom = (e) => {
    e.preventDefault();
    socket.emit("createNewRoom", { roomName: room });
    setRoom("");
  };

  return (
    <div className="chat__sidebar">
      <h2>Open Chat</h2>
      <form onSubmit={createNewRoom}>
        <input
          type="text"
          placeholder="Write room name"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <button>Create new room</button>
      </form>

      <div>
        <h4 className="chat__header">Rooms</h4>
        <div className="chat__items">
          {users.map((user) => {
            console.log(user);
            return <p key={user.socketId}>{user.userName}</p>;
          })}
        </div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__items">
          {users.map((user) => (
            <p key={user.socketId}>{user.userName}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
