/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";
import styled from "styled-components";

import { StatusTag } from "@components";
import { strings } from "@constants";
import { CollectionItemDataFragment } from "@services";
import { CMSData } from "@state";
import { formatCurrencyAmount, isDuringSale, isPostSale } from "@utils";

const Item = styled.a(
  ({ theme }) => `
  border-radius: ${theme.borderRadius.medium};
  color: inherit;
  display: flex;
  flex-direction: column;
  margin: 0 12px 68px;
  max-width: 400px;
  text-align: left;
  text-decoration: none;
  width: 100%;

  ${theme.down(theme.breakpoints.md)} {
    margin: 0 auto 68px;
  }
`
);

const ImageWrapper = styled.div`
  position: relative;
  height: 415px;
  width: 100%;
  margin-bottom: 16px;
`;

const ItemImage = styled(Image)(
  ({ theme }) => `
  background-color: ${theme.colors.imageBackground};
  border-radius: ${theme.borderRadius.medium};
`
);

const Video = styled.video(
  ({ theme }) => `
  background-color: ${theme.colors.imageBackground};
  border-radius: ${theme.borderRadius.medium};
  height: 100%;
  width: 100%;
`
);

const TagContainer = styled.div`
  align-self: flex-start;
  margin-bottom: 12px;
`;

const Line = styled.div`
  justify-content: space-between;
  overflow: hidden;
  white-space: nowrap;
`;

const Title = styled.h3(
  ({ theme }) => `
  font: ${theme.fonts.h3("bold", theme.fonts.secondary)};
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
`
);

const Row = styled.div(
  ({ theme }) => `
  align-items: flex-end;
  display: flex;
  font: ${theme.fonts.small()};
  justify-content: space-between;
`
);

const Paragraph = styled.p`
  margin: 3px 0;
`;

const WinnerName = styled.span(
  ({ theme }) => `
  color: ${theme.colors.secondary};
  font-weight: bold;
`
);

const CreatorName = styled.span`
  font-weight: bold;
`;

const Id = styled(Paragraph)(
  ({ theme }) => `
  color: ${theme.colors.primary};
  font-weight: bold;
`
);

const CurrentBid = styled.div`
  text-align: right;
`;

const CurrentBidAmount = styled.div(
  ({ theme }) => `
  color: ${theme.colors.primary};
  font: ${theme.fonts.body("bold")};
`
);

export interface CollectionGridItemProps {
  item: CollectionItemDataFragment;
  cmsData?: CMSData;
  youHoldBid?: boolean;
}

export const CollectionGridItem = ({
  item,
  cmsData,
  youHoldBid,
}: CollectionGridItemProps) => (
  <Item href={`item/${item.slug}`}>
    <ImageWrapper>
      {cmsData?.format === "image" && (
        <ItemImage
          objectFit="cover"
          layout="fill"
          draggable="false"
          src={cmsData.image!}
          alt="lot-image"
        />
      )}
      {cmsData?.format === "video" && (
        <Video preload="none" poster={cmsData.preview}>
          <source src={cmsData.video} />
        </Video>
      )}
    </ImageWrapper>
    <TagContainer>
      <StatusTag item={item} />
    </TagContainer>
    <Line>
      <Title>{item.name}</Title>
    </Line>
    <Row>
      <div>
        <Id>{`#${item.slug}`}</Id>
        <Paragraph>
          {item.details.__typename === "MarketplaceAuctionLot" &&
          isPostSale(item) &&
          item.details.currentBid ? (
            <>
              {strings.COMMON.WINNER}
              <WinnerName>
                {`${item.details.currentBid?.marketplaceUser?.username}${
                  youHoldBid ? ` (${strings.COMMON.YOU})` : ""
                }`}
              </WinnerName>
            </>
          ) : (
            <>
              {strings.COMMON.CREATED_BY}
              <CreatorName>{cmsData?.author.name}</CreatorName>
            </>
          )}
        </Paragraph>
      </div>
      {item.details.__typename === "MarketplaceAuctionLot" &&
        isDuringSale(item) && (
          <CurrentBid>
            {strings.COMMON.CURRENT_BID}
            <CurrentBidAmount>
              {formatCurrencyAmount(
                item.details.currentBid?.amount
                  ? item.details.currentBid?.amount
                  : 0
              )}
            </CurrentBidAmount>
          </CurrentBid>
        )}
    </Row>
  </Item>
);
