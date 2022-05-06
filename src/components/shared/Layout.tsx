import React, { useState, useEffect, ReactNode } from "react";
import ConnectContext, { ConnectType } from "../../utils/ConnectContext";
import WalletConnectContext, { WalletInfoType } from "../../utils/Wallet";

interface LayoutProps {
  children: ReactNode
}

export const Layout = ( { children }:LayoutProps ) => {
  const [connect, setConnect] = useState<ConnectType>({
    connected: false,
    account: null,
    signer: null,
    provider: null,
    chainId: parseInt(process.env.NEXT_PUBLIC_CHAINID!),
  });
  
  const [wallet, setWallet] = useState<WalletInfoType>({
    isTokenOwner: false,
  });

  return (
    <React.Fragment>
      <ConnectContext.Provider value={{ connect, setConnect }}>
       <WalletConnectContext.Provider value={{ wallet, setWallet }}>
         {children}
        </WalletConnectContext.Provider>
      </ConnectContext.Provider>
    </React.Fragment>
  );
};