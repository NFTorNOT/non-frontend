import React, { useContext, useState } from "react";

export const SignInModalContext = React.createContext({
  isSignInProcess: false,
  setIsSignInProcess: () => {},
});

export function useSignInModalContext() {
  const { isSignInProcess, setIsSignInProcess } =
    useContext(SignInModalContext);

  return {
    isSignInProcess,
    setIsSignInProcess,
  };
}

export const SignInModalProvider = ({ children }) => {
  const [isSignInProcess, setIsSignInProcess] = useState(false);
  return (
    <SignInModalContext.Provider
      value={{ isSignInProcess, setIsSignInProcess }}
    >
      {children}
    </SignInModalContext.Provider>
  );
};
