import React from "react";
import type { NextPage } from "next";
import CloseIcon from '@mui/icons-material/Close';
import  {  InfoLabel, Center, Card,FailureContainer } from "@components";
import { strings } from "@constants";

const PurchasePage: NextPage = ({  }) => {
  
  return <Center>
    <Card>
      <FailureContainer>
          <CloseIcon/>
      </FailureContainer>
       <InfoLabel>{strings.WALLET.OWNER_FAILURE_MESSAGE}</InfoLabel>
      </Card>
  </Center>;
};
export default PurchasePage;
