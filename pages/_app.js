import "../styles/globals.scss";
import Layout from "../components/Layout";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { AuthProvider } from "../context/AuthContext";
import { BottomTabProvider } from "../context/BottomTabContext";
import { UserProvider } from "../context/UserContext";
import { Provider } from "react-redux";
import { store } from "../store";

function App({ Component, pageProps }) {
  const { chains, provider } = configureChains(
    [polygonMumbai],
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
    <Provider store={store}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <AuthProvider>
            <UserProvider>
              <BottomTabProvider>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </BottomTabProvider>
            </UserProvider>
          </AuthProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </Provider>
  );
}

export default App;
