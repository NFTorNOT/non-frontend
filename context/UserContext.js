import React, { useContext, useState } from "react";

export const UserContext = React.createContext({
  userProfile: {},
  setUserProfile: () => {},
});

export function useUserContext() {
  const { userProfile, setUserProfile } = useContext(UserContext);

  return {
    userProfile,
    setUserProfile,
  };
}

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState({});
  return (
    <UserContext.Provider
      value={{ userProfile, setUserProfile }}
    >
      {children}
    </UserContext.Provider>
  );
};
