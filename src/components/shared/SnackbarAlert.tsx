import React, { useCallback } from "react";
import Snackbar from '@material-ui/core/Snackbar';
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
  const handleClose = (event: string, reason:string) => {
    if (reason === 'clickaway' || onClose === undefined) {
      return;
    }
    onClose();
  };
  return (
    <React.Fragment>
        <Snackbar open={show} autoHideDuration={6000}  onClose={handleClose}>
            <Alert  severity={severity}  onClose={handleClose}>
            {message}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};