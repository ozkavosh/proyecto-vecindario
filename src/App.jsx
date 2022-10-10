import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import MainNavigation from "./components/MainNavigation/MainNavigation";
import TabBar from "./components/TabBar/TabBar";
import { AuthContextProvider } from "./context/authContext";
import { ChatContextProvider } from "./context/chatContext";

//TODO: add proper icons in every component

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
          <MainNavigation setDismount={setDismount} />
          {dismount.footer || <Footer />}
          {dismount.tabBar || <TabBar />}
        </BrowserRouter>
      </ChatContextProvider>
    </AuthContextProvider>
  );
}

export default App;
