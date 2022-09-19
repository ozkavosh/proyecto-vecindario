import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Chat from "./components/Chat/Chat";
import Favorites from "./components/Favorites/Favorites";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Help from "./components/Help/Help";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Register from "./components/Register/Register";
import { GlobalContextProvider } from "./context/globalContext";

function App() {
  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <Header></Header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="/favoritos" element={<Favorites />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/ayuda" element={<Help />} />
            <Route path="/nuevo" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer></Footer>
      </BrowserRouter>
    </GlobalContextProvider>
  );
}

export default App;
