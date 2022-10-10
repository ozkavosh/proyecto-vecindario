import { Route, Routes } from "react-router-dom";
import AddReviewAuth from "../AddReviewAuth/AddReviewAuth";
import AuthRoute from "../AuthRoute/AuthRoute";
import Chat from "../Chat/Chat";
import ChatMessages from "../ChatMessages/ChatMessages";
import Favorites from "../Favorites/Favorites";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import ProfileInformation from "../ProfileInformation/ProfileInformation";
import ProfileNotifications from "../ProfileNotifications/ProfileNotifications";
import ProfileReviews from "../ProfileReviews/ProfileReviews";
import PropertyDetail from "../PropertyDetail/PropertyDetail";
import Register from "../Register/Register";
import Search from "../Search/Search";

const MainNavigation = ({ setDismount }) => {
  return (
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
        <Route path="/buscador" element={<Search setDismount={setDismount} />} />
        <Route path="/inmueble/:pid" element={<PropertyDetail setDismount={setDismount} />} />
        <Route path="/inmueble/error" element={<AddReviewAuth setDismount={setDismount} />} />
        <Route path="/registro" element={<Register setDismount={setDismount} />} />
        <Route path="/login" element={<Login setDismount={setDismount} />} />
      </Routes>
    </main>
  );
};

export default MainNavigation;
