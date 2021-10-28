import {
  Button,
  Checkbox,
  createStyles,
  Fab,
  FormControlLabel,
  Grid,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import {
  Email,
  PhoneAndroid,
  Business,
  NavigateBefore,
  NavigateNext,
} from "@material-ui/icons";
import { useState } from "react";
import GuideForm from "../../models/GuideForm";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: "100vh",
    },
    sub: {
      minHeight: "15vh",
    },
    main: {
      minHeight: "70vh",
      paddingRight: "5%",
      paddingLeft: "5%",
      minWidth: "80vw",
      maxWidth: "100vw",
    },
    form: {
      paddingTop: "5%",
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

interface ContactFormProps {
  user: GuideForm;
  setUser: any;
  setStep: any;
}

function ContactForm({ user, setUser, setStep }: ContactFormProps) {
  const classes = useStyles();
  const [phoneNum, setPhoneNum] = useState<string | undefined>(
    user.PhoneNumber
  );
  const gmail = localStorage.getItem('gmail')
  const [email, setEmail] = useState<string | undefined | null>(user.Email !== undefined ? user.Email : gmail);
  const [address, setAddress] = useState<string | undefined>(
    user.ContactAddress
  );

  const back = () => {
    setUser({
      ...user,
      PhoneNumber: phoneNum,
      Email: email,
      ContactAddress: address,
    });
    setStep(4);
  };

  const next = () => {
    if (
      phoneNum !== undefined &&
      email !== undefined &&
      address !== undefined
    ) {
      setUser({
        ...user,
        PhoneNumber: phoneNum,
        Email: email,
        ContactAddress: address,
      });
      setStep(6);
    }
  };

  const [same, setSame] = useState<boolean>(
    user.ContactAddress === user.Address ? true : false
  );

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
                  style={{ background: "#6DB8A5", color: "white" }}
                  disabled={true}
                >
                  5
                </Fab>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h4">Contact</Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  ช่องทางการติดต่อ
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* <Typography variant="h4">ช่องทางการติดต่อ</Typography> */}
        <div className={classes.margin}>
          <Grid container spacing={2} justify="center" alignItems="flex-end">
            <Grid item>
              <Business />
            </Grid>
            <Grid item xs={10}>
              <TextField
                id="input-with-icon-grid"
                label="ที่อยู่ปัจจุบัน"
                fullWidth={true}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                InputLabelProps={{
                  shrink: address !== undefined,
                }}
                type="text"
                disabled={same}
                required
              />
            </Grid>
            <Grid item xs={10} style={{ padding: 0 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={same}
                    onChange={() => {
                      if (!same) {
                        setAddress(user.Address);
                      }
                      setSame((s) => !s);
                    }}
                    style={{color: "#508F7F"}}
                  />
                }
                label="same as the address"
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={2} justify="center" alignItems="flex-end">
            <Grid item>
              <PhoneAndroid />
            </Grid>
            <Grid item xs={10}>
              <TextField
                id="input-with-icon-grid"
                label="เบอร์โทรศัพท์มือถือ"
                fullWidth={true}
                value={phoneNum}
                onChange={(e) => setPhoneNum(e.target.value)}
                required
                type="number"
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={2} justify="center" alignItems="flex-end">
            <Grid item>
              <Email />
            </Grid>
            <Grid item xs={10}>
              <TextField
                id="input-with-icon-grid"
                label="อีเมล์"
                fullWidth={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
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
              // color="primary"
              onClick={back}
              style={{
                padding: "7%",
                // backgroundColor: "#508F7F",
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
              // color="primary"
              onClick={next}
              style={{
                padding: "7%",
                backgroundColor: "#508F7F",
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

export default ContactForm;
