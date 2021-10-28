import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Typography,
  Grid,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { AccessTime } from "@material-ui/icons";
import moment from "moment";
import { useEffect, useState } from "react";
import Appointment from "../../models/Appointment";
import Record from "../../models/Record";
import Alert from "../Alert/Alert";
import { useMutation, useQuery } from "@apollo/client";
import useGuideApi from "../../hooks/guidehooks";
import { Autocomplete } from "@material-ui/lab";
import Title from "../../models/Title";
import Submit from "../Submit/Submit";

interface AddRecordProps {
  appointment: Appointment;
  add: boolean;
  setAdd: any;
  setAlert: any;
  refresh: any;
}

function AddRecord({
  appointment,
  add,
  setAdd,
  setAlert,
  refresh,
}: AddRecordProps) {
  const { GET_ALL_RECORDTITLE } = useGuideApi();
  const { loading, error, data } = useQuery(GET_ALL_RECORDTITLE);

  const [title, setTitle] = useState<string | undefined>();
  const [des, setDes] = useState<string | undefined>();
  const [time, setTime] = useState<Date>(new Date());
  const [confirm, setConfirm] = useState<boolean>(false);
  const [alertData, setAlertData] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<Title[]>(
    data !== undefined ? data.getAllRecordTitles : []
  );

  useEffect(() => {
    if (!loading && data) {
      setKeyword(data.getAllRecordTitles);
    }
    if (error) {
      setFailed(true);
      console.log(error?.graphQLErrors);
    }
  }, [loading, data, error]);

  const { UPDATE_APPOINTMENT_RECORD, UPDATE_RECORDTITLE } = useGuideApi();
  const [addRecord, { loading: mutationLoading, error: mutationError }] =
    useMutation(UPDATE_APPOINTMENT_RECORD, {
      onCompleted: (data) => {
        console.log(data);
      },
    });

  const [addRecordTitle] = useMutation(UPDATE_RECORDTITLE);

  const [failed, setFailed] = useState<boolean>(false);

  const submit = async () => {
    setConfirm(false);
    if (title !== undefined) {
      let newRecord: Record = {
        At: moment(time).format(),
        Title: title,
        Description: des,
      };

      const existTitle = data.getAllRecordTitles.find(
        (data: any) => data.title === newRecord.Title
      );
      if (!existTitle) {
        await addRecordTitle({
          variables: {
            postnewRecordTitlesNewTitle: newRecord.Title,
          },
        });
      }

      await addRecord({
        variables: {
          updateAppointmentRecordId: appointment._id,
          updateAppointmentRecordRecordinput: { ...newRecord },
        },
      });

      while (mutationLoading) {}

      if (mutationError) {
        console.log(mutationError.graphQLErrors);
        setFailed(true);
      } else {
        setAlert(true);
        refresh();
        setAdd(false);
      }
    } else {
      setAlertData(true);
    }
  };

  useEffect(() => {
    setTime(new Date());
    setTitle(undefined);
    setDes(undefined);
  }, [add]);

  return (
    <Dialog
      //   onClose={closeSubmit}
      aria-describedby="alert-dialog-description"
      aria-labelledby="alert-dialog-title"
      open={add}
      fullWidth={true}
    >
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
      <DialogTitle id="alert-dialog-title">เพิ่มบันทึก</DialogTitle>
      <DialogContent>
        <Grid container direction="row" alignItems="center">
          <Grid item xs={2}>
            <AccessTime />
          </Grid>
          <Grid item xs={10}>
            <Typography variant="h4">
              {moment(time).format("H.mm น.")}
            </Typography>
          </Grid>
        </Grid>
        <Autocomplete
          freeSolo
          options={keyword.map((option) => option.Title)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="กิจกรรม"
              onChange={(e) => setTitle(e.target.value)}
            />
          )}
          onChange={(e, val) => {
            if (val !== null) {
              setTitle(val);
            }
          }}
        />
        <TextField
          type="text"
          label="บันทึก (ถ้ามี)"
          fullWidth={true}
          value={des}
          onChange={(e) => setDes(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <DialogActions>
          <Button onClick={() => setAdd(false)}>ยกเลิก</Button>
          <Button
            onClick={() => setConfirm(true)}
            style={{
              backgroundColor: "#508F7F",
              color: "white",
            }}
          >
            เพิ่ม
          </Button>
        </DialogActions>
      </DialogActions>
      <Submit
        submit={confirm}
        title="บันทึกข้อมูล"
        text="ยืนยันการบันทึกข้อมูลหรือไม่?"
        denyText="ยกเลิก"
        submitText="ยืนยัน"
        denyAction={() => setConfirm(false)}
        submitAction={submit}
      />
      <Alert
        closeAlert={() => setAlertData(false)}
        alert={alertData}
        title="ข้อมูลไม่ครบ"
        text="โปรดใส่กิจกรรม"
        buttonText="ตกลง"
      />
    </Dialog>
  );
}

export default AddRecord;
