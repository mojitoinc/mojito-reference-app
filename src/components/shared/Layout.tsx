import React, { useState, useEffect, ReactNode } from "react";
import ConnectContext, { ConnectType } from "../../utils/ConnectContext";

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

  return (
    <React.Fragment>
      <ConnectContext.Provider value={{ connect, setConnect }}>
        {children}
      </ConnectContext.Provider>
    </React.Fragment>
  );
};