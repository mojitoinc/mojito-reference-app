import Image from "next/image";
import { useState, useRef } from "react";

import { Modal } from "@components";
import { strings, images } from "@constants";
import { BidConfirmModalProps } from "@interfaces";
import { formatCurrencyAmount, bidIncrement } from "@utils";

import {
  ModalDetailContainer,
  ModalDetailLeft,
  ItemImage,
  ItemVideo,
  ModalDetailRight,
  ModalCurrentBid,
  ModalItemDescription,
  BidContainer,
  SelectBidContainer,
  Separator,
  MaxTotalContainer,
  ConfirmButton,
  SuccessContent,
  SuccessMessage,
  ModalTitle,
} from "./ModalComponents";

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
          <SuccessMessage>{strings.ITEM.CONFIRM_MODAL.SUCCESS}</SuccessMessage>
          <ConfirmButton onClick={handleClose} isBig>
            {strings.ITEM.CONFIRM_MODAL.CLOSE}
          </ConfirmButton>
        </SuccessContent>
      )}
      {!showSuccess && (
        <>
          <ModalTitle>{`${strings.ITEM.CONFIRM_MODAL.TITLE}${item.name}`}</ModalTitle>
          <ModalDetailContainer>
            <ModalDetailLeft>
              {cmsData?.format === "image" && (
                <ItemImage src={cmsData?.image} alt={item.name} />
              )}
              {cmsData?.format === "video" && (
                <ItemVideo height={350} width={432} src={cmsData?.video} />
              )}
            </ModalDetailLeft>
            <ModalDetailRight>
              <ModalCurrentBid>
                {strings.COMMON.CURRENT_BID}
                {formatCurrencyAmount(item.details.unitPrice)}
              </ModalCurrentBid>
              <ModalItemDescription>
                {strings.ITEM.CONFIRM_MODAL.DISCLAIMER}
              </ModalItemDescription>
              <BidContainer>
                <ModalItemDescription>
                  {strings.ITEM.CONFIRM_MODAL.YOUR_MAX_BID}
                </ModalItemDescription>
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
                <p>{strings.ITEM.CONFIRM_MODAL.MAX_TOTAL}</p>
                <p>{bidAmount} USD</p>
              </MaxTotalContainer>
            </ModalDetailRight>
          </ModalDetailContainer>
          <ConfirmButton onClick={onSubmit} isBig>
            {strings.ITEM.CONFIRM_MODAL.BUTTON_TITLE}
          </ConfirmButton>
        </>
      )}
    </Modal>
  );
};
