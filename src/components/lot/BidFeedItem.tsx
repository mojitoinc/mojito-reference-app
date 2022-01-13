import React, { useState } from "react";
import Image from "next/image";
import styled from "styled-components";

import { config, images, strings } from "@constants";
import { formatCurrencyAmount, getTimeAgo } from "@utils";

interface StyledProps {
  isTop?: boolean;
}

const Container = styled.div<StyledProps>(
  ({ theme, isTop }) => `
  align-items: center;
  border-top: 0 solid ${theme.colors.border};
  display: flex;
  font: ${theme.fonts.small("bold")};
  justify-content: space-between;
  padding: 14px 0;
  border-top-width: ${isTop ? "0" : "1px"};
`
);

const Bidder = styled.div(
  ({ theme }) => `
  align-items: center;
  display: flex;
  flex: 1;

  ${theme.down(theme.breakpoints.md)} {
    & img {
      display: none !important;
    }
  }
`
);

const AvatarImage = styled(Image)`
  border-radius: 50%;
  overflow: hidden;
`;

const Name = styled.span<StyledProps>(
  ({ theme, isTop }) => `
  font-family: ${isTop ? theme.fonts.primary : theme.fonts.secondary};
  font-size: ${isTop ? theme.fonts.h3Size : theme.fonts.smallSize};
  font-weight: 400;
  margin-left: 25px;

  ${theme.down(theme.breakpoints.md)} {
    font-size: ${theme.fonts.smallSize} !important;
    margin-left: 0;
  }
`
);

const WarningContainer = styled.div`
  position: relative;
`;

const Warning = styled.span`
  cursor: default;
  margin-left: 10px;
`;

const Arrow = styled.div`
  background-color: ${({ theme }) => theme.colors.info};
  height: 15px;
  left: 10px;
  position: absolute;
  top: 22px;
  transform: rotate(45deg);
  width: 15px;
`;

const WarningMessage = styled.div(
  ({ theme }) => `
  background-color: ${theme.colors.info};
  border-radius: ${theme.borderRadius.small};
  font: ${theme.fonts.small()};
  left: -85px;
  padding: 5px;
  position: absolute;
  top: 27px;
  width: 200px;
  z-index: ${theme.zIndex.info};
`
);

const Bid = styled.span<StyledProps>(
  ({ theme, isTop }) => `
  flex: 1;
  text-align: right;
  font-size: ${isTop ? theme.fonts.h3Size : undefined};

  ${theme.down(theme.breakpoints.md)} {
    font-size: ${theme.fonts.smallSize} !important;
  }
`
);

export const BidFeedItem = ({ item, isTop, userId }: any) => {
  const [showMessage, setShowMessage] = useState(false);
  const {
    amount,
    createdAt,
    marketplaceUser: { avatar, username, id },
    userOrganization: {
      user: { name },
    },
    outbidinfo,
  } = item;
  const timeAgo = getTimeAgo(createdAt);
  const avatarBetterQuality = avatar?.replace("_normal", "_400x400");

  const onShowMessage = () => {
    if (!showMessage) {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 5000);
    }
  };

  return (
    <Container isTop={isTop}>
      <Bidder>
        <AvatarImage
          src={avatarBetterQuality || images.AVATAR_PLACEHOLDER?.src}
          alt={images.AVATAR_PLACEHOLDER?.alt}
          width={
            isTop
              ? images.AVATAR_PLACEHOLDER?.medium
              : images.AVATAR_PLACEHOLDER?.small
          }
          height={
            isTop
              ? images.AVATAR_PLACEHOLDER?.medium
              : images.AVATAR_PLACEHOLDER?.small
          }
        />
        <Name isTop={isTop}>
          {id === userId ? strings.COMMON.YOU : username || name}
        </Name>
        <WarningContainer>
          {outbidinfo && <Warning onClick={onShowMessage}>{strings.LOT.BID_FEED.WARNING_ICON}</Warning>}
          {showMessage && (
            <>
              <Arrow />
              <WarningMessage>
                {strings.LOT.BID_FEED.WARNING_MESSAGE}
              </WarningMessage>
            </>
          )}
        </WarningContainer>
      </Bidder>
      <span>{timeAgo}</span>
      <Bid isTop={isTop}>
        {+(amount / config.ETH_VALUE_MULTIPLIER).toFixed(5)}&#926;{" "}
        {formatCurrencyAmount(amount)}
      </Bid>
    </Container>
  );
};
