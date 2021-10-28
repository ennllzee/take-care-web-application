import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Badge, Grid, IconButton, Typography } from "@material-ui/core";
import {
  // Business,
  Event,
  Help,
  // Help,
  History,
  Person,
  Queue,
} from "@material-ui/icons";
import { history } from "../../helper/history";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import useGuideApi from "../../hooks/guidehooks";
import moment from "moment";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    icon: {
      // marginRight: theme.spacing(2),
      padding: 0,
    },
    title: {
      flexGrow: 1,
    },
    pos: {
      top: "auto",
      bottom: 0,
    },
    bar: {
      height: "7vh",
    },
    here: {
      backgroundColor: "#C785EB",
    },
    posGuide: {
      backgroundColor: "#508F7F",
      top: "auto",
      bottom: 0,
    },
  })
);

interface BottomBarProps {
  page: string;
}

function BottomBar({ page }: BottomBarProps) {
  const classes = useStyles();
  const accessToken = localStorage.getItem("accessToken");

  const { GET_ALL_APPOINTMENT_BY_GUIDE } = useGuideApi();
  const id = localStorage.getItem("_id");
  useEffect(() => {
    if (accessToken === null || id === null) {
      history.push("/");
    }
  }, [accessToken, id]);

  const { loading, error, data, refetch } = useQuery(
    GET_ALL_APPOINTMENT_BY_GUIDE,
    {
      variables: { getAllAppointmentByGuideGuideId: id },
      pollInterval: 60000,
    }
  );

  const [appointment, setAppointment] = useState<any[]>(
    data !== undefined ? data.getAllAppointmentByGuide : []
  );

  useEffect(() => {
    if (!loading && data) {
      setAppointment(data.getAllAppointmentByGuide);
    }
    if (error) console.log(error?.graphQLErrors);
  }, [loading, data, error]);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.posGuide}>
        <Toolbar className={classes.bar}>
          <Grid container direction="row" justify="space-around">
            <IconButton
              color="inherit"
              onClick={() => {
                refetch();
                history.push(`/profile&=${accessToken}`);
              }}
              className={classes.icon}
            >
              <Typography>
                <Person />
                {page === "Profile" && (
                  <Typography style={{ fontSize: 8 }}>profile</Typography>
                )}
              </Typography>
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => {
                refetch();
                history.push(`/customer&request&=${accessToken}`);
              }}
              className={classes.icon}
            >
              <Typography>
                <Badge
                  badgeContent={
                    appointment.filter(
                      (a) =>
                        new Date(
                          moment(a.AppointTime).format("DD MMMM yyyy")
                        ) >=
                          new Date(moment(new Date()).format("DD MMMM yyyy")) &&
                        new Date(
                          moment(a.AppointTime).format("DD MMMM yyyy")
                        ) <=
                          new Date(
                            moment(new Date())
                              .add(7, "days")
                              .format("DD MMMM yyyy")
                          ) &&
                        a.Status.Tag === "Wait for Guide to Confirm"
                    ).length
                  }
                  color="error"
                >
                  <Queue />
                </Badge>
                {page === "Customer Request" && (
                  <Typography style={{ fontSize: 8 }}>request</Typography>
                )}
              </Typography>
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => {
                refetch();
                history.push(`/appointment&=${accessToken}`);
              }}
              className={classes.icon}
            >
              <Typography>
                <Badge
                  badgeContent={
                    appointment.filter(
                      (a) =>
                        new Date(
                          moment(a.AppointTime).format("DD MMMM yyyy")
                        ) >=
                          new Date(moment(new Date()).format("DD MMMM yyyy")) &&
                        new Date(
                          moment(a.AppointTime).format("DD MMMM yyyy")
                        ) <=
                          new Date(
                            moment(new Date())
                              .add(7, "days")
                              .format("DD MMMM yyyy")
                          ) &&
                        (a.Status.Tag === "Guide Confirm" ||
                          a.Status.Tag === "In process" ||
                          a.Status.Tag === "Expired")
                    ).length
                  }
                  color="error"
                >
                  <Event />
                </Badge>

                {page === "Appointment" && (
                  <Typography style={{ fontSize: 8 }}>appointment</Typography>
                )}
              </Typography>
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => {
                refetch();
                history.push(`/history&=${accessToken}`);
              }}
              className={classes.icon}
            >
              <Typography>
                <History />
                {page === "History" && (
                  <Typography style={{ fontSize: 8 }}>history</Typography>
                )}
              </Typography>
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => history.push(`/customer&service&=${accessToken}`)}
            >
              <Typography>
                <Help />
                {page === "Customer Service" && (
                  <Typography style={{ fontSize: 8 }}>help</Typography>
                )}
              </Typography>
            </IconButton>
            {/* <IconButton
              color="inherit"
              onClick={() => history.push(`/hospital&information&=${accessToken}`)}
              className={classes.icon}
            >
              <Business />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => history.push(`/customer&service&=${accessToken}`)}
              className={classes.icon}
            >
              <Help />
            </IconButton> */}
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default BottomBar;
