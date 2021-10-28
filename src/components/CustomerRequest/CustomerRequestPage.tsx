import { useQuery } from "@apollo/client";
import {
  makeStyles,
  Theme,
  createStyles,
  Grid,
  CircularProgress,
  Divider,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import { useEffect, useState } from "react";
import { history } from "../../helper/history";
import convertToThaiDate from "../../hooks/convertToThaiDate";
import useGuideApi from "../../hooks/guidehooks";
import Appointment from "../../models/Appointment";
import Alert from "../Alert/Alert";
import BottomBar from "../BottomBar/BottomBar";
import TopBar from "../TopBar/TopBar";
import RequestCard from "./RequestCard";

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
      padding: "1%",
    },
    card: {
      padding: "2%",
    },
  })
);

function CustomerRequestPage() {
  const classes = useStyles();

  const { GET_ALL_APPOINTMENT_BY_GUIDE } = useGuideApi();
  const accessToken = localStorage.getItem("accessToken");
  const id = localStorage.getItem("_id");
  useEffect(() => {
    if (accessToken === null || id === null) {
      history.push("/");
    }
  }, [accessToken, id]);

  const { loading, error, data, refetch } = useQuery(GET_ALL_APPOINTMENT_BY_GUIDE, {
    variables: { getAllAppointmentByGuideGuideId: id },
    pollInterval: 60000,
  });

  const [appointment, setAppointment] = useState<Appointment[]>(
    data !== undefined ? data.getAllAppointmentByGuide : []
  );

  const [denyAlert, setDenyAlert] = useState<boolean>(false);
  const [acceptAlert, setAcceptAlert] = useState<boolean>(false);

  useEffect(() => {
    if (!loading && data) {
      setAppointment(data.getAllAppointmentByGuide);
    }
    if (error) {
      setFailed(true)
      console.log(error?.graphQLErrors)
    };
  }, [loading, data, error]);

  const [failed, setFailed] = useState<boolean>(false)

  return (
    <Grid>
      <TopBar page="คำขอรับบริการ" />
      <Alert
        closeAlert={() => setFailed(false)}
        alert={failed}
        title="ผิดพลาด"
        text="กรุณาลองใหม่อีกครั้ง"
        buttonText="ปิด"
      />
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="space-between"
      >
        <Grid item className={classes.main}>
          {!loading ? (
            <>
              {appointment !== undefined &&
              appointment.find(
                (a) =>
                  a.Status.Tag === "Wait for Guide to Confirm" &&
                  new Date(moment(a.AppointTime).format("DD MMMM yyyy")) >=
                    new Date(moment(new Date()).format("DD MMMM yyyy")) &&
                  new Date(moment(a.AppointTime).format("DD MMMM yyyy")) <=
                    new Date(
                      moment(new Date()).add(7, "days").format("DD MMMM yyyy")
                    )
              ) ? (
                appointment
                  ?.filter(
                    (a) =>
                      new Date(moment(a.AppointTime).format("DD MMMM yyyy")) >=
                        new Date(moment(new Date()).format("DD MMMM yyyy")) &&
                      new Date(moment(a.AppointTime).format("DD MMMM yyyy")) <=
                        new Date(
                          moment(new Date())
                            .add(7, "days")
                            .format("DD MMMM yyyy")
                        ) &&
                      a.Status.Tag === "Wait for Guide to Confirm"
                  )
                  .slice()
                  .sort((a, b) => {
                    return (
                      new Date(a.AppointTime).getTime() -
                      new Date(b.AppointTime).getTime()
                    );
                  })
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
                            <RequestCard appointment={a} setAcceptAlert={setAcceptAlert} setDenyAlert={setDenyAlert} refresh={() => refetch()}/>
                          </Grid>
                        </Grid>
                      </>
                    );
                  })
              ) : (
                <Typography align="center" variant="h6" color="textSecondary">
                  ไม่มีคำขอรับบริการ
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
      <Alert
        closeAlert={() => setAcceptAlert(false)}
        alert={acceptAlert}
        title="ตอบรับสำเร็จ"
        text="เพิ่มการนัดหมายสำเร็จ"
        buttonText="ตกลง"
      />
      <Alert
        closeAlert={() => setDenyAlert(false)}
        alert={denyAlert}
        title="ปฏิเสธสำเร็จ"
        text="ปฏิเสธการนัดหมายสำเร็จ"
        buttonText="ตกลง"
      />
      <BottomBar page="Customer Request" />
    </Grid>
  );
}
export default CustomerRequestPage;
