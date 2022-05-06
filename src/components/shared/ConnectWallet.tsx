import { useContext , useState} from "react";
import { useRouter } from "next/router";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { setupAll, onConnect } from "../../utils/connectWallet";
import ConnectContext from "../../utils/ConnectContext";
import { useWallet} from "@utils";
import DropdownMenu from "./DropdownMenu";
import styled from "styled-components";
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
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const { connect, setConnect } = useContext(ConnectContext);
  const [verifySignature] = useVerifySignature();
  const [checkTokenOwners] = userCheckTokenOwners();
  const {setWallet} = useWallet();

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

      setLoading(true);

      try {
        await verifySignature({
          variables: {
            signature, message, address
          }
        })
      } catch (e) { }

      try {
        const result = await checkTokenOwners({
          variables: {
            contractId: "81503ff9-cb5c-428e-bb37-7877b7bf946c", walletAddress:  address,rangeStart: 1, rangeEnd: 67
          }
        })
        const value = ((result?.data?.checkTokenOwners) ?? false) as boolean
        setWallet({ isTokenOwner: value });
        const page = value ? '/wallet/connected' : '/wallet/purchase'; 
        router.push(page);
      } catch (err) { }

       setLoading(false);

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

  return <>
           {renderConnectBtn()}
           <Backdrop sx={{ color: '#fff', zIndex: (theme: any) => theme.zIndex.drawer + 1 }}  open={isLoading}  >
             <CircularProgress color="inherit" />
           </Backdrop>
         </>
};

export default ConnectWallet;
