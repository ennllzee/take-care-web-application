import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";

interface TextSubmitProps {
  submit: boolean;
  title: string;
  text: string;
  denyText: string;
  submitText: string;
  denyAction: any;
  submitAction: any;
  denyDetail?: string;
  setDenyDetail: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100vw",
    },
  })
);

function TextSubmit({
  submit,
  title,
  text,
  denyText,
  submitText,
  denyAction,
  submitAction,
  denyDetail,
  setDenyDetail,
}: TextSubmitProps) {
  const classes = useStyles();
  return (
    <Dialog
      //   onClose={closeSubmit}
      aria-describedby="alert-dialog-description"
      aria-labelledby="alert-dialog-title"
      open={submit}
      className={classes.root}
      fullWidth={true}
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {text}
        </DialogContentText>
        <TextField
          type="text"
          label="ข้อความปฏิเสธ"
          fullWidth={true}
          value={denyDetail}
          onChange={(e) => setDenyDetail(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <DialogActions>
          <Button onClick={denyAction}>{denyText}</Button>
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

export default TextSubmit;
