import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Profile from "./components/Profile/Profile";
import Favorites from "./components/Favorites/Favorites";
import Chat from "./components/Chat/Chat";
import Help from "./components/Help/Help";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { AccountContextProvider } from "./context/accountContext";

function App() {
  return (
    <AccountContextProvider>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="/favoritos" element={<Favorites />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/ayuda" element={<Help />} />
          <Route path="/nuevo" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </AccountContextProvider>
  );
}

export default App;
