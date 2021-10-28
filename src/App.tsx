import React, { useCallback, useState } from "react";
import "./App.css";
import clsx from "clsx";
import {
  makeStyles,
  Theme,
  createStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import SideBar from "./components/SideBar/SideBar";
import LoginPage from "./components/Login/LoginPage";
import ValidateGuidePage from "./components/ValidateGuide/ValidateGuidePage";
import DashboardPage from "./components/Dashboard/DashboardPage";
import CustomerDataPage from "./components/CustomerData/CustomerDataPage";
import GuideDataPage from "./components/GuideData/GuideDataPage";
import ReportPage from "./components/Report/ReportPage";

const drawerWidth = 240;

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Mitr", "cursive"].join(","),
    body1: {
      fontSize: 12,
    },
    caption: {
      fontSize: 10,
    },
    h1: {
      fontSize: 36,
    },
    h2: {
      fontSize: 32,
    },
    h3: {
      fontSize: 28,
    },
    h4: {
      fontSize: 24,
    },
    h5: {
      fontSize: 20,
    },
    h6: {
      fontSize: 16,
    },
    button: {
      fintSize: 12,
    },
  },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexGrow: 1,
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(1, 1, 1, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    content: {
      flexGrow: 1,
      // padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    large: {
      width: theme.spacing(8),
      height: theme.spacing(8),
      margin: "15px 5px 15px 5px",
    },
    big: {
      width: theme.spacing(14),
      height: theme.spacing(14),
      marginLeft: "auto;",
      marginRight: "auto;",
    },
    colorAppBar: {
      // change ColorAppBar
      background: "#8196D4",
    },
    bg: {
      backgroundColor: "#F6F6F4",
      minHeight: "100vh",
    },
  })
);

function App() {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const accessToken = localStorage.getItem("accessToken");
  const id = localStorage.getItem("_id");
  const [login, setLogin] = useState<boolean>(
    accessToken !== null && id !== null
  );

  const loginHelp = useCallback(() => {
    setLogin(true);
  }, [setLogin]);

  const handleDrawerOpen = () => {
    // const accessToken = localStorage.getItem("accessToken");
    // const id = localStorage.getItem("_id");
    if (login) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <NavBar
            open={open}
            setOpen={setOpen}
            classes={classes}
            handleDrawerOpen={handleDrawerOpen}
            login={login}
          />

          <SideBar
            open={open}
            setOpen={setOpen}
            classes={classes}
            handleDrawerClose={handleDrawerClose}
            setLogin={setLogin}
          />

          <main
            className={clsx(
              classes.content,
              {
                [classes.contentShift]: open,
              },
              classes.bg
            )}
          >
            <div className={classes.drawerHeader} />

            <Switch>
              <Route
                exact
                path="/"
                component={() => (
                  <LoginPage setLogin={loginHelp} login={login} />
                )}
              />
              <Route
                exact
                path={`/validate&=guide`}
                component={ValidateGuidePage}
              />
              <Route exact path="/dashboard" component={DashboardPage} />
              <Route exact path="/customer" component={CustomerDataPage} />
              <Route exact path="/guide" component={GuideDataPage} />
              <Route exact path="/report" component={ReportPage} />
            </Switch>
          </main>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
