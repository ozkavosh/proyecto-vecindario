import "./App.css";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/authContext";
import { ChatContextProvider } from "./context/chatContext";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import TabBar from "./components/TabBar/TabBar";
import MainNavigation from "./components/MainNavigation/MainNavigation";

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
