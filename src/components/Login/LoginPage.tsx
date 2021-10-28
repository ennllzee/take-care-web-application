import {
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
  Backdrop,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { history } from "../../helper/history";
import { useGoogleLogin } from "react-google-login";
import Alert from "../Alert/Alert";
import { useGoogleLogout } from "react-google-login";

import { useQuery } from "@apollo/client";
import useAdminApi from "../../hooks/adminhooks";
import { ExitToApp } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // minHeight: "100vh",
      // backgroundColor: "#8FA5E6",
      marginTop: theme.spacing(8),
    },
    paper: {
      // background: "white",
      width: "80vw",
      
    },
    login: {
      padding: "5%",
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
  })
);

interface LoginPageProps {
  setLogin: any;
  login: boolean;
}

function LoginPage({ setLogin, login }: LoginPageProps) {
  const classes = useStyles();

  // const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (login) {
      history.push(`/dashboard`);
    }
  }, [login]);

  const [res, setRes] = useState<any>();
  const [token, setToken] = useState<string>();

  const responseGoogle = async (response: any) => {
    setRes(response);
    setToken(response.tokenId);
  };

  const { LOGIN } = useAdminApi();

  const { loading, error, data } = useQuery(LOGIN, {
    variables: { loginAdminToken: token },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (!loading && res !== undefined && token !== undefined) {
      if (data) {
        localStorage.setItem("_id", data.loginAdmin._id);
        localStorage.setItem("accessToken", res.accessToken);
        setLogin(true);
        history.push(`/dashboard`);
      } else {
        setAlert(true);
      }
    }
    if (error) {
      console.log(error.graphQLErrors)
    };
  }, [loading, res, token, error, data, setLogin]);

  const [alert, setAlert] = useState<boolean>(false);

  const loginFailed = () => {
    setAlert(false);
  };

  
  const { signIn } = useGoogleLogin({
    clientId:
      "907374215732-cj2ep14tclbc8aehn9svjkcnfn4ai8cl.apps.googleusercontent.com",
    onSuccess: responseGoogle,
    isSignedIn: true,
    onFailure: responseGoogle,
    cookiePolicy: "single_host_origin",
  });

  const { signOut } = useGoogleLogout({
    clientId:
      "907374215732-cj2ep14tclbc8aehn9svjkcnfn4ai8cl.apps.googleusercontent.com",
    onLogoutSuccess: loginFailed,
  });

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="space-between"
      className={classes.root}
    >
      <Grid item>
        {/* <Paper className={classes.paper}> */}
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.google}
          >
            <Grid item xs={12} md={12} lg={12} >
              <Typography variant="h4" align="center" noWrap>
                ลงชื่อเข้าระบบ
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={12} >
              <Typography align="center">
              <Button
                onClick={signIn}
                // fullWidth={true}
                style={{
                  // padding: "3%",
                  backgroundColor: "#8196D4",
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
                  <ExitToApp />
                  <Typography variant="body1">Sign In with Google</Typography>
                </Grid>
              </Button>
              </Typography>
            </Grid>
          </Grid>
          <Backdrop open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        {/* </Paper> */}
      </Grid>
      <Alert
        closeAlert={signOut}
        alert={alert}
        title="ลงชื่อไม่สำเร็จ"
        text="ไม่พบบัญชีนี้ในระบบ Admin"
        buttonText="ปิด"
      />
    </Grid>
  );
}
export default LoginPage;
