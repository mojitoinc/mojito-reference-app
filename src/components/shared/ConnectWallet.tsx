import { useContext } from "react";
import { setupAll, onConnect } from "../../utils/connectWallet";
import ConnectContext from "../../utils/ConnectContext";
import DropdownMenu from "./DropdownMenu";
import styled from "styled-components";
import { media } from "../../utils/media";

const ConnectBtn = styled.div`
  position: relative;
  background: transparent;
  border: none;
  text-decoration: none;
  cursor: pointer;
  padding: 3px;
  min-width: 200px;
  max-width: 250px;

  p,
  a {
    display: block;
    background: transparent;
    border: 4px solid #eebc0f;
    border-image-slice: 1;
    padding: 10px;
    text-align: center;
    margin: 0;
  }

  ${media.small} {
    width: 90%;
  }
`;

export const DisconnectBtn = styled.div`
  position: relative;
  background: transparent;
  border: none;
  text-decoration: none;
  cursor: pointer;
  padding: 3px;
  max-width: 250px;

  p,
  a {
    width: auto;
    display: block;
    border-radius: 5px;
    background: transparent;
    border: 2px solid transparent;
    border-image: linear-gradient(to right, #ccc 0%, #ddd 100%);
    border-image-slice: 1;
    padding: 10px;
    text-align: center;
  }
`;

export const ConnectWallet: React.FC = () => {
  const { connect, setConnect } = useContext(ConnectContext);

  const connectWeb3 = async () => {
    const modal = await setupAll();
    const provider = await onConnect(modal);

    if (provider) {
      let chainId = provider.web3.chainId;
      if (typeof chainId === "string") {
        chainId = parseInt(chainId, 16);
      }
      setConnect({
        account: provider.account,
        signer: provider.provider.getSigner(provider.account),
        provider: provider.provider,
        connected: provider.success,
        chainId,
        modal,
      });

      provider.web3.on("accountsChanged", (accounts: string[]) => {
        setConnect((prevValue) => ({
          ...prevValue,
          account: accounts[0],
          signer: provider.provider.getSigner(accounts[0]),
        }));
      });

      provider.web3.on("chainChanged", (_chainId: number) => {
        let chainId = _chainId;
        if (typeof chainId === "string") {
          chainId = parseInt(chainId, 16);
        }
        setConnect((prevValue) => ({
          ...prevValue,
          chainId: chainId,
        }));
      });
    }
  };

  const renderConnectBtn = () => {
    if (connect.connected && connect.account) {
      return (
        <>
          <DropdownMenu
            address={`${connect.account.substr(
              0,
              6
            )}...${connect.account.substr(connect.account.length - 4)}`}
          />
        </>
      );
    } else {
      return (
        <>
          <ConnectBtn onClick={connectWeb3}>
            <p>Connect Wallet</p>
          </ConnectBtn>
        </>
      );
    }
  };
  return renderConnectBtn();
};

export default ConnectWallet;
