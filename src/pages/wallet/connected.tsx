import React, { useEffect, useCallback } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import  {  InfoLabel, Center, Card, SuccessContainer, TokenContainer } from "@components";
import { useWallet} from "@utils";
import { strings, images } from "@constants";

const ConnectedPage: NextPage = ({  }) => {
  const { wallet } = useWallet();
  const router = useRouter();

  useEffect(() => {
    if (!wallet.isTokenOwner) {
      router.replace("/");
    }
  },[router, wallet]);

  const renderToken = useCallback(() => {
    return wallet.tokens.map((value: number) => {
      const tokenImage = value > 50 ? images.WALLET_CONTRACT_51_100 : images.WALLET_CONTRACT_1_50;
      return <TokenContainer key={value}>
                <Image
                  src={tokenImage?.src}
                  alt={tokenImage.alt}
                  width={tokenImage.width}
                  height={tokenImage.height}
              />
        </TokenContainer>
    });
  },[wallet]);

  return <>{wallet.isTokenOwner && <Center>
    <Card>
      <SuccessContainer>
        {renderToken()}
      </SuccessContainer>
      <InfoLabel>{strings.WALLET.OWNER_SUCCESS_MESSAGE}</InfoLabel>
    </Card>
  </Center>
  }
  </>;
};

export default ConnectedPage;
