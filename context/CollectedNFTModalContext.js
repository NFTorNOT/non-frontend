import React, { useContext, useState } from "react";

export const CollectedNFTModalContext = React.createContext({
  isUpvoted: false,
  setIsUpvoted: () => {},
});

export function useCollectedNFTModalContext() {
  const { isUpvoted, setIsUpvoted } = useContext(CollectedNFTModalContext);

  return {
    isUpvoted,
    setIsUpvoted,
  };
}

export const CollectedNFTModalProvider = ({ children }) => {
  const [isUpvoted, setIsUpvoted] = useState(false);
  return (
    <CollectedNFTModalContext.Provider value={{ isUpvoted, setIsUpvoted }}>
      {children}
    </CollectedNFTModalContext.Provider>
  );
};
