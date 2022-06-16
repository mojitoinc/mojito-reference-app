import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import {
  PUICheckoutComponentProps, THREEDS_FLOW_SEARCH_PARAM_ERROR_KEY, THREEDS_FLOW_SEARCH_PARAM_SUCCESS_KEY, useOpenCloseCheckoutModal
} from "@mojitonft/mojito-mixers";

import { config, images, strings } from "@constants";
import { AuctionDetailProps } from "@interfaces";
import { useIsUserOnAllowListQuery, useProfileQuery } from "@services";
import { getSaleStage } from "@utils";

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
  Video,
  Main,
} from "./ItemComponents";
import { Winner } from "./AuctionComponents";
import { Button, StatusTag } from "../shared";
import { CheckoutComponent } from "../payment-ui";

export const BuyNowDetail: React.FC<AuctionDetailProps> = ({
  item,
  cmsData,
}) => {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
  const [isSeeMoreLot, setIsSeeMoreLot] = useState(true);
  const [isSeeMoreAuthor, setIsSeeMoreAuthor] = useState(true);
  const router = useRouter();
  const paymentIdParam = router.query[THREEDS_FLOW_SEARCH_PARAM_SUCCESS_KEY]?.toString();
  const paymentErrorParam = router.query[THREEDS_FLOW_SEARCH_PARAM_ERROR_KEY]?.toString();
  const lotID = (item?.details?.id as string) || "";

  const { data: profile } = useProfileQuery({
    skip: !isAuthenticated,
    variables: {
      organizationID: config.ORGANIZATION_ID,
    },
  });

  const {
    loading: loadingIsUserOnAllowList,
    data: isUserOnAllowListResponse,
  } = useIsUserOnAllowListQuery({
    skip: !isAuthenticated,
    variables: {
      lotID,
    },
  });

  const isUserOnAllowList = isUserOnAllowListResponse?.isUserOnAllowList;

  const login = () => {
    loginWithRedirect({
      appState: {
        returnTo: window.location.pathname,
        origin: router.asPath,
      },
    });
  };

  const { loaderMode, isOpen, onOpen, onClose } = useOpenCloseCheckoutModal({
    paymentIdParam,
    paymentErrorParam,
  });

  const otherPageSpecificProps: Partial<PUICheckoutComponentProps> = {
    orgID: config.ORGANIZATION_ID || "",
    checkoutItems: [
      {
        // Common:
        lotID,
        collectionItemId: "",
        lotType: "buyNow",
        name: item.name || "",
        description: cmsData?.about || "",
        imageSrc: cmsData?.image || "",
        imageBackground: "rgba(0, 0, 0, .125)",

        // Buy Now:
        units: 1,
        totalSupply:
          (item?.details as { totalUnits: number })?.totalUnits || 0,
        remainingSupply:
          (item?.details as { totalAvailableUnits: number })
            ?.totalAvailableUnits || 0,

        // Auction:
        fee: 0,
      },
    ],
  };

  if (item.details.__typename !== "MarketplaceBuyNowOutput") {
    return <div>{strings.COMMON.INVALID_TYPE}</div>;
  }

  const isLotDescriptionLong = cmsData && cmsData.about.length > 350;
  const isAboutAuthorLong = cmsData && cmsData.author.about.length > 150;

  const saleStage = getSaleStage(item);
  const isPreSale = saleStage === "pre";
  const isDuringSale = saleStage === "during";
  const isPostSale = saleStage === "post";

  return (<>
    <CheckoutComponent
      loaderMode={ loaderMode }
      open={ isOpen }
      onClose={ onClose }
      { ...otherPageSpecificProps } />

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
            <Row>
              <LotId>#{cmsData?.lotNumber}</LotId>
              <StatusTag item={item} />
            </Row>
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
                  {strings.ITEM.AVAILABLE_SOON}
                </Button>
              )}
              {isDuringSale && !isLoading && (
                <>
                  {isAuthenticated ? (
                    <Button isBig onClick={onOpen} disabled={ loadingIsUserOnAllowList || !isUserOnAllowList }>
                      { loadingIsUserOnAllowList || isUserOnAllowList ? strings.ITEM.BUY_NOW : strings.ITEM.NOT_ALLOWED }
                    </Button>
                  ) : (
                    <Button isBig onClick={login}>
                      {strings.ITEM.LOGIN_BUTTON}
                    </Button>
                  )}
                </>
              )}
              {isPostSale && <Winner>{strings.ITEM.SOLD_OUT}</Winner>}
            </div>
          </DetailRight>
        </DetailContainer>
      </StyledContent>
    </Main>
  </>);
};
