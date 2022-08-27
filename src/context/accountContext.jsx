import { createContext, useContext } from "react";

const AccountContext = createContext();

const useAccountContext = () => {
  return useContext(AccountContext);
};

const AccountContextProvider = ({ children }) => {
  return (
    <AccountContext.Provider value={{}}>{children}</AccountContext.Provider>
  );
};

export {
    useAccountContext,
    AccountContextProvider
}
