import {
  Backdrop,
  Button,
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
import { Close, PersonPin } from "@material-ui/icons";
import { useEffect } from "react";
import { useState } from "react";
import useCustomerApi from "../../hooks/customerhooks";
import { useMutation, useQuery } from "@apollo/client";
import Appointment from "../../models/Appointment";
import ContactCard from "./ContactCard";
import Alert from "../Alert/Alert";
import Submit from "../Submit/Submit";

interface ChangeGuideProps {
  open: boolean;
  setOpen: any;
  appointment: Appointment;
  setSuccess: any;
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
      padding: "5%",
    },
    form: {
      paddingTop: "2%",
    },
    card: {
      padding: "2%",
    },
    check: {
      color: "#29A940",
    },
    body: {
      padding: "2%",
    },
    button: {
      paddingTop: "3%",
      paddingBottom: "3%",
    },
  })
);

function ChangeGuide({
  open,
  setOpen,
  appointment,
  setSuccess,
  refresh,
}: ChangeGuideProps) {
  const classes = useStyles();
  const id = localStorage.getItem("_id");

  const {
    GET_AVAILABLE_GUIDE,
    UPDATE_APPOINTMENT_GUIDE_REQUEST,
    GET_ALLAPPOINTMENT_BY_CUSTOMER,
  } = useCustomerApi();

  const { loading, error, data } = useQuery(GET_AVAILABLE_GUIDE, {
    variables: {
      getAvailableGuideCustomerId: id,
      getAvailableGuideDate: appointment?.AppointTime,
      getAvailableGuidePeriod: appointment?.Period,
    },
  });

  const [failed, setFailed] = useState<boolean>(false);

  const [postnewrequest, { loading: mutationLoading, error: mutationError }] =
    useMutation(UPDATE_APPOINTMENT_GUIDE_REQUEST, {
      onCompleted: (data) => {
        console.log(data);
      },
    });

  const [alert, setAlert] = useState<boolean>(false);
  const [guideId, setGuideId] = useState<string | undefined>(
    appointment?.Guide?._id
  );
  const [scheduleId, setscheduleId] = useState<string | undefined>();

  const [availableGuide, setAvailableGuide] = useState<any[]>(
    data !== undefined ? data.getAvailableGuide : []
  );

  const click = (g: any) => {
    if (g?.Createdby._id === guideId) {
      setGuideId(undefined);
    } else {
      setGuideId(g?.Createdby._id);
      setscheduleId(g?._id);
    }
  };

  useEffect(() => {
    if (!loading && data) {
      setAvailableGuide(data.getAvailableGuide);
    }
    if (error) {
      setFailed(true)
      console.log(error?.graphQLErrors)
    };
  }, [loading, data, error]);

  const [confirmSubmit, setConfirmSubmit] = useState<boolean>(false);

  const submit = () => {
    if (guideId !== undefined) {
      setConfirmSubmit(true);
    } else {
      setAlert(true);
    }
  };

  const updateGuide = async () => {
    setConfirmSubmit(false);
    await postnewrequest({
      variables: {
        updateAppointmentRequestGuideId: appointment._id,
        updateAppointmentRequestGuideScheduleId: scheduleId,
        updateAppointmentRequestGuidePeriod: appointment.Period,
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
      console.log(mutationError.graphQLErrors);
      setFailed(true);
    } else {
      setSuccess(true);
      refresh();
      setOpen(false);
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
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <Grid item xs={12} md={12} lg={12} className={classes.line}>
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="flex-start"
            >
              <Grid container spacing={1} alignItems="center">
                <Grid item>
                  <PersonPin fontSize="large" />
                </Grid>
                <Grid item>
                  <Typography variant="h6">เลือกไกด์</Typography>
                </Grid>
              </Grid>

              <Grid item xs={12} md={12} lg={12} className={classes.form}>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justify="space-evenly"
                  className={classes.body}
                >
                  {availableGuide.length !== 0 ? (
                    availableGuide.map((g) => {
                      return (
                        <>
                          {g.Createdby._id === guideId && (
                            <>
                              <Grid
                                item
                                xs={12}
                                md={4}
                                lg={3}
                                className={classes.card}
                              >
                                <ContactCard
                                  user={g.Createdby}
                                  check={true}
                                  click={() => click(undefined)}
                                />
                              </Grid>
                            </>
                          )}
                          {g.Createdby._id !== guideId && (
                            <Grid
                              item
                              xs={12}
                              md={4}
                              lg={3}
                              className={classes.card}
                            >
                              <ContactCard
                                user={g.Createdby}
                                click={() => click(g)}
                              />
                            </Grid>
                          )}
                        </>
                      );
                    })
                  ) : (
                    <Typography
                      align="center"
                      variant="body1"
                      color="textSecondary"
                    >
                      ขออภัย
                      ระบบไม่พบไกด์ที่พร้อมบริการในช่วงเวลาที่ท่านเลือกได้
                    </Typography>
                  )}
                </Grid>
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
                  closeAlert={() => setAlert(false)}
                  alert={alert}
                  title="ข้อมูลไม่ครบ"
                  text="กรุณาเลือกไกด์"
                  buttonText="ปิด"
                />
                <Submit
                  submit={confirmSubmit}
                  title="เลือกไกด์"
                  text="ยืนยันการเปลี่ยนไกด์หรือไม่"
                  denyText="ปิด"
                  submitText="ยืนยัน"
                  denyAction={() => setConfirmSubmit(false)}
                  submitAction={updateGuide}
                />
              </Grid>

              <Grid xs={12} md={12} lg={12}>
                <Grid
                  container
                  direction="row"
                  justify="flex-end"
                  alignItems="center"
                  className={classes.button}
                >
                  <Grid item>
                    <Button
                      type="button"
                      onClick={submit}
                      style={{
                        // padding: "7%",
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
                        <Typography variant="body1">ยืนยัน</Typography>
                      </Grid>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
}

export default ChangeGuide;
