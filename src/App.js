import "@rainbow-me/rainbowkit/styles.css";
import "./App.css";
import Main from "./components/Main";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { AuthProvider } from "./context/AuthContext";
import { BottomTabProvider } from "./context/BottomTabContext";

function App() {
  const { chains, provider } = configureChains(
    [chain.polygon, chain.polygonMumbai],
    [
      alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_API_KEY }),
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
          <div className="App">
            <BottomTabProvider>
              <Main />
            </BottomTabProvider>
          </div>
        </AuthProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
