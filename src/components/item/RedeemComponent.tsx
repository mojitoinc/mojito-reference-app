import { useCallback, useContext, useMemo, useState } from "react";
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
} from "./ItemComponents";
import { Button } from "../shared";
import { Separator } from "./ModalComponents";

import { strings } from "@constants";
import { MockCMSService } from "src/data/MockCMSService";

import { useRedeemClaimableCodeMutation } from "@services";
import ConnectContext from "../../utils/ConnectContext";

export interface RedeemComponentProps {
  id: string;
}

export const RedeemComponent: React.FC<RedeemComponentProps> = ({ id }) => {
  const { connect, setConnect } = useContext(ConnectContext);
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
  const [{ open, success, title, message }, openModal] = useState({
    open: false,
    success: false,
    title: "",
    message: "",
  });

  const handleSubmit = useCallback(async () => {
    if (connect.account && code) {
      try {
        const res = await redeemClaimableCode({
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
      showFailPopup();
    }
  }, [code, connect.account, redeemClaimableCode]);

  const showSuccessPopup = () => {
    openModal({
      open: true,
      title: strings.REDEEM.ALERT.SUCCESS.TITLE,
      message: strings.REDEEM.ALERT.SUCCESS.MESSAGE,
      success: true,
    });
  };

  const showFailPopup = () => {
    openModal({
      open: true,
      title: strings.REDEEM.ALERT.FAIL.TITLE,
      message: strings.REDEEM.ALERT.FAIL.MESSAGE,
      success: false,
    });
  };

  const handleClose = useCallback(() => {
    openModal({
      open: false,
      title: "",
      message: "",
      success: false,
    });
    success && router.push(`/`);
  }, [success, router]);

  return (
    <Main>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <MuiButton onClick={handleClose} autoFocus>
            {strings.REDEEM.ALERT.CLOSE}
          </MuiButton>
        </DialogActions>
      </Dialog>
      <StyledContent>
        <DetailContainer style={{ flexDirection: "row", width: "100%" }}>
          <DetailLeft>
            {cmsData?.format === "image" && (
              <StyledImage src={cmsData.image} alt={id} width={612} />
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
                      backgroundColor: "#ffffffaf",
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      left: 0,
                      right: 0,
                      boxShadow: "0px 0px 20px 20px #ffffffaf",
                      zIndex: 1,
                    }}
                  />
                  <div
                    style={{
                      backgroundColor: "#ffffffaf",
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      left: 0,
                      right: 0,
                      boxShadow: "0px 0px 20px 20px #ffffffaf",
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
