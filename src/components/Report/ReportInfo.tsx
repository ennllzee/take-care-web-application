import {
  Button,
  Chip,
  createStyles,
  Grid,
  IconButton,
  makeStyles,
  Modal,
  Paper,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import Report from "../../models/Report";
import convertToThaiDate from "../../hooks/convertToThaiDate";
import { useState } from "react";
import Submit from "../Submit/Submit";
import Alert from "../Alert/Alert";
import { useMutation } from "@apollo/client";
import useAdminApi from "../../hooks/adminhooks";

interface ReportInfoProps {
  open: boolean;
  setOpen: any;
  report: Report;
  setAlert: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      height: "85vh",
      width: "80vw",
      overflow: "auto",
    },
    line: {
      padding: "2%",
    },
    divide: {
      padding: "2%",
      paddingTop: 0,
    },
    bord: {
      // border: "2px solid black",
      padding: "1%",
    },
    customer: {
      color: "white",
      backgroundColor: "#7C5D92",
    },
    guide: {
      color: "white",
      backgroundColor: "#508F7F",
    },
  })
);

function ReportInfo({ open, setOpen, report, setAlert }: ReportInfoProps) {
  const classes = useStyles();
  const [confirm, setConfirm] = useState<boolean>(false);
  const [resText, setResText] = useState<string>("");
  const [dataAlert, setDataAlert] = useState<boolean>(false);
  const [failed, setFailed] = useState<boolean>(false);

  const id = localStorage.getItem("_id");

  const { RESPONSE_REPORT, GET_REQUEST_REPORT } = useAdminApi();

  const [reponseReport] = useMutation(RESPONSE_REPORT, {
    onCompleted: (data) => {
      console.log(data);
      setAlert(true); //if success
      setOpen(false);
    },
    onError: (data) => {
      console.log(data);
      setFailed(true); //if error
    },
  });

  const submit = () => {
    setConfirm(false);
    if (resText !== "") {
      reponseReport({
        variables: {
          id: report._id,
          responseText: resText,
          responseByAdmin: id,
        },
        refetchQueries: [
          {
            query: GET_REQUEST_REPORT,
          },
        ],
      });
    } else {
      setDataAlert(true);
    }
  };

  return (
    <Modal open={open} className={classes.modal}>
      <Paper className={classes.paper}>
        <Typography align="right">
          <IconButton onClick={() => setOpen(false)} style={{ padding: "0" }}>
            <Close />
          </IconButton>
        </Typography>
        <Grid xs={12} md={12} lg={12} className={classes.line}>
          <Typography variant="h1">รายงานปัญหา</Typography>
        </Grid>
        <Alert
          closeAlert={() => setDataAlert(false)}
          alert={dataAlert}
          title="ข้อมูลไม่ครบ"
          text="กรุณากรอกข้อมูลให้ครบ"
          buttonText="ปิด"
        />
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12} md={10} lg={8} className={classes.divide}>
            <Paper variant="outlined">
              <Grid
                container
                alignItems="flex-start"
                justify="center"
                className={classes.bord}
              >
                <Grid item xs={2}>
                  <Typography variant="h6">ชื่อเรื่อง:</Typography>
                </Grid>
                <Grid item xs={10}>
                  <Typography variant="h6">{report.Title}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="h6">ผู้รายงาน:</Typography>
                </Grid>
                <Grid item xs={10}>
                  <Typography variant="h6">
                    {report.Reporter.FirstName} {report.Reporter.LastName}
                    <Chip
                      size="small"
                      label={
                        report.Reporter.Role === "customer" ? "ลูกค้า" : "ไกด์"
                      }
                      className={
                        report.Reporter.Role === "customer"
                          ? classes.customer
                          : classes.guide
                      }
                    />
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="h6">วันที่รับรายงาน:</Typography>
                </Grid>
                <Grid item xs={10}>
                  <Typography variant="h6">
                    {convertToThaiDate(new Date(report.CreatedAt))}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="h6">รายละเอียด:</Typography>
                </Grid>
                <Grid item xs={10}>
                  <Typography variant="h6">{report.Description}</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} md={10} lg={8} className={classes.divide}>
            <Grid
              container
              alignItems="center"
              justify="center"
              className={classes.bord}
            >
              <Grid item xs={12}>
                <Typography variant="h4">ตอบกลับ</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="h6">อีเมล์ตอบกลับ:</Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography variant="h6">{report.Reporter.Email}</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="input-with-icon-grid"
                  label="รายละเอียด"
                  fullWidth={true}
                  value={resText}
                  onChange={(e) => setResText(e.target.value)}
                  type="text"
                  multiline={true}
                  rows={3}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} style={{ paddingTop: "2%" }}>
                <Typography align="right">
                  <Button
                    onClick={() => setConfirm(true)}
                    style={{
                      backgroundColor: "#6479D9",
                      color: "white",
                    }}
                  >
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <Typography variant="body1">ตอบกลับ</Typography>
                    </Grid>
                  </Button>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Submit
          submit={confirm}
          title="ตอบกลับ"
          text="ยืนยันการตอบกลับใช่หรือไม่?"
          denyText="ยกเลิก"
          submitText="ยืนยัน"
          denyAction={() => setConfirm(false)}
          submitAction={submit}
        />
        <Alert
          closeAlert={() => setFailed(false)}
          alert={failed}
          title="ผิดพลาด"
          text="กรุณาลองใหม่อีกครั้ง"
          buttonText="ปิด"
        />
      </Paper>
    </Modal>
  );
}

export default ReportInfo;
