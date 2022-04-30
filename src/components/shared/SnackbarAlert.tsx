import React, { useCallback } from "react";
import Snackbar from '@material-ui/core/Snackbar';
import { SnackbarCloseReason } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

type Severity = "error" | "success" | "info" | "warning";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
interface SnackbarAlertProps {
  show: boolean;
  message: string;
  severity?: Severity;
  onClose?: Function,
}

export const SnackbarAlert = ({ show, message, severity = 'success' , onClose}: SnackbarAlertProps) => {
  const handleClose = (event: React.SyntheticEvent<Element, Event>,) => {
    onClose && onClose();
  };
  const _handleSnackBarClose = (event: React.SyntheticEvent<Element, Event>, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose && onClose();
  };
  return (
    <React.Fragment>
        <Snackbar open={show} autoHideDuration={3000}  onClose={_handleSnackBarClose}>
            <Alert  severity={severity}  onClose={handleClose}>
            {message}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};
