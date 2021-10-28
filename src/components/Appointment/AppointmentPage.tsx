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
import { PostAdd } from "@material-ui/icons";
import moment from "moment";
import { useEffect, useState } from "react";
import { history } from "../../helper/history";
import convertToThaiDate from "../../hooks/convertToThaiDate";
import useCustomerApi from "../../hooks/customerhooks";
import Appointment from "../../models/Appointment";
import Alert from "../Alert/Alert";
import BottomBar from "../BottomBar/BottomBar";
import TopBar from "../TopBar/TopBar";
import AddAppointment from "./AddAppointment";
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
    fab: {
      position: "fixed",
      bottom: theme.spacing(10),
      right: theme.spacing(2),
      backgroundColor: "#7C5D92",
      color: "white",
    },
  })
);

function AppointmentPage() {
  const classes = useStyles();
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    if (accessToken === null) {
      history.push("/");
    }
  }, [accessToken]);

  const { GET_ALLAPPOINTMENT_BY_CUSTOMER } = useCustomerApi();

  const id = localStorage.getItem("_id");

  const { loading, error, data, refetch } = useQuery(
    GET_ALLAPPOINTMENT_BY_CUSTOMER,
    {
      variables: { getAllAppointmentByCustomerCustomerId: id },
      pollInterval: 60000,
    }
  );
  const [failed, setFailed] = useState<boolean>(false);

  const [add, setAdd] = useState<boolean>(false);
  const [deleteAlert, setDeleteAlert] = useState<boolean>(false);
  const [appointment, setAppointment] = useState<Appointment[]>(
    data !== undefined ? data.getAllAppointmentByCustomer : []
  );
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (!loading && data) {
      setAppointment(data.getAllAppointmentByCustomer);
    }
    if (error) {
      setFailed(true)
      console.log(error?.graphQLErrors)
    };
  }, [loading, data, error]);

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
              {appointment?.filter(
                (a) =>
                  new Date(moment(a.AppointTime).format("DD MMMM yyyy")) >=
                    new Date(moment(new Date()).format("DD MMMM yyyy")) &&
                  new Date(moment(a.AppointTime).format("DD MMMM yyyy")) <=
                    new Date(
                      moment(new Date()).add(7, "days").format("DD MMMM yyyy")
                    ) &&
                  a.Status.Tag !== "Completed"
              ).length !== 0 ? (
                <>
                  {appointment
                    ?.filter(
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
                        a.Status.Tag !== "Completed"
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
                              <AppointmentCard
                                appointment={a}
                                setDeleteAlert={setDeleteAlert}
                                refresh={() => refetch()}
                              />
                            </Grid>
                          </Grid>
                        </>
                      );
                    })}
                </>
              ) : (
                <Typography align="center" variant="h6" color="textSecondary">
                  ไม่มีนัดหมาย
                </Typography>
              )}
              <Fab className={classes.fab} onClick={() => setAdd(true)}>
                <PostAdd />
              </Fab>
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
        closeAlert={() => setSuccess(false)}
        alert={success}
        title="สำเร็จ"
        text="เพิ่มนัดหมายสำเร็จ"
        buttonText="ปิด"
      />
      <Alert
        closeAlert={() => setDeleteAlert(false)}
        alert={deleteAlert}
        title="สำเร็จ"
        text="ยกเลิกนัดหมายสำเร็จ"
        buttonText="ปิด"
      />
      <AddAppointment
        open={add}
        setOpen={setAdd}
        setSuccess={setSuccess}
        appointments={appointment}
        refresh={() => refetch()}
      />
    </Grid>
  );
}
export default AppointmentPage;
