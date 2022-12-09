import React, { useContext, useEffect, useRef, useState } from "react";
import { Constants } from "../utils/Constants";

export const AuthContext = React.createContext({
  isUserLoggedIn: false,
  setIsUserLoggedIn: () => {},
});

export function useAuthContext() {
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(AuthContext);

  return {
    isUserLoggedIn,
    setIsUserLoggedIn,
  };
}

export const AuthProvider = ({ children }) => {
  useEffect(() => {
    setIsUserLoggedIn(
      sessionStorage.getItem(Constants.SESSION_STORAGE_ACCESS_TOKEN_KEY)
    );
  }, []);

  const [isUserLoggedIn, setIsUserLoggedIn] = useState();
  return (
    <AuthContext.Provider
      value={{ isUserLoggedIn: isUserLoggedIn, setIsUserLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};
