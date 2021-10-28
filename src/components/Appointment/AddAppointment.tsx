import {
  Backdrop,
  CircularProgress,
  createStyles,
  Grid,
  IconButton,
  makeStyles,
  Modal,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { useEffect } from "react";
import { useState } from "react";
import useCustomerApi from "../../hooks/customerhooks";
import AppointmentForm from "../../models/AppointmentForm";
import InformationForm from "./InformationForm";
import SelectGuideForm from "./SelectGuideForm";
import SubmitForm from "./SubmitForm";
import { useMutation, useQuery } from "@apollo/client";
import Appointment from "../../models/Appointment";
import Submit from "../Submit/Submit";
import Alert from "../Alert/Alert";

interface AddAppointmentProps {
  open: boolean;
  setOpen: any;
  setSuccess: any;
  appointments: Appointment[];
  refresh: any;
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
      // border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      height: "85vh",
      width: "80vw",
      overflow: "auto",
    },
    line: {
      padding: "2%",
    },
  })
);

function AddAppointment({
  open,
  setOpen,
  setSuccess,
  appointments,
  refresh,
}: AddAppointmentProps) {
  const classes = useStyles();
  const [step, setStep] = useState<number>(1);

  const id = localStorage.getItem("_id");

  const {
    GET_SINGLE_CUSTOMER,
    CREATE_APPOINTMENT,
    GET_ALLAPPOINTMENT_BY_CUSTOMER,
  } = useCustomerApi();

  const { loading, error, data } = useQuery(GET_SINGLE_CUSTOMER, {
    variables: { getCustomerId: id },
  });

  const [
    createAppointment,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(CREATE_APPOINTMENT);

  const [newAppointment, setNewAppointment] = useState<AppointmentForm>({
    Customer: data !== undefined ? data.getCustomer : undefined,
  });

  const [confirm, setConfirm] = useState<boolean>(false);
  const [failed, setFailed] = useState<boolean>(false);

  const submit = async () => {
    setConfirm(false);
    await createAppointment({
      variables: {
        createAppointmentInput: {
          AppointTime: newAppointment.AppointTime,
          CustomerId: newAppointment.Customer?._id,
          DepId: newAppointment.Department?._id,
          HospitalId: newAppointment.Hospital?._id,
          Note: newAppointment.Note,
          Period: newAppointment.Period,
          ScheuleGuideId: newAppointment.ScheuleGuideId,
        },
      },
      refetchQueries: [
        {
          query: GET_ALLAPPOINTMENT_BY_CUSTOMER,
          variables: { getAllAppointmentByCustomerCustomerId: id },
        },
      ],
    });
    while (mutationLoading) {}

    if (mutationError) {
      console.log(mutationError?.graphQLErrors);
      setFailed(true);
    } else {
      console.log(mutationData);
      setSuccess(true);
      refresh();
      setOpen(false);
    }
  };

  useEffect(() => {
    setStep(1);
  }, [open]);

  useEffect(() => {
    if (!loading && data) {
      setNewAppointment({
        Customer: data.getCustomer,
      });
    }
    if (error) {
      console.log(error?.graphQLErrors);
      setFailed(true);
    }
  }, [loading, data, error]);

  useEffect(() => {
    setNewAppointment({
      Customer: data !== undefined ? data.getCustomer : undefined,
    });
  }, [data]);

  return (
    <Modal open={open} className={classes.modal}>
      <Paper className={classes.paper}>
        <Typography align="right">
          <IconButton onClick={() => setOpen(false)} style={{ padding: "0" }}>
            <Close />
          </IconButton>
        </Typography>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <Grid item xs={12} md={12} lg={12} className={classes.line}>
            {step === 1 ? (
              <InformationForm
                appointment={newAppointment}
                setAppointment={setNewAppointment}
                setStep={setStep}
                appointments={appointments}
              />
            ) : step === 2 ? (
              <SelectGuideForm
                appointment={newAppointment}
                setAppointment={setNewAppointment}
                setStep={setStep}
              />
            ) : (
              <SubmitForm
                appointment={newAppointment}
                setStep={setStep}
                submit={() => setConfirm(true)}
              />
            )}
          </Grid>
          <Submit
            submit={confirm}
            title="เพิ่มนัดหมาย"
            text="ยืนยันข้อมูลการเพิ่มนัดหมายใช่หรือไม่?"
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
          <Backdrop open={mutationLoading}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </Grid>
      </Paper>
    </Modal>
  );
}

export default AddAppointment;
