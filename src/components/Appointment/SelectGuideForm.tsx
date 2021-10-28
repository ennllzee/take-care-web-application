import {
  Button,
  CircularProgress,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { NavigateBefore, NavigateNext, PersonPin } from "@material-ui/icons";
import { useEffect, useState } from "react";
import ContactCard from "./ContactCard";
import AppointmentForm from "../../models/AppointmentForm";
import Alert from "../Alert/Alert";
import useCustomerApi from "../../hooks/customerhooks";
import { useQuery } from "@apollo/client";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    margin: {
      margin: theme.spacing(1),
    },
  })
);

interface SelectGuideFormProps {
  appointment?: AppointmentForm;
  setAppointment: any;
  setStep: any;
}

function SelectGuideForm({
  appointment,
  setAppointment,
  setStep,
}: SelectGuideFormProps) {
  const classes = useStyles();

  const id = localStorage.getItem("_id");

  const { GET_AVAILABLE_GUIDE } = useCustomerApi();

  const { loading, error, data } = useQuery(GET_AVAILABLE_GUIDE, {
    variables: {
      getAvailableGuideCustomerId: id,
      getAvailableGuideDate: appointment?.AppointTime,
      getAvailableGuidePeriod: appointment?.Period,
    },
  });

  const [alert, setAlert] = useState<boolean>(false);
  const [guideId, setGuideId] = useState<string | undefined>(
    appointment?.Guide?._id
  );

  const [availableGuide, setAvailableGuide] = useState<any[]>(
    data !== undefined ? data.getAvailableGuide : []
  );

  const next = () => {
    if (availableGuide.find((g) => g.Createdby._id === guideId)) {
      setAppointment({
        ...appointment,
        Guide: availableGuide.find((g) => g.Createdby._id === guideId)
          .Createdby,
        ScheuleGuideId: availableGuide.find((g) => g.Createdby._id === guideId)
          ._id,
      });
      setStep(3);
    } else {
      setGuideId(undefined);
      setAlert(true);
    }
  };

  const back = () => {
    if (availableGuide.find((g) => g.Createdby._id === guideId)) {
      setAppointment({
        ...appointment,
        Guide: availableGuide.find((g) => g.Createdby._id === guideId)
          .Createdby,
        ScheuleGuideId: availableGuide.find((g) => g.Createdby._id === guideId)
          ._id,
      });
    } else {
      setGuideId(undefined);
    }
    setStep(1);
  };

  const click = (g: any) => {
    if (g?._id === guideId) {
      setGuideId(undefined);
    } else {
      setGuideId(g?._id);
    }
  };
  const [failed, setFailed] = useState<boolean>(false)
  useEffect(() => {
    if (!loading && data) {
      setAvailableGuide(data.getAvailableGuide);
    }
    if (error) {
      setFailed(true)
      console.log(error?.graphQLErrors)
    };
  }, [loading, data, error]);

  return (
    <Grid container direction="row" alignItems="center" justify="flex-start">
      <Alert
        closeAlert={() => setFailed(false)}
        alert={failed}
        title="ผิดพลาด"
        text="กรุณาลองใหม่อีกครั้ง"
        buttonText="ปิด"
      />
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
          {!loading ? (
            <>
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
                            // onClick={() => setGuideId(undefined)}
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
                          // onClick={() => click(g.Createdby)}
                        >
                          <ContactCard
                            user={g.Createdby}
                            click={() => click(g.Createdby)}
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
                  ขออภัย ระบบไม่พบไกด์ที่พร้อมบริการในช่วงเวลาที่ท่านเลือกได้
                </Typography>
              )}
            </>
          ) : (
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
            >
              <CircularProgress disableShrink />
            </Grid>
          )}
        </Grid>
        <Alert
          closeAlert={() => setAlert(false)}
          alert={alert}
          title="เลือกไกด์"
          text="กรุณาเลือกไกด์"
          buttonText="ตกลง"
        />
      </Grid>
      <Grid xs={12} md={12} lg={12}>
        <div className={classes.margin}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            className={classes.button}
          >
            <Grid item>
              <Button
                
                type="button"
                onClick={back}
                style={{
                  // padding: "7%",
                  color: "black",
                }}
              >
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <NavigateBefore />
                  <Typography variant="body1">ก่อนหน้า</Typography>
                </Grid>
              </Button>
            </Grid>
            <Grid item>
              <Button
                type="button"
                onClick={next}
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
                  <Typography variant="body1">ถัดไป</Typography>
                  <NavigateNext />
                </Grid>
              </Button>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
}

export default SelectGuideForm;
