import React, { useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import DoneIcon from '@mui/icons-material/Done';
import  {  InfoLabel, Center, Card,SuccessContainer } from "@components";
import { useWallet} from "@utils";
import { strings } from "@constants";

const ConnectedPage: NextPage = ({  }) => {
  const { wallet } = useWallet();
  const router = useRouter();

  useEffect(() => {
    if (!wallet.isTokenOwner) {
      router.replace("/");
    }
  },[router, wallet]);

  return <Center>
    <Card>
      <SuccessContainer>
          <DoneIcon/>
      </SuccessContainer>
       <InfoLabel>{strings.WALLET.OWNER_SUCCESS_MESSAGE}</InfoLabel>
      </Card>
  </Center>;
};

export default ConnectedPage;
