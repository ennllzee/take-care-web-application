import { useQuery } from "@apollo/client";
import {
  makeStyles,
  Theme,
  createStyles,
  Grid,
  Typography,
  Divider,
  CircularProgress,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { history } from "../../helper/history";
import convertToThaiDate from "../../hooks/convertToThaiDate";
import useCustomerApi from "../../hooks/customerhooks";
import Appointment from "../../models/Appointment";
import Alert from "../Alert/Alert";
import BottomBar from "../BottomBar/BottomBar";
import TopBar from "../TopBar/TopBar";
import AppointmentCard from "./AppointmentCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(10),
      paddingRight: "5%",
      paddingLeft: "5%",
      minWidth: "100vw",
      maxWidth: "100vw",
    },
    line: {
      padding: "2%",
    },
    card: {
      padding: "2%",
    },
  })
);

function HistoryPage() {
  const classes = useStyles();
  const accessToken = localStorage.getItem("accessToken");
  const id = localStorage.getItem("_id")

  useEffect(() => {
    if (accessToken === null || id === null) {
      history.push("/");
    }
  }, [accessToken, id]);

  const { GET_ALLAPPOINTMENT_BY_CUSTOMER } = useCustomerApi();

  const { loading, error, data, refetch } = useQuery(
    GET_ALLAPPOINTMENT_BY_CUSTOMER,
    {
      variables: {
        getAllAppointmentByCustomerCustomerId: id,
      },
      pollInterval: 60000,
    }
  );

  const [appointment, setAppointment] = useState<Appointment[]>(
    data !== undefined ? data.getAllAppointmentByCustomer : []
  );
  const [failed, setFailed] = useState<boolean>(false);
  useEffect(() => {
    if (!loading && data) {
      setAppointment(data.getAllAppointmentByCustomer);
    }
    if (error) {
      setFailed(true);
      console.log(error?.graphQLErrors);
    }
  }, [loading, data, error]);

  return (
    <Grid>
      <TopBar page="ประวัติการนัดหมาย" />
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="space-between"
      >
        <Alert
          closeAlert={() => setFailed(false)}
          alert={failed}
          title="ผิดพลาด"
          text="กรุณาลองใหม่อีกครั้ง"
          buttonText="ปิด"
        />
        <Grid item className={classes.main}>
          {!loading ? (
            <>
              {appointment.length !== 0 &&
              appointment.find((a) => a.Status.Tag === "Completed") ? (
                appointment
                  ?.filter((a) => a.Status.Tag === "Completed")
                  .slice()
                  .sort((a, b) => {
                    return (
                      new Date(a.AppointTime).getTime() -
                      new Date(b.AppointTime).getTime()
                    );
                  })
                  .reverse()
                  .map((a) => {
                    return (
                      <>
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          justify="flex-start"
                          className={classes.line}
                        >
                          <Grid item xs={10} md={11} lg={11}>
                            <Typography variant="h5">
                              {convertToThaiDate(new Date(a.AppointTime))}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider variant="middle" />
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          justify="center"
                          className={classes.card}
                        >
                          <Grid item xs={12} md={10} lg={8}>
                            <AppointmentCard
                              appointment={a}
                              refresh={() => refetch()}
                            />
                          </Grid>
                        </Grid>
                      </>
                    );
                  })
              ) : (
                <Typography
                  align="center"
                  variant="subtitle1"
                  color="textSecondary"
                >
                  ไม่มีประวัติการนัดหมาย
                </Typography>
              )}
            </>
          ) : (
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
            >
              <CircularProgress disableShrink />
            </Grid>
          )}
        </Grid>
      </Grid>
      <BottomBar page="History" />
    </Grid>
  );
}
export default HistoryPage;
