import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import styled from "styled-components";

const HeaderText = styled.div(
  ({ theme }) => `
  font: ${theme.fonts.h3()};
  line-height: 18px;
  margin-block: 20px;
`
);

const MesssageText = styled.div(
  ({ theme }) => `
  font: ${theme.fonts.small()};
  line-height: 18px;
  margin-block: 20px;
`
);
const TryAgainButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#000',
  borderColor: '#0063cc',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: '#0069d9',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
    borderColor: '#005cbf',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});
const BuyNowButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  lineHeight: 1.5,
  textDecoration: 'underline',
});
export const HeaderContainer = styled.div(
  ({ theme }) => `
    margin: 10px 36px 20px 10px;
    padding-bottom: 20px;
    border-bottom: 1px solid gray;
  `
);
export const AccessContainer = styled.div(
  ({ theme }) => `
    margin: 10px 36px 40px 10px;
    color: #737373;  
    font: ${theme.fonts.small()};
     a{
      font: ${theme.fonts.body()};
      margin-left: 5px;
      color: #000;  
      text-decoration: underline;
    }
  `
);

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  textAlign: 'center',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
};

export interface WalledConnectedResultProps{
  show: boolean;
  onClose?: Function,
}

export const WalledConnectedResultModal = ({show, onClose}: WalledConnectedResultProps) => {
  const handleClose = (event: React.SyntheticEvent<Element, Event>,) => {
    onClose && onClose();
  };
  return  <Modal
            open={show}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}> 
              <HeaderText>Success!</HeaderText>
              <MesssageText>{"You're now being redirected"}</MesssageText>
            </Box>
          </Modal>
};

export interface WalledPurchaseResultProps{
  show: boolean;
  onTryAgainLater?: Function,
  onBuyNow?: Function,
  onClose?: Function,
}

export const WalledPurchaseResultModal = ({show, onTryAgainLater, onBuyNow, onClose}: WalledPurchaseResultProps) => {
  const handleClose = (event: React.SyntheticEvent<Element, Event>,) => {
    onClose && onClose();
  };
  const handleBuyNow = (event: React.SyntheticEvent<Element, Event>,) => {
    onBuyNow && onBuyNow();
  };
  const handleTryAgainLater = (event: React.SyntheticEvent<Element, Event>,) => {
    onTryAgainLater && onTryAgainLater();
  };
  return  <Modal
             open={show}
             onClose={handleClose}
             aria-labelledby="modal-modal-title"
             aria-describedby="modal-modal-description">
              <Box sx={style}> 
                <HeaderContainer>
                <HeaderText>Uh-Oh</HeaderText>
                  <MesssageText>{"it looks like you don't have access"}</MesssageText>
                  <TryAgainButton variant="contained" onClick={handleTryAgainLater}>Try again</TryAgainButton>
                </HeaderContainer>
                <AccessContainer>Don&apos;t have the token yet?<BuyNowButton onClick={handleBuyNow}>Buy now</BuyNowButton></AccessContainer>
              </Box>
          </Modal>
};

