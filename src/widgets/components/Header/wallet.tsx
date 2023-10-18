import React from "react";

import {
    ThirdwebProvider,
    ConnectWallet,
    metamaskWallet,
    coinbaseWallet,
    walletConnect,
    safeWallet,
    localWallet,
    embeddedWallet,
    trustWallet,
    zerionWallet,
    bloctoWallet,
    frameWallet,
    rainbowWallet,
    phantomWallet,
    darkTheme,
    smartWallet,
  } from "@thirdweb-dev/react";


  export default function WalletPage() {
    return (
        
              <ThirdwebProvider
                activeChain="mumbai"
                clientId="YOUR_CLIENT_ID"
                supportedWallets={[
                  metamaskWallet(),
                  coinbaseWallet({ recommended: true }),
                  walletConnect(),
                  safeWallet({
                    personalWallets: [
                      metamaskWallet(),
                      coinbaseWallet({ recommended: true }),
                      walletConnect(),
                      localWallet(),
                      embeddedWallet(),
                      trustWallet(),
                      zerionWallet(),
                      bloctoWallet(),
                      frameWallet(),
                      rainbowWallet(),
                      phantomWallet(),
                    ],
                  }),
                  localWallet(),
                  embeddedWallet(),
                  trustWallet(),
                  zerionWallet(),
                  bloctoWallet(),
                  frameWallet(),
                  rainbowWallet(),
                  phantomWallet(),
                ]}
                authConfig={{
                  authUrl: "/api/auth",
                  domain: "https://example.com",
                }}
              >
                <ConnectWallet
        theme={darkTheme({
          colors: {
            modalBg: "#000000",
            dropdownBg: "#000000",
            primaryButtonBg: "#0066ff",
            primaryButtonText: "#ffffff",
            secondaryButtonBg: "#0521f5",
            secondaryButtonHoverBg: "#080e26",
          },
        })}
        btnTitle={"Connect Wallet"}
        modalTitle={"CodeX Connection"}
        auth={{ loginOptional: false }}
        switchToActiveChain={true}
        modalSize={"wide"}
        welcomeScreen={{
            title: "Connect CodeX",
          img: {
            src: "/public/blockchains/codex-1.png",
            width: 150,
            height: 150,
          },
        }}
        modalTitleIconUrl={
          "/public/blockchains/codex-3.png"}
      />
    </ThirdwebProvider>
  );
}

        

