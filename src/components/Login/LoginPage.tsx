import {
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
  Paper,
  Button,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { history } from "../../helper/history";
import { useQuery } from "@apollo/client";
import Image from "material-ui-image";
import useCustomerApi from "../../hooks/customerhooks";
import { useGoogleLogin } from "react-google-login";
import { ExitToApp } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: "100vh",
      backgroundColor: "#C3A3DB",
      minWidth: "100vw",
      maxWidth: "100vw",
    },
    paper: {
      background: "white",
      width: "80vw",
      height: "80vh",
    },
    login: {
      padding: "5%",
      height: "80vh",
    },
    form: {
      paddingTop: "2%",
      paddingBottom: "2%",
    },
    margin: {
      margin: theme.spacing(1),
    },
    google: {
      padding: "2%",
    },
    name: {
      paddingLeft: "2%",
    },
  })
);

function LoginPage() {
  const classes = useStyles();

  const accessToken = localStorage.getItem("accessToken");
  const id = localStorage.getItem("_id")

  useEffect(() => {
    if (accessToken !== null && id !== null) {
      history.push(`/appointment&=${accessToken}`);
    }
  }, [accessToken, id]);

  const [res, setRes] = useState<any>();
  const [token, setToken] = useState<string>();

  const { LOGIN_CUSTOMER } = useCustomerApi();

  const { loading, error, data } = useQuery(LOGIN_CUSTOMER, {
    variables: { loginCustomerToken: token },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (!loading && res !== undefined && token !== undefined ) {
      if (!error && data.loginCustomer ) {
        localStorage.setItem("_id", data.loginCustomer._id);
        localStorage.setItem("accessToken", res.accessToken);
        history.push(`/appointment&=${localStorage.getItem("accessToken")}`);
      } else {
        console.log(error?.graphQLErrors)
        localStorage.setItem("token", res.tokenId);
        localStorage.setItem("gmail", res.profileObj.email);
        history.push("/register");
      }
    }
  }, [loading, res, token, error, data]);

  const responseGoogle = async (response: any) => {
    setRes(response);
    setToken(response.tokenId);
  };

  const { signIn } = useGoogleLogin({
    clientId:
      "907374215732-b5mgla300uqrmlvkq4gstaq0de9osef7.apps.googleusercontent.com",
    onSuccess: responseGoogle,
    isSignedIn: true,
    onFailure: responseGoogle,
    cookiePolicy: "single_host_origin",
  });

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      className={classes.root}
    >
      <Grid item>
        <Paper className={classes.paper}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.login}
          >
            <Grid xs={12} md={6} lg={6} className={classes.form}>
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="center"
              >
                <Grid item xs={6} md={6} lg={6}>
                  <Image src={`https://bn1305files.storage.live.com/y4m-VdmknM_pfPpiJERPIxlLWj2FpheMGzFF9YkvkMvoXUGDoa_GRUjjxP1JMUtB74zJzZp7BNR1038nmT8lQLMJzDaOQOBBFAl76hWq25RWFC3ml12RuYi3y-Je95YLiiaunBh8mBkWMnOy2mAlge6n5KGjIXJM0cXp6L8btV2YfaFzfPkBN6d8_D_hV9hhKG_?width=1080&height=1080&cropmode=none`} cover={true} />
                </Grid>
                <Grid item xs={12} md={12} lg={12} className={classes.form}>
                  <Typography
                    variant="h6"
                    align="center"
                    noWrap
                    color="textSecondary"
                  >
                    Hospital Care Guide Service
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12} md={6} lg={6} className={classes.form}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.google}
              >
                <Grid item xs={12} md={12} lg={12} className={classes.form}>
                  <Typography variant="h4" align="center" noWrap>
                    ลงชื่อเข้าระบบ
                  </Typography>
                </Grid>
                <Grid item xs={8} md={8} lg={8} className={classes.form}>
                  <Button
                    onClick={signIn}
                    fullWidth={true}
                    style={{
                      padding: "3%",
                      backgroundColor: "#7C5D92",
                      color: "white",
                    }}
                  >
                    <Grid
                      container
                      direction="row"
                      // spacing={1}
                      justify="center"
                      alignItems="center"
                    >
                      <ExitToApp/>
                      <Typography variant="body1">
                        Sign In with Google
                      </Typography>
                    </Grid>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <Backdrop open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Grid>
    </Grid>
  );
}

export default LoginPage;
