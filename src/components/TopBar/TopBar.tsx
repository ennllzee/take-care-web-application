import { history } from "../../helper/history";
import {
  makeStyles,
  Theme,
  createStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";
import { GoogleLogout } from "react-google-login";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    bar: {
      height: "7vh",
    },
    icon: {
      // marginRight: theme.spacing(2),
      color: "white",
    },
    title: {
      flexGrow: 1,
    },
    typography: {
      padding: theme.spacing(2),
    },
    customer: {
      backgroundColor: "#508F7F",
    },
  })
);

interface TopBarProps {
  page: string;
}

function TopBar({ page }: TopBarProps) {
  const classes = useStyles();

  const logout = () => {
    localStorage.clear();
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.customer}>
        <Toolbar className={classes.bar}>
          <Typography variant="h4" className={classes.title}>
            {page}
          </Typography>
          {page === "ลงทะเบียน" && (
            <GoogleLogout
              clientId="907374215732-jc7l3sk84f05vlsf9e23ceo674ek0sbe.apps.googleusercontent.com"
              buttonText="Login"
              render={(renderProps) => (
                <Button
                  type="button"
                  onClick={renderProps.onClick}
                  className={classes.icon}
                >
                  ลงชื่อเข้าระบบ
                </Button>
              )}
              onLogoutSuccess={logout}
              icon={false}
            ></GoogleLogout>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default TopBar;
