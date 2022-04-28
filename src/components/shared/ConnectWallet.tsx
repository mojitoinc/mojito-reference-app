import { useContext, useState } from "react";
import { setupAll, onConnect } from "../../utils/connectWallet";
import ConnectContext from "../../utils/ConnectContext";
import DropdownMenu from "./DropdownMenu";
import styled from "styled-components";
import { SnackbarAlert } from "./SnackbarAlert";
import { media } from "../../utils/media";
import { useVerifySignature, userCheckTokenOwners } from "@services";

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
  const [visbleAlert,setVisibleAlert] = useState<boolean>(false);
  const [isVerified,setVerify] = useState<boolean>(false);
  const { connect, setConnect } = useContext(ConnectContext);
  const [verifySignature] = useVerifySignature();
  const [checkTokenOwners] = userCheckTokenOwners();

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

      const message = 'Test meta mask';
      
      const signer = provider.provider.getSigner(); 
      const signature = await signer.signMessage(message);
      const address = await signer.getAddress()

      try {
        const result = await verifySignature({
          variables: {
            signature:signature, message: message, address: address
          }
        })
        const value = result?.data?.verifySignature ?? false
        setVerify(value);
      } catch (err) {
        setVerify(false)
      }
      setVisibleAlert(true);

      try {
        console.log('address',address)
        const result = await checkTokenOwners({
          variables: {
            contractId: "81503ff9-cb5c-428e-bb37-7877b7bf946c", walletAddress:  address,rangeStart: 1, rangeEnd: 67
          }
        })
        console.log('result', result)
      } catch (err) {
       }
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
  const handleClose = () => {
    setVisibleAlert(false);
  }
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

  return <>
    {renderConnectBtn()}
    <SnackbarAlert show={visbleAlert}
        severity={isVerified ? "success" : "error"}
        message={isVerified ? 'Your public address and  signature is valid' : 'Not valid'}
      onClose={handleClose} />
    </>;
};

export default ConnectWallet;
