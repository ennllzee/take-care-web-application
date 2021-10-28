import React, { useEffect, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Backdrop,
  Button,
  CardHeader,
  Chip,
  CircularProgress,
  Grid,
  Link,
} from "@material-ui/core";
import moment from "moment";
import Appointment from "../../models/Appointment";
import Image from "material-ui-image";
import Submit from "../Submit/Submit";
import ChangeGuide from "./ChangeGuide";
import Alert from "../Alert/Alert";
import {
  Cancel,
  CheckCircle,
  Delete,
  Error,
  FaceRounded,
  Person,
  PlayCircleFilled,
  Timer,
} from "@material-ui/icons";
import { useMutation } from "@apollo/client";
import useCustomerApi from "../../hooks/customerhooks";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingBottom: 0,
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
      padding: 0,
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[500],
    },
    monday: {
      backgroundColor: "#FFDF8E",
      padding: "1%",
    },
    tuesday: {
      backgroundColor: "#EE9EC7",
      padding: "1%",
    },
    wednesday: {
      backgroundColor: "#94E18A",
      padding: "1%",
    },
    thursday: {
      backgroundColor: "#FFD0AC",
      padding: "1%",
    },
    friday: {
      backgroundColor: "#9FBFF2",
      padding: "1%",
    },
    saturday: {
      backgroundColor: "#D4B7DE",
      padding: "1%",
    },
    sunday: {
      backgroundColor: "#FF9A9A",
      padding: "1%",
    },
    deny: {
      backgroundColor: "#EA4A4A",
      color: "white",
    },
    status: {
      padding: "2%",
    },
    wait: {
      backgroundColor: "#FFBD17",
      color: "white",
    },
    confirm: {
      backgroundColor: "#34C156",
      color: "white",
    },
    process: {
      backgroundColor: "#4884E6",
      color: "white",
    },
    cancel: {
      backgroundColor: "#5D5D5D",
      color: "white",
    },
  })
);

interface AppointmentCardProps {
  appointment: Appointment;
  setDeleteAlert: any;
  refresh: any;
}

