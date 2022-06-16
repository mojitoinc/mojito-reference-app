type NETWORK = "ethereum" | "polygon";

export const getWalletLink = (wallet?: string, network: NETWORK = "ethereum") => {
  // You can add more network to support
  switch(network) {
    case "ethereum":
      return wallet ? `https://etherscan.io/address/${wallet}` : "https://etherscan.io";
    case "polygon":
      return wallet ? `https://polygonscan.com/address/${wallet}` : "https://polygonscan.com";
  }
};
