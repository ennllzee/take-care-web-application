import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import AppointmentPage from "../Appointment/AppointmentPage";
import CustomerRequestPage from "../CustomerRequest/CustomerRequestPage";
import CustomerServicePage from "../CustomerService/CustomerServicePage";
// import CustomerServicePage from "../CustomerService/CustomerServicePage";
import HistoryPage from "../History/HistoryPage";
// import HospitalInformationPage from "../HospitalInformation/HospitalInformationPage";
import ProfilePage from "../Profile/ProfilePage";

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      minHeight: "100vh"
    }
  })
)

function Home() {

  const classes = useStyles()
  const accessToken = localStorage.getItem('accessToken')

  return (
    <div className={classes.root}>
        <Switch>
          <Route exact path={`/profile&=${accessToken}`} component={ProfilePage} />
          <Route exact path={`/appointment&=${accessToken}`} component={AppointmentPage} />
          <Route exact path={`/history&=${accessToken}`} component={HistoryPage} />
          <Route exact path={`/customer&request&=${accessToken}`} component={CustomerRequestPage} />
          <Route exact path={`/customer&service&=${accessToken}`} component={CustomerServicePage} />
          {/* <Route path={`/hospital&information&=${accessToken}`} component={HospitalInformationPage} />
          <Route path={`/customer&service&=${accessToken}`} component={CustomerServicePage} /> */}
        </Switch>
    </div>
  );
}

export default Home;
