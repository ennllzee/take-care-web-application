import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import { Chip, Grid } from "@material-ui/core";
import moment from "moment";
import Appointment from "../../models/Appointment";
import { CheckCircle, FaceRounded, Cancel, Timer } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    foot: {
      padding: "5%",
      paddingTop: 0,
      paddingBottom: 0,
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
    wait: {
      backgroundColor: "#FFBD17",
      color: "white",
    },
    
  })
);

interface AppointmentCardProps {
  appointment?: Appointment;
}

function AppointmentCard({ appointment }: AppointmentCardProps) {
  const classes = useStyles();

  return (
    <Card>
      <CardContent style={{paddingBottom: 0, padding: '5%'}}>
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
              {moment(appointment?.AppointTime).format("H.mm น.")}{" "}
              {appointment?.Period === "Morning"
                ? "(เช้า)"
                : appointment?.Period === "Afternoon"
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
              {appointment?.Hospital.Name}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="body1" align="left">
              แผนก:
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography variant="body1" align="left">
              {appointment?.Department.Name}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="body1" align="left">
              ข้อมูลเพิ่มเติม:
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography variant="body1" align="left">
              {appointment?.Note !== null ? appointment?.Note : "-"}
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.status}>
            <Typography variant="body1" align="center">
              {appointment?.Status.Tag === "Completed"  ? (
                <>
                  <Chip
                    size="small"
                    icon={<CheckCircle style={{ color: "white" }} />}
                    label="สิ้นสุดการบริการ"
                    className={classes.confirm}
                  />
                </>
              ) : appointment?.Status.Tag === "In process" ? (
                <>
                  <Chip
                    size="small"
                    icon={<FaceRounded style={{ color: "white" }} />}
                    label="อยู่ระหว่างการบริการ"
                    className={classes.process}
                  />
                </>
              ) : appointment?.Status.Tag === "Guide Confirm"&&
              new Date(
                moment(appointment.AppointTime).format("DD MMMM yyyy")
              ) >= new Date(moment(new Date()).format("DD MMMM yyyy")) ? (
                <>
                  <Chip
                    size="small"
                    icon={<Timer style={{ color: "white" }} />}
                    label="รอการบริการ"
                    className={classes.wait}
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
    </Card>
  );
}

export default AppointmentCard;
