import { createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ChatPage from "./components/ChatPage";
import socket from "./socket";
import useAuth, { AuthProvider } from "./context/useAuth";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Home socket={socket} />}></Route>
            <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
