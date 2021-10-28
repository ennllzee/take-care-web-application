import { Paper, Grid, TextField, Button, Typography, Backdrop, CircularProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import ReportForm from "../../models/ReportForm";
import Alert from "../Alert/Alert";
import { useMutation } from "@apollo/client";
import useGuideApi from "../../hooks/guidehooks";
import Submit from "../Submit/Submit";

interface ReportCardProps {
  setAlert: any;
  setOpen: any;
}

function ReportCard({ setAlert, setOpen }: ReportCardProps) {
  const [title, setTitle] = useState<string>("");
  const [detail, setDetail] = useState<string>("");
  const id = localStorage.getItem("_id");
  const [dataAlert, setDataAlert] = useState<boolean>(false);
  const [failed, setFailed] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);

  const { CREATE_REPORT } = useGuideApi();
  const [sendReport, { loading: mutationLoading }] = useMutation(CREATE_REPORT, {
    onCompleted: (data) => {
      console.log(data);
      setAlert(true); //if success
      setTitle(""); //if success
      setDetail(""); //if success
      setOpen(false)
    },
    onError: (data) => {
      console.log(data);
      setFailed(true); //if error
    },
  });

  useEffect(() => {
    setTitle(""); 
    setDetail(""); 
  }, [setOpen])

  const submit = () => {
    setConfirm(false)
    if (title !== "" && detail !== "") {
      let newReport: ReportForm = {
        Title: title,
        Description: detail,
        Reporter: id,
      };
      sendReport({
        variables: {
          input: { ...newReport },
        },
      });
    } else {
      setDataAlert(true);
    }
  };

  return (
    <Paper variant="outlined">
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ padding: "3%" }}
      >
        <Submit
          submit={confirm}
          title="ข้อมูลส่วนตัว"
          text="ยืนยันข้อการรายงานปัญหาหรือไม่"
          denyText="ยกเลิก"
          submitText="ยืนยัน"
          denyAction={() => setConfirm(false)}
          submitAction={submit}
        />
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
        <Alert
          closeAlert={() => setDataAlert(false)}
          alert={dataAlert}
          title="ข้อมูลไม่ครบ"
          text="กรุณากรอกข้อมูลให้ครบ"
          buttonText="ปิด"
        />
        <Grid item xs={10} md={10} lg={10}>
          <TextField
            type="text"
            label="ชื่อเรื่อง"
            fullWidth={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={10} md={10} lg={10} style={{ paddingTop: "2%" }}>
          <TextField
            id="input-with-icon-grid"
            label="รายละเอียด"
            fullWidth={true}
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            type="text"
            multiline={true}
            rows={3}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={10} md={10} lg={10} style={{ paddingTop: "2%" }}>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Button
                onClick={() => setOpen(false)}
                type="button"
                // fullWidth={true}
              >
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Typography variant="body1">ยกเลิก</Typography>
                </Grid>
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={() => setConfirm(true)}
                type="button"
                // fullWidth={true}
                style={{
                  backgroundColor: "#508F7F",
                  color: "white",
                }}
              >
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Typography variant="body1">ยืนยันการรายงาน</Typography>
                </Grid>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ReportCard;
