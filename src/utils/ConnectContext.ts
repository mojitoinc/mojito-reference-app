import { Provider } from "@ethersproject/abstract-provider";
import { Signer } from "@ethersproject/abstract-signer";
import { createContext, useContext } from "react";
import Web3Modal from "web3modal";

export interface ConnectType {
  connected: boolean;
  chainId: number;
  signer: Signer;
  provider: Provider;
  account: string;
  modal?: Web3Modal;
}
export interface ContextType {
  connect: ConnectType;
  setConnect(f: ConnectType | ((prev: ConnectType) => ConnectType)): void;
}
const Context = createContext<ContextType>(null);

export default Context;

export function useWeb3() {
  return useContext(Context);
}
