import { useState } from "react";
import Image from "next/image";
import { usePlaceBidMutation } from "@hooks";
import { strings, images } from "@constants";
import styled from "styled-components";
import { Button } from "@components";
import { ILotData } from "@interfaces";

const Modal = styled.div(
  ({ theme }) => `
  background: ${theme.colors.modalOverlayBackground};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`
);

const ModalContent = styled.section(
  ({ theme }) => `
  position: fixed;
  background: ${theme.colors.background};
  width: 60%;
  max-width: ${theme.breakpoints.md}px;
  max-height: 90vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: ${theme.borderRadius.medium};
  padding: 45px 61px;
  overflow-y: auto;
  text-align: center;
  ${theme.down(theme.breakpoints.md)} {
    padding: 45px 15px;
    width: 90%;
  }
`
);

const ModalTitle = styled.h3(
  ({ theme }) => `
  margin-top: 0;
  margin-bottom: 40px;
  text-align: center;
  font-size: 24px;
`
);

const ModalSubTitle = styled.h4(
  ({ theme }) => `
  margin-top: 0;
  margin-bottom: 14px;
  text-align: center;
  font-size: 32px;
`
);

const BidAmountText = styled.p(
  ({ theme }) => `
  font-family: "PostGrotesk";
  font-style: normal;
  font-size: 20px;
  line-height: 22px;
  text-align: center;
`
);

const BidAmount = styled.span(
  ({ theme }) => `
  font-weight: 600;
  color: #29ABE2;
`
);

const ButtonsContainer = styled.div(
  ({ theme }) => `
  display: flex;
  justify-content: space-evenly;
  margin-top: 44px;
  margin-bottom: 30px;
  grid-gap: 24px;
`
);

const CloseButton = styled.button(
  ({ theme }) => `
  position: absolute;
  top: 0;
  right: 0;
  margin: 24px;
  background: transparent;
  border: none;
  font-size: 24px;

  ${theme.down(theme.breakpoints.md)} {
    & img {
      width: 15px !important;
    }
  }
`
);

const ActionButton = styled(Button)(
  ({ theme }) => `
  width: 100%;
  max-width: 320px;
  height: 60px;
  ${theme.down(theme.breakpoints.md)} {
    border-radius: ${theme.borderRadius.small};
    font-size: 20px;
    height: 56px;
  }
`
);

const CustomBid =  styled.span(
  ({ theme }) => `
  font-family: ${theme.fonts.secondary};
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 18px;
  text-align: center;
  text-decoration-line: ${theme.textDecoration.link};
  color: ${theme.colors.primary};
  cursor: pointer;
`
)

interface QuickBidModalProps {
  handleClose: () => void;
  handleCustomBid: () => void;
  lot: ILotData;
  mojitoLotData: any;
}

export const QuickBidModal = ({
  handleClose,
  handleCustomBid,
  lot,
  mojitoLotData,
}: QuickBidModalProps) => {
  const [error, setError] = useState<string|null>(null);
  const [placeBid] = usePlaceBidMutation(lot);

  const onSubmit = async () => {
    try {
      return await placeBid({
        variables: {
          amount: mojitoLotData.currentBid.nextBidIncrement,
          marketplaceAuctionLotId: lot.mojitoId,
        },
      }).then(() => {
        handleClose();
      });
    } catch (e) {
      console.log(e);
      // @ts-ignore
      setError(e?.message);
      setTimeout(() => setError(null), 4000);
      return null;
    }
  };

  const onCustomBid = () => {
    handleClose();
    handleCustomBid();
  }

  return (
    <Modal>
      <ModalContent>
        <ModalTitle>
          {strings.LOT.QUICKBID_MODAL.TITLE}
        </ModalTitle>
        <ModalSubTitle>
          {lot.title}
        </ModalSubTitle>
        <BidAmountText>{strings.LOT.QUICKBID_MODAL.CURRENT_BID}<BidAmount>${mojitoLotData.currentBid.amount}</BidAmount></BidAmountText>
        <BidAmountText>{strings.LOT.QUICKBID_MODAL.QUICK_BID}<BidAmount>${mojitoLotData.currentBid.nextBidIncrement}</BidAmount></BidAmountText>
        <ButtonsContainer>
          <ActionButton onClick={handleClose}>
          {strings.LOT.QUICKBID_MODAL.CANCEL}
          </ActionButton>
          <ActionButton onClick={onSubmit}>
          {strings.LOT.QUICKBID_MODAL.PROCEED}
          </ActionButton>
        </ButtonsContainer>
        <CustomBid onClick={onCustomBid}>{strings.LOT.QUICKBID_MODAL.CUSTOM_BID}</CustomBid>
        <CloseButton type="button" onClick={handleClose}>
          <Image
            src={images.CLOSE_ICON?.src}
            alt={images.CLOSE_ICON?.alt}
            width={images.CLOSE_ICON?.width}
            height={images.CLOSE_ICON?.height}
          />
        </CloseButton>
      </ModalContent>
    </Modal>
  );
};
