import { useMemo, ReactNode } from "react";
import {
  Button as MuiButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { strings } from "@constants";

export interface AlertDialogProps {
  open: boolean;
  title: ReactNode;
  message: ReactNode;
  onClose: () => void;
}

export const AlertDialog: React.FC<AlertDialogProps> = ({ open, title, message, onClose }) => (
  <Dialog
    open={open}
    onClose={onClose}
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
      <MuiButton onClick={onClose} autoFocus>
        {strings.REDEEM.ALERT.CLOSE}
      </MuiButton>
    </DialogActions>
  </Dialog>
);