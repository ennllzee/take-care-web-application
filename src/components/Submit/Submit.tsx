import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

interface AlertProps {
  submit: boolean;
  title: string;
  text: string;
  denyText: string;
  submitText: string;
  denyAction: any;
  submitAction: any;
}

function Submit({
  submit,
  title,
  text,
  denyText,
  submitText,
  denyAction,
  submitAction,
}: AlertProps) {
  return (
    <Dialog
      aria-describedby="alert-dialog-description"
      aria-labelledby="alert-dialog-title"
      open={submit}
      fullWidth={true}
    >
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <DialogActions>
          <Button
            onClick={denyAction}
          >
            {denyText}
          </Button>
          <Button
            onClick={submitAction}
            style={{
              backgroundColor: "#508F7F",
              color: "white",
            }}
          >
            {submitText}
          </Button>
        </DialogActions>
      </DialogActions>
    </Dialog>
  );
}

export default Submit;
