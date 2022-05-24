import { createContext, useContext } from "react";

export interface WalletInfoType {
  isTokenOwner: boolean;
  tokens: number[];
}
export interface WalletContextType {
  wallet: WalletInfoType;
  setWallet(f: WalletInfoType | ((prev: WalletInfoType) => WalletInfoType)): void;
}
const WalletContext = createContext<WalletContextType>({} as WalletContextType);

export default WalletContext;

export function useWallet() {
  return useContext(WalletContext);
}
