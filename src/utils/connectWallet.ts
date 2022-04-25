import WalletConnectProvider from "@walletconnect/web3-provider";
import { Web3Provider } from "@ethersproject/providers";
import Web3Modal from "web3modal";

export const setupAll = async () => {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: process.env.NEXT_PUBLIC_WALLETCONNECT_ID,
      },
    },
  };

  const web3Modal = new Web3Modal({
    network: process.env.NEXT_PUBLIC_NETWORK, // optional
    cacheProvider: true, // optional
    providerOptions, // required
  });
  // web3Modal.clearCachedProvider();
  return web3Modal;
};

export const onConnect = async (web3Modal: any) => {
  if (web3Modal) {
    try {
      const provider = await web3Modal.connect();
      const web3Provider = new Web3Provider(provider);
      const signedAddress =
        (await provider.selectedAddress) || provider.accounts[0];
      return {
        provider: web3Provider,
        web3: provider,
        account: signedAddress,
        success: true,
      };
    } catch (err) {
      console.log("error connecting Web3: ", err);
    }
  } else {
    console.log("No Web3Modal...");
  }
};
