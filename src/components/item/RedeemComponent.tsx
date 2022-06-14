import { useCallback, useContext, useMemo, useState, ReactNode } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Button as MuiButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

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

import { strings } from "@constants";
import { MockCMSService } from "src/data/MockCMSService";

import { useRedeemClaimableCodeMutation } from "@services";
import ConnectContext from "../../utils/ConnectContext";
import Link from "next/link";
import { useTheme } from "styled-components";
import { AlertDialog } from "../shared/AlertDialog";
import { RedeemResultDialog } from "./RedeemResultDialog";

export interface RedeemComponentProps {
  id: string;
}

export const RedeemComponent: React.FC<RedeemComponentProps> = ({ id }) => {
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
  const [type, setType] = useState<"success" | "error" | "required" | undefined>(undefined);

  const walletLink = useMemo(() => {
    // Should update in the future - to use correct subnet
    return `https://etherscan.io/address/${connect.account}`;
  }, [connect.account]);

  const showSuccessPopup = useCallback(() => {
    setType("success");
  }, []);

  const showFailPopup = useCallback(() => {
    setType("error");
  }, []);

  const showRequiredPopup = useCallback(() => {
    setType("required");
  }, []);

  const handleSubmit = useCallback(async () => {
    if (connect.account && code) {
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
    } else {
      showRequiredPopup();
    }
  }, [
    code,
    connect.account,
    redeemClaimableCode,
    showFailPopup,
    showRequiredPopup,
    showSuccessPopup,
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
        walletLink={walletLink}
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
              <Separator />
              <Button onClick={handleSubmit}>{strings.REDEEM.BUTTON}</Button>
              {!(connect.connected && connect.account) && (
                <>
                  {/* display overlay */}
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
