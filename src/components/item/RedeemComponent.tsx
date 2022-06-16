import { useCallback, useContext, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { Box, MenuItem, Select, TextField } from "@mui/material";

import {
  AuthorDescription,
  DetailContainer,
  DetailLeft,
  DetailRight,
  Main,
  StyledContent,
  StyledImage,
  Video,
} from "./ItemComponents";
import { Button } from "../shared";
import { Separator } from "./ModalComponents";

import { config, strings } from "@constants";
import { MockCMSService } from "src/data/MockCMSService";

import { useProfileQuery, useRedeemClaimableCodeMutation } from "@services";
import ConnectContext from "../../utils/ConnectContext";
import { useTheme } from "styled-components";
import { RedeemResultDialog } from "./RedeemResultDialog";
import { getWalletLink } from "src/utils/walletLink";

export interface RedeemComponentProps {
  id: string;
}

export const RedeemComponent: React.FC<RedeemComponentProps> = ({ id }) => {
  const profile = useProfileQuery({
    variables: {
      organizationID: config.ORGANIZATION_ID,
    },
  });
  const { connect, setConnect } = useContext(ConnectContext);
  const { colors } = useTheme();
  const router = useRouter();
  const cms = useMemo(() => {
    return new MockCMSService();
  }, []);

  const cmsData = useMemo(() => {
    return cms.getData("123");
  }, [cms]);

  const [redeemClaimableCode] = useRedeemClaimableCodeMutation();

  const [code, setCode] = useState("");
  const [name, setName] = useState("");

  const [type, setType] = useState<
    "success" | "error" | "required-code" | "required-wallet" | undefined
  >(undefined);

  const [wallet, setWallet] = useState<string | undefined>(undefined);
  const wallets = useMemo(() => {
    const wallets: string[] = (profile?.data?.me?.wallets ?? []).map(
      (wallet) => wallet.address
    );
    if (connect.connected && connect.account) {
      wallets.push(connect.account);
    }
    return wallets;
  }, [profile?.data?.me?.wallets, connect.account, connect.connected]);

  const showSuccessPopup = useCallback(() => {
    setType("success");
  }, []);

  const showFailPopup = useCallback(() => {
    setType("error");
  }, []);

  const showCodeRequiredPopup = useCallback(() => {
    setType("required-code");
  }, []);

  const showWalletRequiredPopup = useCallback(() => {
    setType("required-wallet");
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!code) {
      showCodeRequiredPopup();
    } else if (!wallet) {
      showWalletRequiredPopup();
    } else {
      try {
        await redeemClaimableCode({
          variables: {
            code,
            destAddr: connect.account,
          },
        });
        showSuccessPopup();
      } catch (e) {
        console.log(e);
        showFailPopup();
      }
    }
  }, [
    code,
    connect.account,
    redeemClaimableCode,
    showCodeRequiredPopup,
    showFailPopup,
    showSuccessPopup,
    showWalletRequiredPopup,
    wallet,
  ]);

  const handleClose = useCallback(() => {
    if (type === "success") {
      router.push("/");
    } else {
      setType(undefined);
    }
  }, [type, router]);

  return (
    <Main>
      <RedeemResultDialog
        walletLink={getWalletLink(wallet)}
        onClose={handleClose}
        type={type}
      />
      <StyledContent>
        <DetailContainer style={{ flexDirection: "row", width: "100%" }}>
          <DetailLeft>
            {cmsData?.format === "image" && (
              <StyledImage src={cmsData.image} alt={id} width={612} />
            )}
            {cmsData?.format === "video" && (
              <Video width={612} controls preload="auto">
                <source src={cmsData.video} type="video/mp4" />
              </Video>
            )}
          </DetailLeft>

          <DetailRight
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <AuthorDescription>
                {strings.REDEEM.DESCRIPTION.INFORMATION}
              </AuthorDescription>
              <TextField
                value={name}
                label={strings.REDEEM.LABEL.FULL_NAME}
                onChange={(e) => setName(e.target.value)}
              />
              <AuthorDescription>
                {strings.REDEEM.DESCRIPTION.REDEMPTION_CODE}
              </AuthorDescription>
              <TextField
                value={code}
                label={strings.REDEEM.LABEL.REDEMPTION_CODE}
                onChange={(e) => setCode(e.target.value)}
              />
              <AuthorDescription>
                {strings.REDEEM.DESCRIPTION.SELECT_WALLET}
              </AuthorDescription>
                <Select
                  value={wallet}
                  onChange={(e) => setWallet(e.target.value as string)}
                >
                  {wallets.map((wallet) => (
                    <MenuItem key={wallet} value={wallet}>
                      {wallet}
                    </MenuItem>
                  ))}
                </Select>
              <Separator />
              <Button onClick={handleSubmit}>{strings.REDEEM.BUTTON}</Button>
              {wallets.length === 0 && (
                <>
                  <Box
                    sx={{
                      backgroundColor: `${colors.textOverlayBackground}`,
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      left: 0,
                      right: 0,
                      boxShadow: `0px 0px 20px 20px ${colors.textOverlayBackground}`,
                      zIndex: 1,
                    }}
                  />
                  <div
                    style={{
                      backgroundColor: `${colors.textOverlayBackground}`,
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      left: 0,
                      right: 0,
                      boxShadow: `0px 0px 20px 20px ${colors.textOverlayBackground}`,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "1.3rem",
                      zIndex: 1,
                    }}
                  >
                    Connect your wallet to redeem
                  </div>
                </>
              )}
            </div>
          </DetailRight>
        </DetailContainer>
      </StyledContent>
    </Main>
  );
};
