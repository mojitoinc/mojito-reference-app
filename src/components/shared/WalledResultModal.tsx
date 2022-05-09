import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import styled from "styled-components";


export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 30px;
  border-bottom: 1px solid gray;
  button {
    text-transform: unset !important
  }
`;


const HeaderText = styled.div(
  ({ theme }) => `
  font: ${theme.fonts.h3()};
  line-height: 24px;
  margin-bottom: 12px;
`
);

const MesssageText = styled.div(
  ({ theme }) => `
  font: ${theme.fonts.small()};
  line-height: 18px;
  margin-bottom: 25px;
`
);
const TryAgainButton = styled(Button)({
  display: 'flex',
  alignSelf: 'stretch',
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  borderRadius: 5,
  backgroundColor: '#000 !important',
  color: '#fff !important',
  marginInline: 16,
  borderColor: '#000',
  '&:hover': {
    backgroundColor: '#000ff',
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
  textDecoration: 'underline !important',
  fontWeight: '900 !important',
  color: '#000 !important'
});


export const BottomContainer = styled.div(
  ({ theme }) => `
    margin: 20px 5px 0 10px;
    color: #737373;  
    font: ${theme.fonts.small()};
    button{
      margin-top: -5px;
      text-transform: unset
    }
  `
);

export const Container = styled.div(
  ({ theme }) => `
    position: absolute;
    top: 50%;
    left: 50%;
    background-color: white;
    transform: translate(-50%, -50%);
    padding: 25px; 
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    ${theme.down(theme.breakpoints.sm)} {
      width: 280px;
    }
    `
);

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
            <Container> 
              <HeaderText>Success!</HeaderText>
              <MesssageText>{"You're now being redirected"}</MesssageText>
            </Container>
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
              <Container> 
                <HeaderContainer>
                  <HeaderText>Uh-Oh</HeaderText>
                  <MesssageText>{"it looks like you don't have access"}</MesssageText>
                  <TryAgainButton onClick={handleTryAgainLater}>Try again</TryAgainButton>
                </HeaderContainer>
                <BottomContainer>Don&apos;t have the token yet?<BuyNowButton onClick={handleBuyNow}>Buy now</BuyNowButton></BottomContainer>
              </Container>
          </Modal>
};

