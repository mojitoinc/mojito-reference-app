import React, { useEffect, useState, useCallback } from "react";
import momentTimeZone from "moment-timezone";
import styled from "styled-components";

import { strings } from "@constants";
import { CollectionItemDataFragment } from "@services";
import { getSaleStage } from "@utils";

const Tag = styled.div(
  ({ theme }) => `
  align-self: flex-start;
  background-color: ${theme.colors.secondary};
  border-radius: ${theme.borderRadius.small};
  color: ${theme.colors.background};
  font: ${theme.fonts.small()};
  padding: 4px 8px;
`
);

const TagText = styled.span`
  font-weight: bold;
`;

export const StatusTag = ({ item }: { item: CollectionItemDataFragment }) => {
  const [serverTime, setServerTime] = useState(momentTimeZone());
  const startDate = item.details.startDate;
  const endDate = momentTimeZone(item.details.endDate);
  const formattedStartDate =
    startDate &&
    momentTimeZone(startDate)
      .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
      .format("MMM Do / H:mm:ss");

  const saleStage = getSaleStage(item);
  const isPreSale = saleStage === "pre";
  const isDuringSale = saleStage === "during";

  const tagTextView = () => {
    let info: string = "";
    if (isPreSale) {
      switch (item.details.__typename) {
        case "MarketplaceAuctionLot":
          info = strings.COMMON.BIDDING_STARTS;
          break;
        case "MarketplaceBuyNowOutput":
          info = strings.COMMON.BUYNOW_STARTS;
          break;
      }
      return <TagText>{formattedStartDate}</TagText>;
    }
    if (isDuringSale) {
      switch (item.details.__typename) {
        case "MarketplaceAuctionLot":
          info = strings.COMMON.AUCTION_CLOSES;
          break;
        case "MarketplaceBuyNowOutput":
          info = strings.COMMON.BUYNOW_CLOSES;
          break;
      }

      return (
        <Countdown
          prefix={info}
          eventTime={endDate}
          serverTime={serverTime}
          interval={1000}
        />
      );
    }

    switch (item.details.__typename) {
      case "MarketplaceAuctionLot":
        info = strings.COMMON.AUCTION_FINISHED;
        break;
      case "MarketplaceBuyNowOutput":
        info = strings.COMMON.BUYNOW_FINISHED;
        break;
    }

    return <TagText>{info}</TagText>;
  };

  return <Tag>{tagTextView()}</Tag>;
};

const calculateDuration = (
  eventTime: momentTimeZone.Moment,
  serverTime: momentTimeZone.Moment
) =>
  momentTimeZone.duration(
    (eventTime.unix() - serverTime.unix()) * 1000,
    "milliseconds"
  );

interface CountdownProps {
  prefix: string;
  eventTime: momentTimeZone.Moment;
  serverTime: momentTimeZone.Moment;
  interval: number;
}

function Countdown({
  prefix,
  eventTime,
  serverTime,
  interval,
}: CountdownProps) {
  const [duration, setDuration] = useState(
    calculateDuration(eventTime, serverTime)
  );
  const timerCallback = useCallback(() => {
    setDuration(calculateDuration(eventTime, serverTime.add(1, "seconds")));
  }, [eventTime, serverTime]);

  useEffect(() => {
    const intervalId = setInterval(timerCallback, interval);

    return () => clearInterval(intervalId);
  }, [interval, serverTime, timerCallback]);

  return (
    <>
      {prefix}
      <TagText>
        {duration.days()
          ? `${duration.days().toString().padStart(2, "0")}:`
          : ""}
        {`${duration.hours().toString().padStart(2, "0")}:${duration
          .minutes()
          .toString()
          .padStart(2, "0")}:${duration.seconds().toString().padStart(2, "0")}`}
      </TagText>
    </>
  );
}
