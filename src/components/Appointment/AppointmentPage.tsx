import { useQuery } from "@apollo/client";
import {
  makeStyles,
  Theme,
  createStyles,
  Grid,
  Typography,
  Divider,
  CircularProgress,
  Fab,
} from "@material-ui/core";
import { DateRange, Timer } from "@material-ui/icons";
import moment from "moment";
import { useEffect, useState } from "react";
import { history } from "../../helper/history";
import convertToThaiDate from "../../hooks/convertToThaiDate";
import useGuideApi from "../../hooks/guidehooks";
import Appointment from "../../models/Appointment";
import Alert from "../Alert/Alert";
import BottomBar from "../BottomBar/BottomBar";
import TopBar from "../TopBar/TopBar";
import AppointmentCard from "./AppointmentCard";
import ManageSchedule from "./ManageSchedule";

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
      paddingTop: 0,
    },
    waitfab: {
      position: "fixed",
      bottom: theme.spacing(10),
      right: theme.spacing(2),
      backgroundColor: "#4884E6",
      color: "white",
    },
    fab: {
      position: "fixed",
      bottom: theme.spacing(10),
      right: theme.spacing(2),
      backgroundColor: "#508F7F",
      color: "white",
    },
  })
);

function AppointmentPage() {
  const classes = useStyles();
  const accessToken = localStorage.getItem("accessToken");
  const id = localStorage.getItem("_id");
  useEffect(() => {
    if (accessToken === null || id === null) {
      history.push("/");
    }
  }, [accessToken, id]);

  const { GET_DATA_APPOINTMENTPAGE } = useGuideApi();

  const { loading, error, data, refetch } = useQuery(GET_DATA_APPOINTMENTPAGE, {
    variables: { getAllAppointmentByGuideGuideId: id, getGuideId: id },
    pollInterval: 60000,
  });

  const [appointment, setAppointment] = useState<Appointment[]>(
    data !== undefined ? data.getAllAppointmentByGuide : []
  );

  const [manage, setManage] = useState<boolean>(false);

  const [rangeDate, setRangeDate] = useState<string[]>([]);

  const [isValidate, setIsValidate] = useState<boolean>(
    data !== undefined ? data.getGuide.IsVerified : false
  );

  const [failed, setFailed] = useState<boolean>(false);

  useEffect(() => {
    setRangeDate([]);
    for (let i = 0; i < 8; i++) {
      setRangeDate((d) => [
        ...d,
        moment(new Date()).add(i, "days").format("DD MMMM yyyy"),
      ]);
    }
    if (!loading && data) {
      setAppointment(data.getAllAppointmentByGuide);
      setIsValidate(data.getGuide.IsVerified);
    }
    if (error) {
      setFailed(true);
      console.log(error?.graphQLErrors);
    }
  }, [loading, data, error]);

  const [alert, setAlert] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(0);

  return (
    <Grid>
      <TopBar page="การนัดหมาย" />
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
        justify="flex-start"
      >
        <Grid item className={classes.main}>
          {!loading ? (
            <>
              {isValidate ? (
                <Fab
                  className={classes.fab}
                  onClick={() => setManage(true)}
                  variant="extended"
                >
                  <DateRange /> ตารางงาน
                </Fab>
              ) : (
                <Fab className={classes.waitfab} variant="extended">
                  <Timer /> อยู่ระหว่างขั้นตอนรอการอนุมัติ
                </Fab>
              )}

              {appointment !== undefined &&
              appointment.find(
                (a) =>
                  (a.Status.Tag === "Guide Confirm" ||
                    a.Status.Tag === "In process" ||
                    a.Status.Tag === "Expired") &&
                  rangeDate.find(
                    (d) =>
                      moment(d).format("DD MMMM yyyy") ===
                      moment(a.AppointTime).format("DD MMMM yyyy")
                  )
              ) ? (
                rangeDate.map((d, k) => {
                  return (
                    appointment !== undefined &&
                    appointment.find(
                      (a) =>
                        (a.Status.Tag === "Guide Confirm" ||
                          a.Status.Tag === "In process" ||
                          a.Status.Tag === "Expired") &&
                        moment(a.AppointTime).format("DD MMMM yyyy") ===
                          moment(d).format("DD MMMM yyyy")
                    ) && (
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
                              {convertToThaiDate(new Date(d))}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider variant="middle" />
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          justify="center"
                          className={classes.line}
                        >
                          {appointment
                            ?.filter(
                              (a) =>
                                (a.Status.Tag === "Guide Confirm" ||
                                  a.Status.Tag === "In process" ||
                                  a.Status.Tag === "Expired") &&
                                moment(a.AppointTime).format("DD MMMM yyyy") ===
                                  moment(d).format("DD MMMM yyyy")
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
                                    item
                                    xs={12}
                                    md={10}
                                    lg={8}
                                    className={classes.card}
                                  >
                                    <AppointmentCard
                                      appointment={a}
                                      setAlert={setAlert}
                                      setPrice={setPrice}
                                      refresh={() => refetch()}
                                    />
                                  </Grid>
                                </>
                              );
                            })}
                        </Grid>
                      </>
                    )
                  );
                })
              ) : (
                <Typography
                  align="center"
                  variant="subtitle1"
                  color="textSecondary"
                >
                  ไม่มีการนัดหมาย
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
      <BottomBar page="Appointment" />
      <Alert
        closeAlert={() => setAlert(false)}
        alert={alert}
        title="สิ้นสุดการบริการ"
        text={`ค่าบริการ: ${price} บาท`}
        buttonText="ตกลง"
      />
      <ManageSchedule open={manage} setOpen={setManage} />
    </Grid>
  );
}
export default AppointmentPage;
