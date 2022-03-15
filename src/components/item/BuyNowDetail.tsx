import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import {
  CollectionItemDataAllFragment,
  useProfileLazyQuery,
} from "src/services/graphql/generated";
import { CMSData } from "src/data/cmsData";
import { config, images, strings } from "@constants";
import { useFetchAfterAuth } from "@hooks";
import {
  Author,
  AuthorDescription,
  AuthorImage,
  AuthorName,
  DetailContainer,
  DetailLeft,
  DetailRight,
  ItemDescription,
  ItemTitle,
  LotId,
  MoreText,
  Row,
  StyledContent,
  StyledImage,
  TopBanner,
  Video,
} from "./ItemComponents";
import {
  CurrentBid,
  CurrentBidAmount,
  Outbid,
  Winner,
  YourBid,
} from "./AuctionComponents";
import { Button, StatusTag } from "../shared";
import { formatCurrencyAmount } from "@utils";
import Image from "next/image";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import { BuyNowModal } from "./BuyNowModal";

const Main = styled.main`
  padding: 40px 0;
`;

export interface AuctionDetailProps {
  item: CollectionItemDataAllFragment;
  cmsData?: CMSData;
}
export const BuyNowDetail: React.FC<AuctionDetailProps> = ({
  item,
  cmsData,
}) => {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSeeMoreLot, setIsSeeMoreLot] = useState(true);
  const [isSeeMoreAuthor, setIsSeeMoreAuthor] = useState(true);
  const [hasBid, setHasBid] = useState(false);
  const router = useRouter();

  const [getData, { data: profile }] = useProfileLazyQuery({
    variables: {
      organizationID: config.ORGANIZATION_ID,
    },
  });
  const login = () => {
    loginWithRedirect({
      appState: {
        returnTo: window.location.pathname,
        origin: router.asPath,
      },
    });
  };

  useFetchAfterAuth(getData);

  if (item.details.__typename !== "MarketplaceBuyNowOutput") {
    return <div>invalid type</div>;
  }

  const isLotDescriptionLong = cmsData && cmsData.about.length > 350;
  const isAboutAuthorLong = cmsData && cmsData.author.about.length > 150;
  const isDuringSale = true;
  const isPreSale = false;
  const isPostSale = false;

  return (
    <Main>
      <StyledContent>
        <DetailContainer>
          <DetailLeft>
            {cmsData?.format === "image" && (
              <StyledImage src={cmsData.image} alt={item.name} width={612} />
            )}
            {cmsData?.format === "video" && (
              <Video width={612} controls preload="auto">
                <source src={cmsData.video} type="video/mp4" />
              </Video>
            )}
          </DetailLeft>

          <DetailRight>
            {
              <>
                <Row>
                  <LotId>#{cmsData?.lotNumber}</LotId>
                  <StatusTag item={item} />
                </Row>
              </>
            }
            <ItemTitle>{item.name}</ItemTitle>
            <ItemDescription>
              {`${
                isSeeMoreLot && isLotDescriptionLong
                  ? `${cmsData?.about.slice(0, 350)}...`
                  : cmsData?.about
              } `}
              {isLotDescriptionLong && (
                <MoreText onClick={() => setIsSeeMoreLot(!isSeeMoreLot)}>
                  {isSeeMoreLot
                    ? strings.COMMON.SEE_MORE
                    : strings.COMMON.SEE_LESS}
                </MoreText>
              )}
            </ItemDescription>
            <Author>
              <AuthorImage>
                <Image
                  src={
                    cmsData?.author.avatar.url || images.AVATAR_PLACEHOLDER?.src
                  }
                  alt={images.AVATAR_PLACEHOLDER?.alt}
                  width={images.AVATAR_PLACEHOLDER?.authorSize}
                  height={images.AVATAR_PLACEHOLDER?.authorSize}
                />
              </AuthorImage>
              <div>
                <AuthorName>{cmsData?.author.name}</AuthorName>
                <AuthorDescription>
                  {`${
                    isSeeMoreAuthor && isAboutAuthorLong
                      ? `${cmsData?.author.about.slice(0, 150)}...`
                      : cmsData?.author.about
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

            <div>
              {isPreSale && (
                <Button isBig disabled>
                  {strings.LOT.AVAILABLE_SOON}
                </Button>
              )}
              {isDuringSale && !isLoading && (
                <>
                  {isAuthenticated ? (
                    <Button onClick={() => setShowConfirmModal(true)} isBig>
                      BUY NOW
                    </Button>
                  ) : (
                    <Button isBig onClick={login}>
                      {strings.LOT.LOGIN_BUTTON}
                    </Button>
                  )}
                </>
              )}
              {isPostSale && <Winner>Sold out</Winner>}
            </div>
          </DetailRight>
        </DetailContainer>
        {showConfirmModal && (
          <BuyNowModal
            handleClose={() => setShowConfirmModal(false)}
            item={item}
            cmsData={cmsData}
            setHasBid={(value: boolean) => setHasBid(value)}
          />
        )}
      </StyledContent>
    </Main>
  );
};
