import { useState, useRef } from "react";
import Select from "react-select";
import Image from "next/image";
import styled from "styled-components";

import { Button, Modal } from "@components";
import { strings, images } from "@constants";
import { formatCurrencyAmount, bidIncrement } from "@utils";
import { CollectionItemDataFragment } from "src/services/graphql/generated";
import { CMSData } from "src/data/MockCMSService";

const ModalTitle = styled.h3(
  ({ theme }) => `
  margin-top: 0;
  margin-bottom: 38px;

  ${theme.down(theme.breakpoints.md)} {
    font-size: 20px;
  }
`
);

const DetailContainer = styled.div(
  ({ theme }) => `
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;

  ${theme.down(theme.breakpoints.md)} {
    margin: 0;
    flex-direction: column;
  }
`
);

const DetailLeft = styled.div(
  ({ theme }) => `
  flex: 1;

  ${theme.down(theme.breakpoints.md)} {
    margin: 0 0 40px;
    width: 100%;
  }
`
);

const LotImage = styled.img(
  ({ theme }) => `
  border-radius: ${theme.borderRadius.medium};
  height: 200px;
  object-fit: cover;
  width: 100%;

  ${theme.down(theme.breakpoints.md)} {
    height: auto;
    max-height: 500px;
    width: 100%;
  }
`
);

const LotVideo = styled.video(
  ({ theme }) => `
  border-radius: ${theme.borderRadius.medium};
  height: 200px;
  object-fit: cover;
  width: 100%;

  ${theme.down(theme.breakpoints.md)} {
    height: auto;
    max-height: 500px;
    width: 100%;
  }
`
);

const DetailRight = styled.div(
  ({ theme }) => `
  flex: 1.5;
  margin-left: 1rem;

  ${theme.down(theme.breakpoints.md)} {
    margin: 0;
    width: 100%;
  }
`
);

const CurrentBid = styled.span(
  ({ theme }) => `
  background-color: ${theme.colors.secondary};
  color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.small};
  font: ${theme.fonts.small("bold")};
  padding: 3px 8px;
  margin-bottom: 18px;
`
);

const LotDescription = styled.p(
  ({ theme }) => `
  font: ${theme.fonts.small()};
  line-height: 20px;
`
);

const BidContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SelectBidContainer = styled(Select)(
  ({ theme }) => `
  border-radius: ${theme.borderRadius.small};
  display: flex;
  font: ${theme.fonts.small("bold")};
  height: 40px;
  justify-content: flex-end;
`
);

const Separator = styled.hr`
  border: ${({ theme }) => theme.borders.thin(theme.colors.border)};
  border-bottom: none;
`;

const MaxTotalContainer = styled.div(
  ({ theme }) => `
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font: ${theme.fonts.small("bold")};
  line-height: 18px;
`
);

const ConfirmButton = styled(Button)(
  ({ theme }) => `
  width: 100%;
  max-width: 320px;
  margin: 67px auto 0;

  ${theme.down(theme.breakpoints.md)} {
    border-radius: ${theme.borderRadius.small};
    font-size: 20px;
    height: 56px;
  }
`
);

const SuccessContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-top: 50px;
`;

const SuccessMessage = styled.h3`
  margin: 50px 0 0;
