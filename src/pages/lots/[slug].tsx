/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

import { config, images, strings } from "@constants";
import { BidFeed, StatusTag, BidConfirmModal, Button } from "@components";
import { useMojito, useLazyMojito, useFetchAfterAuth } from "@hooks";
import { EMojitoQueries } from "@state";
import { formatCurrencyAmount } from "@utils";
import Content from "content.json";

const Main = styled.main`
  padding: 40px 0;
`;

const TopBanner = styled.div(
  ({ theme }) => `
  font: ${theme.fonts.body("bold")};
  height: 40px;
  margin: 0 auto;
  margin-bottom: 16px;
  max-width: 1176px;
  padding: 0 30px;
  width: 100%;
`
);

const YourBid = styled.div(
  ({ theme }) => `
  align-items: center;
  border: ${theme.borders.medium(theme.colors.bidBannerBorder)};
  border-radius: ${theme.borderRadius.small};
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`
);

const Outbid = styled.div(
  ({ theme }) => `
  align-items: center;
  border: ${theme.borders.medium(theme.colors.primary)};
  border-radius: ${theme.borderRadius.small};
  color: ${theme.colors.primary};
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`
);

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailContainer = styled.div(
  ({ theme }) => `
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

  ${theme.down(theme.breakpoints.lg)} {
    margin: 0;
  }
`
);

const DetailLeft = styled.div(
  ({ theme }) => `
  margin: 0 36px 40px;

  & .image,
  .video {
    background-color: ${theme.colors.imageBackground};
    border-radius: ${theme.borderRadius.medium};
    max-height: 588px;
    object-fit: contain;
  }

  ${theme.down(theme.breakpoints.md)} {
    padding: 0 30px;
  }

  ${theme.down(theme.breakpoints.lg)} {
    margin: 0 0 40px;
  }
`
);

const StyledImage = styled.img(
  ({ theme }) => `
  background-color: ${theme.colors.imageBackground};
  border-radius: ${theme.borderRadius.medium};
  max-height: 588px;
  object-fit: contain;

  ${theme.down(theme.breakpoints.md)} {
    width: 100%;
  }
`
);

const Video = styled.video(
  ({ theme }) => `
  background-color: ${theme.colors.imageBackground};
  border-radius: ${theme.borderRadius.medium};
  max-height: 588px;
  object-fit: contain;

  ${theme.down(theme.breakpoints.md)} {
    width: 100%;
  }
`
);

const DetailRight = styled.div(
  ({ theme }) => `
  margin: 0 36px;
  max-width: 432px;
  width: 100%;

  ${theme.down(theme.breakpoints.lg)} {
    margin: 0 30px;
  }
`
);

const Row = styled.div`
  align-items: center;
  display: flex;
`;

const LotId = styled.span(
  ({ theme }) => `
  color: ${theme.colors.primary};
  font: ${theme.fonts.body("bold")};
  margin-right: 8px;
`
);

const LotTitle = styled.h2`
  margin: 16px 0;
`;

const LotDescription = styled.p(
  ({ theme }) => `
  font: ${theme.fonts.small()};
  line-height: 20px;
`
);

const MoreText = styled.span(
  ({ theme }) => `
  color: ${theme.colors.primary};
  cursor: pointer;
  font: ${theme.fonts.small("bold")};
  text-decoration: ${theme.textDecoration.seeMoreText};
`
);

const Author = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 141px;
`;

const AuthorImage = styled.div`
  margin-right: 30px;
  min-width: 60px;

  & img {
    border-radius: 50%;
  }
`;

const AuthorName = styled.h3(
  ({ theme }) => `
  font: ${theme.fonts.body("bold")};
  margin: 0 0 10px;
`
);

const AuthorDescription = styled.p(
  ({ theme }) => `
  font: ${theme.fonts.small()};
  line-height: 20px;
`
);

const CurrentBid = styled.p(
  ({ theme }) => `
  font: ${theme.fonts.body()};
  line-height: 22px;
  text-align: center;
  margin: 40px 0 20px;
