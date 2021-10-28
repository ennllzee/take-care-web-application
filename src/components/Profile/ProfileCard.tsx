import {
  CardContent,
  CardMedia,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
  Card,
  Button,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { history } from "../../helper/history";
import { useGoogleLogout } from "react-google-login";
import { ExitToApp } from "@material-ui/icons";
import { useState } from "react";
import Submit from "../Submit/Submit";

interface ProfileCardProps {
  name: string;
  gmail?: string;
  img: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      display: "flex",
    },
    details: {
      display: "flex",
      flexDirection: "column",
      padding: "2%",
      width: "60%",
    },
    content: {
      flex: "1 0 auto",
    },
    cover: {
      width: "40%",
    },
    logout: {
      display: "flex",
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
  })
);

function ProfileCard({ name, gmail, img }: ProfileCardProps) {
  const classes = useStyles();
  const [load, setLoad] = useState<boolean>(false);
  const logout = async () => {
    setConfirm(false)
    setLoad(true);
    await localStorage.clear();
    setLoad(false);
    history.push("/");
  };

  const [confirm, setConfirm] = useState<boolean>(false);
  
  const { signOut } = useGoogleLogout({
    clientId:
      "907374215732-jc7l3sk84f05vlsf9e23ceo674ek0sbe.apps.googleusercontent.com",
    onLogoutSuccess: logout,
  });

  return (
    <Card className={classes.card}>
      <Backdrop open={load}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Submit
        submit={confirm}
        title="ลงชื่อออก"
        text="ต้องการลงชื่อออกระบบใช่หรือไม่"
        denyText="ยกเลิก"
        submitText="ยืนยัน"
        denyAction={() => setConfirm(false)}
        submitAction={signOut}
      />
      <CardMedia className={classes.cover} image={img} title={name} />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h6" variant="h6">
            {name}
            <br />
            <Typography variant="caption" color="textSecondary">
              {gmail}
            </Typography>
          </Typography>
        </CardContent>
        <Grid container justify="flex-end" className={classes.logout}>
          <Button onClick={() => setConfirm(true)} style={{ padding: "3%" }}>
            <Grid
              container
              direction="row"
              spacing={1}
              justify="center"
              alignItems="center"
            >
              <ExitToApp />
              <Typography variant="body1">ลงชื่อออก</Typography>
            </Grid>
          </Button>
        </Grid>
      </div>
    </Card>
  );
}

export default ProfileCard;