function AppointmentCard({
  appointment,
  setDeleteAlert,
  refresh,
}: AppointmentCardProps) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [changeGuide, setChangeGuide] = useState<boolean>(false);

  const id = localStorage.getItem("_id");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const {
    DELETE_APPOINTMENT,
    GET_ALLAPPOINTMENT_BY_CUSTOMER,
    UPDATE_APPOINTMENT_BEGINTIME,
  } = useCustomerApi();

  const [
    deleteAppointmentAPI,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(DELETE_APPOINTMENT, {
    onCompleted: (data) => {
      console.log(data);
    },
  });

  const [
    startAppointment,
    { loading: mutationStartLoading, error: mutationStartError },
  ] = useMutation(UPDATE_APPOINTMENT_BEGINTIME, {
    onCompleted: (data) => {
      console.log(data);
    },
  });

  const [alert, setAlert] = useState<boolean>(false);
  const [failed, setFailed] = useState<boolean>(false);
  const [failedStart, setFailedStart] = useState<boolean>(false);

  const deleteAppointment = async () => {
    setConfirmDelete(false);
    await deleteAppointmentAPI({
      variables: {
        deleteAppointmentId: appointment._id,
      },
      refetchQueries: [
        {
          query: GET_ALLAPPOINTMENT_BY_CUSTOMER,
          variables: { getAllAppointmentByCustomerCustomerId: id },
        },
      ],
    });
    while(mutationLoading){

    }
    if (mutationError) {
      console.log(mutationError?.graphQLErrors);
      setFailed(true);
    } else {
      setDeleteAlert(true);
      refresh();
    }
  };

  const [success, setSuccess] = useState<boolean>(false);

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const tick = () => {
      setTime(new Date());
    };
    var timeID = setInterval(() => tick(), 1000);
    return () => {
      clearInterval(timeID);
    };
  }, [time]);

  const [startConfirm, setStartConfirm] = useState<boolean>(false);

  const start = async () => {
    await startAppointment({
      variables: {
        updateAppointmentBeginTimeId: appointment._id,
        updateAppointmentBeginTimeBeginTime: moment(new Date()).format(),
      },
      refetchQueries: [
        {
          query: GET_ALLAPPOINTMENT_BY_CUSTOMER,
          variables: { getAllAppointmentByCustomerCustomerId: id },
        },
      ],
    });
    while (mutationStartLoading) {}
    if (mutationStartError) {
      console.log(mutationStartError.graphQLErrors);
      setFailedStart(true);
    } else {
      refresh();
      setStartConfirm(false);
    }
  };

  return (
    <Card>
      <Backdrop open={mutationLoading || mutationStartLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <CardHeader
        className={
          new Date(appointment.AppointTime).getDay() === 0
            ? classes.sunday
            : new Date(appointment.AppointTime).getDay() === 1
            ? classes.monday
            : new Date(appointment.AppointTime).getDay() === 2
            ? classes.tuesday
            : new Date(appointment.AppointTime).getDay() === 3
            ? classes.wednesday
            : new Date(appointment.AppointTime).getDay() === 4
            ? classes.thursday
            : new Date(appointment.AppointTime).getDay() === 5
            ? classes.friday
            : classes.saturday
        }
      />
      <CardContent className={classes.root}>
        <Grid
          container
          direction="row"
          alignItems="flex-start"
          justify="center"
        >
          <Grid item xs={5}>
            <Typography variant="body1" align="left">
              เวลานัดหมาย:
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography variant="body1" align="left">
              {moment(appointment.AppointTime).format("H.mm น.")}{" "}
              {appointment.Period === "Morning"
                ? "(เช้า)"
                : appointment.Period === "Afternoon"
                ? "(บ่าย)"
                : "(ทั้งวัน)"}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="body1" align="left">
              โรงพยาบาล:
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography variant="body1" align="left">
              {appointment.Hospital.Name}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="body1" align="left">
              แผนก:
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography variant="body1" align="left">
              {appointment.Department.Name}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="body1" align="left">
              ข้อมูลเพิ่มเติม:
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography variant="body1" align="left">
              {appointment.Note !== null ? appointment.Note : "-"}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="body1">ค่าบริการเริ่มต้น:</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography variant="body1">{appointment.Price} บาท</Typography>
          </Grid>
          {(appointment.Status.Tag === "Guide Confirm" ||
            appointment.Status.Tag === "In process") && (
            <>
              <Grid item xs={5}>
                <Typography variant="body1" align="left">
                  Tracking Link:
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Link
                  rel="noopener noreferrer"
                  href={`/tracking&=${appointment._id}`}
                  target="_blank"
                >
                  <Typography variant="body1" align="left">
                    click here
                  </Typography>
                </Link>
              </Grid>
            </>
          )}
          <Grid item xs={12} className={classes.status}>
            <Typography variant="body1" align="center">
              {appointment.Status.Tag === "Wait for Guide to Confirm" &&
              new Date(moment(appointment.AppointTime).format("DD MMMM yyyy")) >
                new Date(moment(new Date()).format("DD MMMM yyyy")) ? (
                <Chip
                  size="small"
                  icon={<Timer style={{ color: "white" }} />}
                  label="รอการตอบรับจากไกด์"
                  className={classes.wait}
                />
              ) : (new Date(
                  moment(appointment.AppointTime)
                    .subtract(15, "minutes")
                    .format("LLL")
                ) <= new Date(time) &&
                new Date(
                  moment(appointment.AppointTime).add(1, "hours").format("LLL")
                ) >= new Date(time) && appointment.Status.Tag === "Guide Confirm") ? (
                  <Grid item xs={12}>
                    <Typography align="center">
                      <Button
                        type="button"
                        className={classes.confirm}
                        onClick={() => setStartConfirm(true)}
                      >
                        <PlayCircleFilled />
                        <Typography variant="button">เริ่มการบริการ</Typography>
                      </Button>
                    </Typography>
                  </Grid>
              ) : (appointment.Status.Tag === "Guide Confirm" &&
                new Date(
                  moment(appointment.AppointTime).format("DD MMMM yyyy")
                ) >= new Date(moment(new Date()).format("DD MMMM yyyy")) && new Date(
                  moment(appointment.AppointTime)
                    .subtract(15, "minutes")
                    .format("LLL")
                ) > new Date(time)) ? (
                <>
                  <Chip
                    size="small"
                    icon={<CheckCircle style={{ color: "white" }} />}
                    label="เพิ่มนัดหมายสำเร็จ"
                    className={classes.confirm}
                  />
                </>
              ) : (appointment.Status.Tag === "Guide Reject" &&
                new Date(
                  moment(appointment.AppointTime).format("DD MMMM yyyy")
                ) > new Date(moment(new Date()).format("DD MMMM yyyy"))) ? (
                <>
                  <Chip
                    size="small"
                    icon={<Error style={{ color: "white" }} />}
                    label="ไกด์ปฏิเสธ กรุณาเปลี่ยนไกด์คนใหม่"
                    className={classes.deny}
                  />
                  <Typography color="textSecondary">
                    ข้อความจากไกด์: {appointment.Status.Details}
                  </Typography>
                </>
              ) : appointment.Status.Tag === "In process" ? (
                <>
                  <Chip
                    size="small"
                    icon={<FaceRounded style={{ color: "white" }} />}
                    label="อยู่ระหว่างการรับบริการ"
                    className={classes.process}
                  />
                </>
              ) : (
                <>
                  <Chip
                    size="small"
                    icon={<Cancel style={{ color: "white" }} />}
                    label="การเพิ่มนัดหมายไม่สำเร็จ"
                    className={classes.cancel}
                  />
                  <Typography color="textSecondary">
                    ข้อมูลการนัดหมายจะถูกลบจากระบบในวันถัดไป
                  </Typography>
                </>
              )}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      {appointment.Status.Tag !== "Guide Reject" &&
        appointment.Status.Tag !== "Expired" && (
          <CardActions disableSpacing>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="แสดงข้อมูลเพิ่มเติม"
            >
              {!expanded && (
                <Typography variant="body1">แสดงข้อมูลไกด์</Typography>
              )}
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
        )}

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent style={{ padding: "2%", paddingTop: 0 }}>
          <Grid
            container
            direction="row"
            alignItems="flex-start"
            justify="center"
          >
            <Grid item xs={12}>
              <Grid
                container
                spacing={1}
                alignItems="center"
                justify="space-between"
              >
                <Grid
                  item
                  xs={4}
                  md={3}
                  lg={2}
                  style={{ backgroundColor: "#EFEFEF" }}
                >
                  <Image
                    src={
                      appointment.Guide?.Avatar !== null
                        ? `data:${appointment.Guide?.Avatar.mimetype};base64,${appointment.Guide?.Avatar.data}`
                        : `data:${undefined};base64,${undefined}`
                    }
                    cover={true}
                  />
                </Grid>
                <Grid item xs={8}>
                  <Grid
                    container
                    direction="row"
                    alignItems="flex-start"
                    justify="flex-start"
                  >
                    <Grid item xs={5}>
                      <Typography variant="body1">ชื่อ:</Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant="body1">
                        {appointment.Guide?.FirstName}{" "}
                        {appointment.Guide?.LastName}
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant="body1">เพศ:</Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant="body1">
                        {appointment.Guide?.Gender === "male"
                          ? "ชาย"
                          : appointment.Guide?.Gender === "female"
                          ? "หญิง"
                          : "อื่น ๆ"}
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant="body1">เบอร์โทร:</Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant="body1">
                        {appointment.Guide?.PhoneNumber}
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant="body1">Tips:</Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant="body1">
                        {appointment.Guide?.Tips} บาท/ชั่วโมง
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                  style={{ paddingTop: "2%" }}
                >
                  <Grid item xs={4}>
                    {(new Date(
                      moment(appointment.AppointTime).format("DD MMMM yyyy")
                    ) >
                      new Date(
                        moment(new Date()).add(1, "days").format("DD MMMM yyyy")
                      ) ||
                      (new Date(
                        moment(appointment.AppointTime).format("DD MMMM yyyy")
                      ) >=
                        new Date(
                          moment(new Date())
                            .add(1, "days")
                            .format("DD MMMM yyyy")
                        ) &&
                        appointment.Status.Tag ===
                          "Wait for Guide to Confirm")) && (
                      <Button
                        type="button"
                        fullWidth={true}
                        onClick={() => setConfirmDelete(true)}
                      >
                        <Grid
                          container
                          direction="row"
                          spacing={1}
                          justify="center"
                          alignItems="center"
                        >
                          <Delete />
                          <Typography variant="body1">ยกเลิกนัดหมาย</Typography>
                        </Grid>
                      </Button>
                    )}
                  </Grid>
                  <Grid item xs={4}>
                    {appointment.Status.Tag === "Wait for Guide to Confirm" &&
                      new Date(
                        moment(appointment.AppointTime).format("DD MMMM yyyy")
                      ) >
                        new Date(moment(new Date()).format("DD MMMM yyyy")) && (
                        <Button
                          type="button"
                          fullWidth={true}
                          style={
                            {
                              // backgroundColor: "#4CB85C",
                              // color: "white",
                              // padding: "3%",
                            }
                          }
                          onClick={() => setChangeGuide(true)}
                        >
                          <Grid
                            container
                            direction="row"
                            spacing={1}
                            justify="center"
                            alignItems="center"
                          >
                            <Person />
                            <Typography variant="body1">
                              {" "}
                              เปลี่ยนไกด์
                            </Typography>
                          </Grid>
                        </Button>
                      )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
      {((new Date(moment(appointment.AppointTime).format("DD MMMM yyyy")) >=
        new Date(moment(new Date()).add(1, "days").format("DD MMMM yyyy")) &&
        appointment.Status.Tag === "Guide Reject") ||
        appointment.Status.Tag === "Expired") && (
        <CardContent style={{ padding: "2%" }}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item xs={4}>
              {((new Date(
                moment(appointment.AppointTime).format("DD MMMM yyyy")
              ) >=
                new Date(
                  moment(new Date()).add(1, "days").format("DD MMMM yyyy")
                ) &&
                appointment.Status.Tag === "Guide Reject") ||
                appointment.Status.Tag === "Expired") && (
                <Button
                  type="button"
                  fullWidth={true}
                  style={
                    {
                      // backgroundColor: "#D86060",
                      // color: "#D86060",
                      // padding: "3%",
                    }
                  }
                  onClick={() => setConfirmDelete(true)}
                >
                  <Grid
                    container
                    direction="row"
                    spacing={1}
                    justify="center"
                    alignItems="center"
                  >
                    <Delete />
                    <Typography variant="body1">
                      {new Date(
                        moment(appointment.AppointTime).format("DD MMMM yyyy")
                      ) > new Date(moment(new Date()).format("DD MMMM yyyy"))
                        ? "ยกเลิกนัดหมาย"
                        : "ลบนัดหมาย"}
                    </Typography>
                  </Grid>
                </Button>
              )}
            </Grid>
            <Grid item xs={4}>
              {appointment.Status.Tag === "Guide Reject" &&
                new Date(
                  moment(appointment.AppointTime).format("DD MMMM yyyy")
                ) > new Date(moment(new Date()).format("DD MMMM yyyy")) && (
                  <Button
                    type="button"
                    fullWidth={true}
                    style={
                      {
                        // backgroundColor: "#4CB85C",
                        // color: "white",
                        // padding: "3%",
                      }
                    }
                    onClick={() => setChangeGuide(true)}
                  >
                    <Grid
                      container
                      direction="row"
                      spacing={1}
                      justify="center"
                      alignItems="center"
                    >
                      <Person />
                      <Typography variant="body1"> เปลี่ยนไกด์</Typography>
                    </Grid>
                  </Button>
                )}
            </Grid>
          </Grid>
        </CardContent>
      )}
      <Submit
        submit={startConfirm}
        title="เริ่มนัดหมาย"
        text="ยืนยันเริ่มการใช้บริการหรือไม่?"
        denyText="ปิด"
        submitText="ยืนยัน"
        denyAction={() => setStartConfirm(false)}
        submitAction={start}
      />
      <ChangeGuide
        open={changeGuide}
        setOpen={setChangeGuide}
        appointment={appointment}
        setSuccess={setSuccess}
        refresh={() => refresh()}
      />
      <Alert
        closeAlert={() => setSuccess(false)}
        alert={success}
        title="สำเร็จ"
        text="เปลี่ยนไกด์สำเร็จ กรุณารอการตอบรับจากไกด์"
        buttonText="ตกลง"
      />
      <Submit
        submit={confirmDelete}
        title="ยกเลิกนัดหมาย"
        text="ยืนยันการยกเลิกการนัดหมายหรือไม่?"
        denyText="ปิด"
        submitText="ยืนยัน"
        denyAction={() => setConfirmDelete(false)}
        submitAction={deleteAppointment}
      />
      <Alert
        closeAlert={() => setAlert(false)}
        alert={alert}
        title="สำเร็จ"
        text="ยกเลิกการนัดหมายสำเร็จ"
        buttonText="ตกลง"
      />
      <Alert
        closeAlert={() => setFailed(false)}
        alert={failed}
        title="ผิดพลาด"
        text="กรุณาลองใหม่อีกครั้ง"
        buttonText="ปิด"
      />
      <Alert
        closeAlert={() => setFailedStart(false)}
        alert={failedStart}
        title="ผิดพลาด"
        text="กรุณาลองใหม่อีกครั้ง"
        buttonText="ปิด"
      />
    </Card>
  );
}

export default AppointmentCard;
