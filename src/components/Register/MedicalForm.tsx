import {
  Button,
  createStyles,
  Fab,
  Grid,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { Healing, NavigateBefore, NavigateNext } from "@material-ui/icons";
import { useState } from "react";
import CustomerForm from "../../models/CustomerForm";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      paddingTop: "2%",
    },
    margin: {
      margin: theme.spacing(1),
    },
    box: {
      padding: "5%",
      marginBottom: "5%",
    },
    end: {
      minHeight: "5vh",
    },
    img: {
      height: "20vh",
      weight: "80%",
      border: "2px solid #000",
    },
    card: {
      padding: "2%",
    },
    button: {
      padding: "5%",
    },
  })
);

interface ProfileFormProps {
  user: CustomerForm;
  setUser: any;
  setStep: any;
}

function MedicalForm({ user, setUser, setStep }: ProfileFormProps) {
  const classes = useStyles();

  const [disorder, setDisorder] = useState<string | undefined>(
    user.CongenitalDisorders
  );

  const next = () => {
      setUser({
        ...user,
        CongenitalDisorders: disorder,
      });
      setStep(3);
  };

  const back = () => {
    setUser({
      ...user,
      CongenitalDisorders: disorder,
    });
    setStep(1);
  };

  return (
    <Grid>
      <form className={classes.form}>
        <Grid
          container
          direction="row"
          alignItems="flex-start"
          justify="space-between"
        >
          <Grid item xs={12}>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justify="flex-start"
            >
              <Grid item>
                <Fab
                  variant="extended"
                  style={{ background: "#AC86C7", color: "white" }}
                  disabled={true}
                >
                  2
                </Fab>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h4">Medical Information</Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  ข้อมูลทางการแพทย์
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <div className={classes.margin}>
          <Grid container spacing={2} justify="center" alignItems="flex-end">
            <Grid item>
              <Healing />
            </Grid>
            <Grid item xs={10}>
              <TextField
                id="input-with-icon-grid"
                label="โรคประจำตัว (ถ้ามี)"
                fullWidth={true}
                value={disorder}
                onChange={(e) => setDisorder(e.target.value)}
                type="text"
              />
            </Grid>
          </Grid>
        </div>

        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          className={classes.button}
        >
          <Grid item xs={3} md={3} lg={2}>
            <Button
              fullWidth={true}
              type="button"
              onClick={back}
              style={{
                padding: "7%",
                color: "black",
              }}
            >
              <Grid
                container
                direction="row"
                spacing={1}
                justify="center"
                alignItems="center"
              >
                <NavigateBefore/>
                <Typography variant="body1">ก่อนหน้า</Typography>
              </Grid>
            </Button>
          </Grid>
          <Grid item xs={3} md={3} lg={2}>
            <Button
              fullWidth={true}
              type="submit"
              onClick={next}
              style={{
                padding: "7%",
                backgroundColor: "#7C5D92",
                color: "white",
              }}
            >
              <Grid
                container
                direction="row"
                spacing={1}
                justify="center"
                alignItems="center"
              >
                <Typography variant="body1">ถัดไป</Typography>
                <NavigateNext/>
              </Grid>
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}

export default MedicalForm;
