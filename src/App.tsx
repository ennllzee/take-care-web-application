import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import LoginPage from "./components/Login/LoginPage";
import "./App.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import RegisterPage from "./components/Register/RegisterPage";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: "100vh",
    },
  })
);

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Mitr", "cursive"].join(","),
    body1: {
      fontSize: 12
    },
    body2: {
      fontSize: 11
    },
    caption: {
      fontSize: 10
    },
    h4: {
      fontSize: 24
    },
    h5: {
      fontSize: 20
    },
    h6: {
      fontSize: 16
    },
    button: {
      fontSize: 12
    }
  },
});

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <main>
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route path="/" component={Home} />
          </Switch>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
