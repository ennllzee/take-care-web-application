import React, { useState } from "react";
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
import { Backdrop, Button, CardHeader, CircularProgress, Grid } from "@material-ui/core";
import moment from "moment";
import Appointment from "../../models/Appointment";
import Image from "material-ui-image";
import Submit from "../Submit/Submit";
import TextSubmit from "../Submit/TextSubmit";
import useGuideApi from "../../hooks/guidehooks";
import { useMutation } from "@apollo/client";
import { Cancel, CheckCircle } from "@material-ui/icons";
import Alert from "../Alert/Alert";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "4%",
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
    below: {
      paddingTop: 0,
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
  })
);

interface RequestCardProps {
  appointment: Appointment;
  setAcceptAlert: any;
  setDenyAlert: any;
  refresh: any;
}

function RequestCard({
  appointment,
  setAcceptAlert,
  setDenyAlert,
  refresh,
}: RequestCardProps) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState<boolean>(false);
  const [acceptSubmit, setAcceptSubmit] = useState<boolean>(false);
  const [denySubmit, setDenySubmit] = useState<boolean>(false);
  const [denyDetail, setDenyDetail] = useState<string | undefined>();

  const { RESPONSE_CUSTOMER_REQUEST } = useGuideApi();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [sendResponse, { loading: mutationLoading, error: mutationError }] =
    useMutation(RESPONSE_CUSTOMER_REQUEST, {
      onCompleted: (data) => {
        console.log(data);
      },
    });

  const [failed, setFailed] = useState<boolean>(false);

  const deny = async () => {
    setDenySubmit(false);
    await sendResponse({
      variables: {
        updateGuideScheduleResponseAppointmentResponse: false,
        updateGuideScheduleResponseAppointmentWorkOnAppointmentId:
          appointment._id,
        updateGuideScheduleResponseAppointmentCancleDetails: denyDetail,
      },
    });
    if (mutationError) {
      console.log(mutationError.graphQLErrors);
      setFailed(true);
    } else {
      setDenyAlert(true);
      refresh();
    }
  };

  const accept = async () => {
    setAcceptSubmit(false);
    await sendResponse({
      variables: {
        updateGuideScheduleResponseAppointmentResponse: true,
        updateGuideScheduleResponseAppointmentWorkOnAppointmentId:
          appointment._id,
      },
    });

    if (mutationError) {
      console.log(mutationError.graphQLErrors);
      setFailed(true);
    } else {
      setAcceptAlert(true);
      refresh();
    }
  };

  return (
    <Card>
      <Backdrop open={mutationLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Alert
        closeAlert={() => setFailed(false)}
        alert={failed}
        title="ผิดพลาด"
        text="กรุณาลองใหม่อีกครั้ง"
        buttonText="ปิด"
      />
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
            <Typography variant="body1" align="left">
              ค่าบริการเริ่มต้น:
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography variant="body1" align="left">
              {appointment.Price} บาท
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
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
            <Typography variant="button">แสดงข้อมูลลูกค้า</Typography>
          )}

          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className={classes.below}>
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
                <Grid item xs={4}>
                  <Image
                    src={appointment.Customer.Avatar !== null ? `data:${appointment.Customer.Avatar.mimetype};base64,${appointment.Customer.Avatar?.data}` : `data:${undefined};base64,${undefined}`}
                    cover={true}
                    // style={{padding: 0}}
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
                        {appointment.Customer.FirstName}{" "}
                        {appointment.Customer.LastName}
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant="body1">เพศ:</Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant="body1">
                        {appointment.Customer.Gender === "male"
                          ? "ชาย"
                          : appointment.Customer.Gender === "female"
                          ? "หญิง"
                          : "อื่น ๆ"}
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant="body1">อายุ:</Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant="body1">
                        {moment().diff(
                          appointment.Customer.DOB,
                          "years",
                          false
                        )}{" "}
                        ปี
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant="body1">โรคประจำตัว:</Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant="body1">
                        {appointment.Customer.CongenitalDisorders !==
                          undefined &&
                        appointment.Customer.CongenitalDisorders !== null &&
                        appointment.Customer.CongenitalDisorders !== "" &&
                        appointment.Customer.CongenitalDisorders !== "nope" ? (
                          <>{appointment.Customer.CongenitalDisorders}</>
                        ) : (
                          "ไม่มี"
                        )}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <br />
          <Grid item xs={12}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs={4}>
                <Button
                  type="button"
                  fullWidth={true}
                  // variant="contained"
                  style={{
                    backgroundColor: "#D86060",
                    color: "white",
                    padding: "3%",
                  }}
                  onClick={() => setDenySubmit(true)}
                >
                  <Grid
                    container
                    direction="row"
                    spacing={1}
                    justify="center"
                    alignItems="center"
                  >
                    <Cancel />
                    <Typography variant="body1">ปฏิเสธ</Typography>
                  </Grid>
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  type="button"
                  fullWidth={true}
                  style={{
                    backgroundColor: "#4CB85C",
                    color: "white",
                    padding: "3%",
                  }}
                  onClick={() => setAcceptSubmit(true)}
                >
                  <Grid
                    container
                    direction="row"
                    spacing={1}
                    justify="center"
                    alignItems="center"
                  >
                    <CheckCircle />
                    <Typography variant="body1"> ตอบรับ</Typography>
                  </Grid>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
      <Submit
        submit={acceptSubmit}
        title="ตอบรับคำขอ"
        text="ต้องการรับนัดหมายนี้หรือไม่?"
        denyText="ยกเลิก"
        submitText="ยืนยัน"
        denyAction={() => setAcceptSubmit(false)}
        submitAction={accept}
      />
      <TextSubmit
        submit={denySubmit}
        title="ปฏิเสธคำขอ"
        text="ต้องการการปฏิเสธนัดหมายนี้หรือไม่?"
        denyText="ยกเลิก"
        submitText="ยืนยัน"
        denyAction={() => setDenySubmit(false)}
        submitAction={deny}
        denyDetail={denyDetail}
        setDenyDetail={setDenyDetail}
      />
    </Card>
  );
}

export default RequestCard;
