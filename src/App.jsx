import "./App.css";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "./components/Chat/Chat";
import Favorites from "./components/Favorites/Favorites";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Register from "./components/Register/Register";
import TabBar from "./components/TabBar/TabBar";
import { AuthContextProvider } from "./context/authContext";
import { ChatContextProvider } from "./context/chatContext";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import ProfileInformation from "./components/ProfileInformation/ProfileInformation";
import ProfileReviews from "./components/ProfileReviews/ProfileReviews";
import ProfileNotifications from "./components/ProfileNotifications/ProfileNotifications";

function App() {
  const [dismount, setDismount] = useState({
    header: false,
    footer: false,
    tabBar: false,
  });

  return (
    <AuthContextProvider>
      <BrowserRouter>
        {dismount.header || <Header />}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/perfil"
              element={
                <AuthRoute>
                  <Profile setDismount={setDismount} />
                </AuthRoute>
              }
            />
            <Route
              path="/perfil/datos"
              element={<ProfileInformation setDismount={setDismount} />}
            />
            <Route path="/perfil/r" element={<ProfileReviews setDismount={setDismount} />} />
            <Route
              path="/perfil/notificaciones"
              element={<ProfileNotifications setDismount={setDismount} />}
            />
            <Route path="/favoritos" element={<Favorites setDismount={setDismount} />} />
            <Route
              path="/chat"
              element={
                <ChatContextProvider>
                  <Chat setDismount={setDismount} />
                </ChatContextProvider>
              }
            />
            <Route path="/buscador" element={<Search />} />
            <Route path="/registro" element={<Register setDismount={setDismount} />} />
            <Route path="/login" element={<Login setDismount={setDismount} />} />
          </Routes>
        </main>
        {dismount.footer || <Footer />}
        {dismount.tabBar || <TabBar />}
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
