import React, { useState } from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  withStyles,
} from "@material-ui/core/styles";
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
  CardHeader,
  Chip,
  CircularProgress,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import moment from "moment";
import Appointment from "../../models/Appointment";
import Image from "material-ui-image";
import RecordRow from "./RecordRow";
import {
  AddCircle,
  Cancel,
  CheckCircle,
  FaceRounded,
  Done,
} from "@material-ui/icons";
import AddRecord from "./AddRecord";
import Alert from "../Alert/Alert";
import Submit from "../Submit/Submit";
import { useMutation } from "@apollo/client";
import useGuideApi from "../../hooks/guidehooks";

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
    add: {
      padding: "1%",
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
    status: {
      padding: "2%",
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

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      fontSize: 10,
      padding: 0,
      paddingTop: "1%",
    },
    body: {
      fontSize: 10,
      padding: "1%",
    },
  })
)(TableCell);

interface AppointmentCardProps {
  appointment: Appointment;
  setAlert: any;
  setPrice: any;
  refresh: any;
}

function AppointmentCard({
  appointment,
  setAlert,
  setPrice,
  refresh,
}: AppointmentCardProps) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [addRecord, setAddRecord] = useState<boolean>(false);
  const [end, setEnd] = useState<boolean>(false);
  const [alertAdd, setAlertAdd] = useState<boolean>(false);

  const { UPDATE_APPOINTMENT_ENDTIME } = useGuideApi();
  const [endAppointment, { loading: mutationLoading, error: mutationError }] =
    useMutation(UPDATE_APPOINTMENT_ENDTIME, {
      onCompleted: async (data) => {
        console.log(data)
        await setPrice(data.updateAppointmentEndTime.Price)
      },
    });

  const [failed, setFailed] = useState<boolean>(false);

  const accept = async () => {
    setEnd(false);
    await endAppointment({
      variables: {
        updateAppointmentEndTimeId: appointment._id,
        updateAppointmentEndTimeEndTime: moment(new Date()).format(),
      },
    });
    while(mutationLoading){

    }
    if (mutationError) {
      setFailed(true);
      console.log(mutationError.graphQLErrors)
    } else {
      setAlert(true);
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
          <Grid item xs={12} className={classes.status}>
            <Typography variant="body1" align="center">
              {appointment.Status.Tag === "Guide Confirm" &&
              new Date(
                moment(appointment.AppointTime).format("DD MMMM yyyy")
              ) >= new Date(moment(new Date()).format("DD MMMM yyyy")) ? (
                <>
                  <Chip
                    size="small"
                    icon={<CheckCircle style={{ color: "white" }} />}
                    label="เพิ่มนัดหมายสำเร็จ"
                    className={classes.confirm}
                  />
                </>
              ) : appointment.Status.Tag === "In process" ? (
                <>
                  <Chip
                    size="small"
                    icon={<FaceRounded style={{ color: "white" }} />}
                    label="อยู่ระหว่างการบริการ"
                    className={classes.process}
                  />
                </>
              ) : (
                <>
                  <Chip
                    size="small"
                    icon={<Cancel style={{ color: "white" }} />}
                    label="นัดหมายถูกยกเลิก"
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
        {appointment.Status.Tag === "In process" && (
          <>
            <Grid item xs={12} md={12} lg={12}>
              <TableContainer>
                <Table>
                  <colgroup>
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "40%" }} />
                    <col style={{ width: "40%" }} />
                  </colgroup>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center">เวลา</StyledTableCell>
                      <StyledTableCell align="center">กิจกรรม</StyledTableCell>
                      <StyledTableCell align="center">บันทึก</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {appointment?.Record?.map((r, key) => {
                      return <RecordRow key={key} record={r} />;
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Grid container justify="space-between" alignItems="center">
                <IconButton
                  className={classes.add}
                  onClick={() => setEnd(true)}
                >
                  <Done fontSize="small" />
                  <Typography variant="body2">สิ้นสุดการบริการ</Typography>
                </IconButton>
                <IconButton
                  className={classes.add}
                  onClick={() => setAddRecord(true)}
                >
                  <AddCircle fontSize="small" />
                  <Typography variant="body2">เพิ่มบันทึก</Typography>
                </IconButton>
              </Grid>
            </Grid>
          </>
        )}
        <AddRecord
          appointment={appointment}
          add={addRecord}
          setAdd={setAddRecord}
          setAlert={setAlertAdd}
          refresh={() => refresh()}
        />
        <Alert
          closeAlert={() => setAlertAdd(false)}
          alert={alertAdd}
          title="สำเร็จ"
          text="เพิ่มบันทึกสำเร็จ"
          buttonText="ตกลง"
        />
        <Submit
          submit={end}
          title="สิ้นสุดนัดหมาย"
          text={`ยืนยันการสิ้นสุดการบริการหรือไม่?`}
          denyText="ยกเลิก"
          submitText="ยืนยัน"
          denyAction={() => setEnd(false)}
          submitAction={accept}
        />
      </CardContent>
      {new Date(moment(appointment.AppointTime).format("DD MMMM yyyy")) >=
        new Date(moment(new Date()).format("DD MMMM yyyy")) &&
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
                <Typography variant="button">แสดงข้อมูลลูกค้า</Typography>
              )}
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
        )}

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent style={{ paddingTop: 0 }}>
          <Grid
            container
            direction="row"
            alignItems="flex-start"
            justify="center"
          >
            <Grid item xs={12}>
              <Grid item xs={12}>
                <Grid
                  container
                  spacing={1}
                  alignItems="center"
                  justify="space-between"
                >
                  <Grid item xs={4}>
                    <Image
                      src={
                        appointment.Customer.Avatar !== null
                          ? `data:${appointment.Customer?.Avatar.mimetype};base64,${appointment.Customer?.Avatar.data}`
                          : `data:${undefined};base64,${undefined}`
                      }
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
                          {appointment.Customer.CongenitalDisorders !== null &&
                          appointment.Customer.CongenitalDisorders !== "" &&
                          appointment.Customer.CongenitalDisorders !==
                            "nope" ? (
                            <>{appointment.Customer.CongenitalDisorders}</>
                          ) : (
                            "ไม่มี"
                          )}
                        </Typography>
                      </Grid>
                      <Grid item xs={5}>
                        <Typography variant="body1">เบอร์โทร:</Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography variant="body1">
                          {appointment.Customer.PhoneNumber}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default AppointmentCard;