`;

interface BidConfirmModalProps {
  handleClose: () => void;
  item: CollectionItemDataFragment;
  cmsData?: CMSData;
  setHasBid: (value: boolean) => void;
}

export const BuyNowModal = ({
  handleClose,
  item,
  cmsData,
  setHasBid,
}: BidConfirmModalProps) => {
  if (item.details.__typename !== "MarketplaceBuyNowOutput") {
    throw Error("invalid type");
  }
  const submittedAmount = useRef<number | null>(null);
  const [userAvailableMinBid, setUserAvailableMinBid] = useState<number>(
    bidIncrement[0]
  );

  const [availableOptions, setAvailableOptions] = useState<
    { value: number; label: string }[]
  >([]);

  const [bidAmount, setBidAmount] = useState<number>(
    availableOptions[0]?.value
  );

  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const [error, setError] = useState<any>(null);
  //const [placeBid] = usePlaceBidMutation(lot);
  const placeBid = (params: any) => Promise.resolve();

  const bidOnChange = (e: any) => {
    const value = e.value;
    if (parseFloat(value) < userAvailableMinBid) {
      setError(
        "Bid amount can't be less than " + userAvailableMinBid.toString()
      );
    } else {
      setError(null);
    }
    setBidAmount(value);
  };

  const onSubmit = async () => {
    try {
      return await placeBid({
        variables: {
          amount: bidAmount,
          marketplaceAuctionLotId: item.details,
        },
      }).then(() => {
        setShowSuccess(true);
        setHasBid(true);
      });
    } catch (e) {
      console.log(e);
      // @ts-ignore
      setError(e?.message);
      setTimeout(() => setError(null), 4000);
      return null;
    }
  };

  return (
    <Modal onClose={handleClose}>
      {showSuccess && (
        <SuccessContent>
          <Image
            src={images.SUCCESS?.src}
            alt={images.SUCCESS?.alt}
            width={images.SUCCESS?.width}
            height={images.SUCCESS?.height}
          />
          <SuccessMessage>{strings.LOT.CONFIRM_MODAL.SUCCESS}</SuccessMessage>
          <ConfirmButton onClick={handleClose} isBig>
            {strings.LOT.CONFIRM_MODAL.CLOSE}
          </ConfirmButton>
        </SuccessContent>
      )}
      {!showSuccess && (
        <>
          <ModalTitle>{`${strings.LOT.CONFIRM_MODAL.TITLE}${item.name}`}</ModalTitle>
          <DetailContainer>
            <DetailLeft>
              {cmsData?.format === "image" && (
                <LotImage src={cmsData?.image} alt={item.name} />
              )}
              {cmsData?.format === "video" && (
                <LotVideo height={350} width={432} src={cmsData?.video} />
              )}
            </DetailLeft>
            <DetailRight>
              <CurrentBid>
                {strings.COMMON.CURRENT_BID}
                {formatCurrencyAmount(item.details.unitPrice)}
              </CurrentBid>
              <LotDescription>
                {strings.LOT.CONFIRM_MODAL.DISCLAIMER}
              </LotDescription>
              <BidContainer>
                <LotDescription>
                  {strings.LOT.CONFIRM_MODAL.YOUR_MAX_BID}
                </LotDescription>
                <SelectBidContainer
                  classNamePrefix="reactSelect"
                  components={{ IndicatorSeparator: () => null }}
                  onChange={bidOnChange}
                  menuShouldScrollIntoView={true}
                  isSearchable={false}
                  isDisabled={
                    !!submittedAmount?.current ||
                    bidAmount > bidIncrement[bidIncrement.length - 1]
                  }
                  value={
                    submittedAmount?.current
                      ? {
                          value: submittedAmount?.current,
                          label: formatCurrencyAmount(submittedAmount?.current),
                        }
                      : bidAmount
                      ? {
                          value: bidAmount,
                          label: formatCurrencyAmount(bidAmount),
                        }
                      : {
                          value: availableOptions[0]?.value,
                          label: formatCurrencyAmount(
                            availableOptions[0]?.value
                          ),
                        }
                  }
                  options={availableOptions}
                />
              </BidContainer>
              <Separator />
              <MaxTotalContainer>
                <p>{strings.LOT.CONFIRM_MODAL.MAX_TOTAL}</p>
                <p>{bidAmount} USD</p>
              </MaxTotalContainer>
            </DetailRight>
          </DetailContainer>
          <ConfirmButton onClick={onSubmit} isBig>
            {strings.LOT.CONFIRM_MODAL.BUTTON_TITLE}
          </ConfirmButton>
        </>
      )}
    </Modal>
  );
};
