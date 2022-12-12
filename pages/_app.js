import "../styles/globals.scss";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { AuthProvider } from "../context/AuthContext";
import { BottomTabProvider } from "../context/BottomTabContext";
import { UserProvider } from "../context/UserContext";

function App({ Component, pageProps }) {
  const { chains, provider } = configureChains(
    [chain.polygonMumbai],
    [
      alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY }),
      publicProvider(),
    ]
  );

  const { connectors } = getDefaultWallets({
    appName: "NFT or Not",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <AuthProvider>
          <UserProvider>
            <BottomTabProvider>
              <Component {...pageProps} />
            </BottomTabProvider>
          </UserProvider>
        </AuthProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
