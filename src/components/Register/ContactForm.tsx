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
import {
  Email,
  NavigateBefore,
  NavigateNext,
  Phone,
  PhoneAndroid,
} from "@material-ui/icons";
import { useState } from "react";
import CustomerForm from "../../models/CustomerForm";
import Alert from "../Alert/Alert";

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

interface ContactFormProps {
  user: CustomerForm;
  setUser: any;
  setStep: any;
}

function ContactForm({ user, setUser, setStep }: ContactFormProps) {
  const classes = useStyles();
  const [phoneNum, setPhoneNum] = useState<string | undefined>(
    user.PhoneNumber
  );

  const gmail = localStorage.getItem("gmail")
  const [email, setEmail] = useState<string | undefined | null>(user.Email !== undefined ? user.Email : gmail);
  const [emerNum, setEmerNum] = useState<string | undefined>(user.EmergencyTel);
  const [alert,setAlert] = useState<boolean>(false)

  const back = () => {
    setUser({
      ...user,
      PhoneNumber: phoneNum,
      Email: email,
      EmergencyTel: emerNum,
    });
    setStep(2);
  };

  const next = () => {
    if (phoneNum !== undefined && email !== undefined) {
      setUser({
        ...user,
        PhoneNumber: phoneNum,
        Email: email,
        EmergencyTel: emerNum,
      });
      setStep(4);
    }else{
      setAlert(true)
    }
  };

  return (
    <Grid>
      <form className={classes.form}>
        <Grid
          container
          direction="row"
          alignItems="center"
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
                  3
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
        <div className={classes.margin}>
          <Grid container spacing={2} justify="center" alignItems="flex-end">
            <Grid item>
              <Phone />
            </Grid>
            <Grid item xs={10}>
              <TextField
                id="input-with-icon-grid"
                label="เบอร์โทรกรณีฉุกเฉิน (ถ้ามี)"
                fullWidth={true}
                value={emerNum}
                onChange={(e) => setEmerNum(e.target.value)}
                type="number"
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
      <Alert
        closeAlert={() => setAlert(false)}
        alert={alert}
        title="ข้อมูลไม่ครบ"
        text="กรุณากรอกข้อมูลที่จำเป็นให้ครบ"
        buttonText="ปิด"
      />
    </Grid>
  );
}

export default ContactForm;
