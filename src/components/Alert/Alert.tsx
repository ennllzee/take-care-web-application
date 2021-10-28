import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

interface AlertProps {
  closeAlert: any;
  alert: boolean;
  title: string;
  text: string;
  buttonText: string
}

function Alert({ closeAlert, alert, title, text, buttonText }: AlertProps) {
  return (
    <Dialog
      open={alert}
      fullWidth={true}
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeAlert}>
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Alert;
