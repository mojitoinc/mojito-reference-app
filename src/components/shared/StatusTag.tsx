import React, { useEffect, useState, useCallback } from "react";
import momentTimeZone from "moment-timezone";
import styled from "styled-components";

import { strings } from "@constants";
import { IAuctionLotBidView } from "@interfaces";
import { CollectionItemDataFragment } from "src/services/graphql/generated";

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

  // const { loading, data } = useMojitoSubscription(
  //   EMojitoSubscriptions.timeNotifier
  // );

  // useEffect(() => {
  //   if (loading) return;
  //   const serverTime = momentTimeZone(
  //     data?.timeNotifier?.time.split(".")[0].split(" ").join("T") + "Z"
  //   );
  //   setServerTime(serverTime);
  // }, [loading, data?.timeNotifier?.time]);

  const tagTextView = (bidView: IAuctionLotBidView) => {
    if (bidView.isPreSale)
      return (
        <>
          {strings.COMMON.BIDDING_STARTS}
          <TagText>{formattedStartDate}</TagText>
        </>
      );
    if (bidView.isDuringSale)
      return (
        <Countdown
          eventTime={endDate}
          serverTime={serverTime}
          interval={1000}
        />
      );
    return <TagText>{strings.COMMON.AUCTION_FINISHED}</TagText>;
  };

  return (
    <Tag>
      {tagTextView({ isDuringSale: true, isPostSale: false, isPreSale: false })}
    </Tag>
  );
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
  eventTime: momentTimeZone.Moment;
  serverTime: momentTimeZone.Moment;
  interval: number;
}

function Countdown({ eventTime, serverTime, interval }: CountdownProps) {
  const [duration, setDuration] = useState(
    calculateDuration(eventTime, serverTime)
  );
  const timerCallback = useCallback(() => {
    setDuration(calculateDuration(eventTime, serverTime.add(1, "seconds")));
  }, [serverTime]);

  useEffect(() => {
    const intervalId = setInterval(timerCallback, interval);

    return () => clearInterval(intervalId);
  }, [serverTime]);

  return (
    <>
      {strings.COMMON.AUCTION_CLOSES}
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