`
);

const CurrentBidAmount = styled.span(
  ({ theme }) => `
  color: ${theme.colors.primary};
  font-weight: bold;
`
);

const Winner = styled.div(
  ({ theme }) => `
  font: ${theme.fonts.body()};
  text-align: center;

  & span {
    font-weight: bold;
  }
`
);

const WinnerName = styled.span(
  ({ theme }) => `
  color: ${theme.colors.secondary};
`
);

const LotDetail: NextPage = ({ lot }: any) => {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSeeMoreLot, setIsSeeMoreLot] = useState(true);
  const [isSeeMoreAuthor, setIsSeeMoreAuthor] = useState(true);
  const [hasBid, setHasBid] = useState(false);
  const router = useRouter();

  const { data: mojitoLotData } = useMojito(EMojitoQueries.oneLot, {
    variables: {
      marketplaceAuctionLotId: lot.mojitoId,
    },
  });
  const [getData, { data: profile }] = useLazyMojito(EMojitoQueries.profile, {
    variables: {
      organizationID: config.ORGANIZATION_ID,
    },
  });

  useFetchAfterAuth(getData);

  const login = () => {
    loginWithRedirect({
      appState: {
        returnTo: window.location.pathname,
        origin: router.asPath,
      },
    });
  };

  const isLotDescriptionLong = lot.about.length > 350;
  const isAboutAuthorLong = lot.author.about.length > 150;
  let currentBid;
  if (mojitoLotData)
    currentBid = mojitoLotData.getMarketplaceAuctionLot.currentBid;

  return (
    <Main>
      {hasBid &&
        mojitoLotData &&
        !!mojitoLotData.getMarketplaceAuctionLot.bids.length &&
        profile &&
        mojitoLotData?.getMarketplaceAuctionLot.bidView.isDuringSale && (
          <TopBanner>
            {mojitoLotData.getMarketplaceAuctionLot.bids[0].marketplaceUser
              .id === profile.me.id ? (
              <YourBid>{strings.LOT.HIGHEST_BID}</YourBid>
            ) : (
              <Outbid>{strings.LOT.OUTBID}</Outbid>
            )}
          </TopBanner>
        )}
      <StyledContent>
        <DetailContainer>
          <DetailLeft>
            {lot.format === "image" && (
              <StyledImage src={lot.image} alt={lot.title} width={612} />
            )}
            {lot.format === "video" && (
              <Video width={612} controls preload="auto">
                <source src={lot.video} type="video/mp4" />
              </Video>
            )}
          </DetailLeft>

          <DetailRight>
            {mojitoLotData && (
              <>
                <Row>
                  <LotId>#{lot.lotId}</LotId>
                  <StatusTag
                    mojitoLotData={mojitoLotData.getMarketplaceAuctionLot}
                  />
                </Row>
              </>
            )}
            <LotTitle>{lot.title}</LotTitle>
            <LotDescription>
              {`${
                isSeeMoreLot && isLotDescriptionLong
                  ? `${lot.about.slice(0, 350)}...`
                  : lot.about
              } `}
              {isLotDescriptionLong && (
                <MoreText onClick={() => setIsSeeMoreLot(!isSeeMoreLot)}>
                  {isSeeMoreLot
                    ? strings.COMMON.SEE_MORE
                    : strings.COMMON.SEE_LESS}
                </MoreText>
              )}
            </LotDescription>
            <Author>
              <AuthorImage>
                <Image
                  src={lot.author.avatar.url || images.AVATAR_PLACEHOLDER?.src}
                  alt={images.AVATAR_PLACEHOLDER?.alt}
                  width={images.AVATAR_PLACEHOLDER?.authorSize}
                  height={images.AVATAR_PLACEHOLDER?.authorSize}
                />
              </AuthorImage>
              <div>
                <AuthorName>{lot.author.name}</AuthorName>
                <AuthorDescription>
                  {`${
                    isSeeMoreAuthor && isAboutAuthorLong
                      ? `${lot.author.about.slice(0, 150)}...`
                      : lot.author.about
                  } `}
                  {isAboutAuthorLong && (
                    <MoreText
                      onClick={() => setIsSeeMoreAuthor(!isSeeMoreAuthor)}
                    >
                      {isSeeMoreAuthor
                        ? strings.COMMON.SEE_MORE
                        : strings.COMMON.SEE_LESS}
                    </MoreText>
                  )}
                </AuthorDescription>
              </div>
            </Author>
            {mojitoLotData?.getMarketplaceAuctionLot.bidView.isDuringSale &&
              currentBid && (
                <CurrentBid>
                  {strings.COMMON.CURRENT_BID}
                  <CurrentBidAmount>
                    {formatCurrencyAmount(
                      currentBid?.amount ? currentBid?.amount : 0
                    )}
                  </CurrentBidAmount>
                </CurrentBid>
              )}
            <div>
              {mojitoLotData?.getMarketplaceAuctionLot.bidView.isPreSale && (
                <Button isBig disabled>
                  {strings.LOT.AVAILABLE_SOON}
                </Button>
              )}
              {mojitoLotData?.getMarketplaceAuctionLot.bidView.isDuringSale &&
                !isLoading && (
                  <>
                    {isAuthenticated ? (
                      <>
                        {mojitoLotData &&
                        currentBid &&
                        profile &&
                        currentBid.marketplaceUser.id === profile?.me.id ? (
                          <Button isBig disabled>
                            {strings.LOT.BID_SENT}
                          </Button>
                        ) : (
                          <>
                            {profile && !profile.me.userOrgs[0].username ? (
                              <Link href="/profile" passHref>
                                <Button isBig>
                                  {strings.LOT.SET_USERNAME}
                                </Button>
                              </Link>
                            ) : (
                              <Button
                                onClick={() => setShowConfirmModal(true)}
                                isBig
                              >
                                {hasBid &&
                                currentBid?.marketplaceUser.id !==
                                  profile?.me.id
                                  ? strings.LOT.BID_AGAIN_BUTTON
                                  : strings.LOT.BID_NOW_BUTTON}
                              </Button>
                            )}
                          </>
                        )}
                      </>
                    ) : (
                      <Button isBig onClick={login}>
                        {strings.LOT.LOGIN_BUTTON}
                      </Button>
                    )}
                  </>
                )}
              {mojitoLotData?.getMarketplaceAuctionLot.bidView.isPostSale &&
                currentBid && (
                  <Winner>
                    <div>
                      {strings.LOT.WINNING_BID}
                      <span>{formatCurrencyAmount(currentBid.amount)}</span>
                    </div>
                    <div>
                      {strings.LOT.BY}
                      <WinnerName>
                        {`${currentBid.marketplaceUser.username}${
                          currentBid.marketplaceUser.id === profile?.me.id
                            ? ` (${strings.COMMON.YOU})`
                            : ""
                        }`}
                      </WinnerName>
                    </div>
                  </Winner>
                )}
            </div>
          </DetailRight>
        </DetailContainer>
        {!!mojitoLotData?.getMarketplaceAuctionLot.bids.length && (
          <BidFeed
            bids={mojitoLotData.getMarketplaceAuctionLot.bids}
            profile={profile}
          />
        )}
        {showConfirmModal && (
          <BidConfirmModal
            handleClose={() => setShowConfirmModal(false)}
            lot={lot}
            mojitoLotData={mojitoLotData?.getMarketplaceAuctionLot}
            setHasBid={(value: boolean) => setHasBid(value)}
          />
        )}
      </StyledContent>
    </Main>
  );
};

export default LotDetail;

export async function getServerSideProps({ params }: any) {
  const { lots } = Content;
  const lot = lots.find((lot) => lot.slug == params.slug);

  return {
    props: {
      lot: lot,
    },
  };
}
