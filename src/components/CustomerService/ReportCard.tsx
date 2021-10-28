import { Paper, Grid, TextField, Button, Typography } from "@material-ui/core";
import { useState } from "react";
import ReportForm from "../../models/ReportForm";
import Alert from "../Alert/Alert";
import { useMutation } from "@apollo/client";
import useCustomerApi from "../../hooks/customerhooks";

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

  const { CREATE_REPORT } = useCustomerApi();
  const [sendReport] = useMutation(CREATE_REPORT, {
    onCompleted: (data) => {
      console.log(data);
      setAlert(true); //if success
      setTitle(""); //if success
      setDetail(""); //if success
    },
    onError: (data) => {
      console.log(data);
      setFailed(true); //if error
    },
  });

  const submit = () => {
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
        {/* <Backdrop open={mutationLoading}>
          <CircularProgress color="inherit" />
        </Backdrop> */}
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
                onClick={submit}
                type="button"
                // fullWidth={true}
                style={{
                  backgroundColor: "#7C5D92",
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
