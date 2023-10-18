import { Web3Auth } from "@web3auth/modal";


const web3auth = new Web3Auth({
    clientId: "", // Get your Client ID from the Web3Auth Dashboard
    web3AuthNetwork: "sapphire_mainnet",
    chainConfig: {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: "0x1",
      rpcTarget: "https://rpc.ankr.com/eth", // This is the mainnet RPC we have added, please pass on your own endpoint while creating an app
    },
    uiConfig: {
      theme: "dark",
      loginMethodsOrder: ["facebook", "google"],
      appLogo: "https://web3auth.io/images/w3a-L-Favicon-1.svg", // Your App Logo Here
    },
    defaultLanguage: "en",
    modalZIndex: "99998",
  });

  await web3auth.initModal({
    modalConfig: {
      [WALLET_ADAPTERS.OPENLOGIN]: {
        label: "openlogin",
        loginMethods: {
          google: {
            name: "google login",
            logoDark: "url to your custom logo which will shown in dark mode",
          },
          facebook: {
            // it will hide the facebook option from the Web3Auth modal.
            name: "facebook login",
            showOnModal: false,
          },
        },
        // setting it to false will hide all social login methods from modal.
        showOnModal: true,
      },
    },
  });