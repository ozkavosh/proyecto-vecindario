import "./App.css";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "./components/Chat/Chat";
import ChatMessages from "./components/ChatMessages/ChatMessages";
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
import PropertyDetail from "./components/PropertyDetail/PropertyDetail";
import AddReviewAuth from "./components/AddReviewAuth/AddReviewAuth";

function App() {
  const [dismount, setDismount] = useState({
    header: false,
    footer: false,
    tabBar: false,
  });

  return (
    <AuthContextProvider>
      <ChatContextProvider>
        <BrowserRouter>
          {dismount.header || <Header />}
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/perfil"
                element={
                  <AuthRoute route={"profile"} setDismount={setDismount}>
                    <Profile />
                  </AuthRoute>
                }
              />
              <Route
                path="/perfil/datos"
                element={
                  <AuthRoute route={"profile"} setDismount={setDismount}>
                    <ProfileInformation />
                  </AuthRoute>
                }
              />
              <Route
                path="/perfil/r"
                element={
                  <AuthRoute route={"profile"} setDismount={setDismount}>
                    <ProfileReviews />
                  </AuthRoute>
                }
              />
              <Route
                path="/perfil/notificaciones"
                element={
                  <AuthRoute route={"profile"} setDismount={setDismount}>
                    <ProfileNotifications />
                  </AuthRoute>
                }
              />
              <Route
                path="/favoritos"
                element={
                  <AuthRoute route={"favorites"} setDismount={setDismount}>
                    <Favorites />
                  </AuthRoute>
                }
              />
              <Route
                path="/chat"
                element={
                  <AuthRoute route={"chat"} setDismount={setDismount}>
                    <Chat />
                  </AuthRoute>
                }
              />
              <Route
                path="/chat/messages"
                element={
                  <AuthRoute route={"chat"} setDismount={setDismount}>
                    <ChatMessages />
                  </AuthRoute>
                }
              />
              <Route path="/buscador" element={<Search />} />
              <Route
                path="/inmueble/:pid"
                element={<PropertyDetail setDismount={setDismount} />}
              />
              <Route path="/inmueble/error" element={<AddReviewAuth setDismount={setDismount} />} />
              <Route
                path="/registro"
                element={<Register setDismount={setDismount} />}
              />
              <Route
                path="/login"
                element={<Login setDismount={setDismount} />}
              />
            </Routes>
          </main>
          {dismount.footer || <Footer />}
          {dismount.tabBar || <TabBar />}
        </BrowserRouter>
      </ChatContextProvider>
    </AuthContextProvider>
  );
}

export default App;
