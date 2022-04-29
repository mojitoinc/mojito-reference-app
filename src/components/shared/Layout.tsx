import React, { useState, useEffect } from "react";
import ConnectContext, { ConnectType } from "../../utils/ConnectContext";

interface LayoutProps {
  children: [JSX.Element]
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