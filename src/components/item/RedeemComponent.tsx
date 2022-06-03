import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/router";
import {
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

export interface RedeemComponentProps {
  id: string;
  walletAddr: string;
}

export const RedeemComponent: React.FC<RedeemComponentProps> = ({
  id,
  walletAddr: destAddr,
}) => {
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

  const handleSubmit = async () => {
    try {
      const res = await redeemClaimableCode({
        variables: {
          code,
          destAddr: destAddr.length === 0 ? undefined : destAddr,
        },
      });
      showSuccessPopup();
    } catch (e) {
      console.log(e);
      showFailPopup();
    }
  };

  const showSuccessPopup = () => {
    openModal({
      open: true,
      title: strings.REDEEM.ALERT.SUCCESS.TITLE,
      message: strings.REDEEM.ALERT.SUCCESS.MESSAGE,
      success: true,
    });
  }

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
          </DetailRight>
        </DetailContainer>
      </StyledContent>
    </Main>
  );
};
