import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Typography,
  Box,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { useState } from "react";
import Appointment from "../../models/Appointment";
import Alert from "../Alert/Alert";
import { useMutation } from "@apollo/client";
import useCustomerApi from "../../hooks/customerhooks";
import { Rating } from "@material-ui/lab";

interface ReviewProps {
  appointment: Appointment;
  open: boolean;
  setOpen: any;
  setAlert: any;
  refresh: any;
}

function Review({
  appointment,
  open,
  setOpen,
  setAlert,
  refresh,
}: ReviewProps) {
  const [rate, setRate] = useState<number>(0);
  const [comment, setComment] = useState<string | undefined>();
  const [alertData, setAlertData] = useState<boolean>(false);
  const [failed, setFailed] = useState<boolean>(false);

  const { UPDATE_APPOINTMENT_REVIEW } = useCustomerApi();
  const [addReview, { loading: mutationLoading, error: mutationError }] =
    useMutation(UPDATE_APPOINTMENT_REVIEW, {
      onCompleted: (data) => {
        console.log(data);
      },
    });

  const submit = async () => {
    if (rate !== 0) {
      let newReview = {
        Star: rate,
        Comment: comment,
      };

      await addReview({
        variables: {
          id: appointment._id,
          reviewinput: { ...newReview },
        },
      });
      while (mutationLoading) {}

      if (mutationError) {
        console.log(mutationError?.graphQLErrors);
        setFailed(true);
      } else {
        setAlert(true);
        refresh();
        setOpen(false);
      }
    } else {
      setAlertData(true);
    }
  };

  return (
    <Dialog
      //   onClose={closeSubmit}
      aria-describedby="alert-dialog-description"
      aria-labelledby="alert-dialog-title"
      open={open}
      fullWidth={true}
    >
      <DialogTitle id="alert-dialog-title">ประเมินความพึงพอใจ</DialogTitle>
      <DialogContent>
        <Box>
          <Typography variant="body1" component="legend">
            ระดับความพึงพอใจ
          </Typography>
          <Rating
            max={5}
            value={rate}
            onChange={(e, val) => {
              if (val !== null) {
                setRate(val);
              }
            }}
            style={{ color: "#FFC300" }}
          />
        </Box>
        <TextField
          type="text"
          label="ความคิดเห็น (ถ้ามี)"
          fullWidth={true}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>ยกเลิก</Button>
          <Button
            onClick={submit}
            style={{
              backgroundColor: "#7C5D92",
              color: "white",
            }}
          >
            ยืนยัน
          </Button>
        </DialogActions>
      </DialogActions>
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
        closeAlert={() => setAlertData(false)}
        alert={alertData}
        title="ข้อมูลไม่ครบ"
        text="กรุณาใส่คะแนน"
        buttonText="ปิด"
      />
    </Dialog>
  );
}

export default Review;
