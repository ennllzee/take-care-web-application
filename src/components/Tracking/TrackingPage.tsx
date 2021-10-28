import { useQuery } from "@apollo/client";
import {
  CircularProgress,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  Typography,
  withStyles,
} from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/styles";
import { useEffect, useState } from "react";
import convertToThaiDate from "../../hooks/convertToThaiDate";
import useCustomerApi from "../../hooks/customerhooks";
import Appointment from "../../models/Appointment";
import TopBar from "../TopBar/TopBar";
import AppointmentCard from "./AppointmentCard";
import RecordRow from "./RecordRow";

interface TrackingPageProps {
  id: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(10),
      paddingRight: "5%",
      paddingLeft: "5%",
      minWidth: "80vw",
      maxWidth: "100vw",
    },
    form: {
      paddingTop: "5%",
    },
    margin: {
      margin: theme.spacing(1),
    },
    box: {
      padding: "5%",
      marginBottom: "5%",
    },
    line: {
      padding: "2%",
    },
    card: {
      paddingTop: "2%",
      paddingBottom: "2%",
    },
  })
);

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "#7C5D92",
      color: theme.palette.common.white,
      fontSize: 12,
      padding: '1%'
    },
  })
)(TableCell);

function TrackingPage({ id }: TrackingPageProps) {
  const classes = useStyles();
  const { GET_SINGLE_APPOINTMENT } = useCustomerApi();
  const { loading, error, data } = useQuery(GET_SINGLE_APPOINTMENT, {
    variables: { getAppointmentId: id },
    pollInterval: 30000,
  });

  const [appointment, setAppointment] = useState<Appointment>(
    data !== undefined ? data.getAppointment : undefined
  );

  useEffect(() => {
    if (!loading && data) {
      setAppointment(data.getAppointment);
    }
    if (error) console.log(error?.graphQLErrors);
  }, [loading, data, error]);

  return (
    <Grid>
      <TopBar page="บันทึกการบริการ" />
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="flex-start"
      >
        <Grid item className={classes.main}>
          {!loading ? (
            <>
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="flex-start"
                className={classes.line}
              >
                <Grid item xs={10} md={11} lg={11}>
                  <Typography variant="h5">
                    {convertToThaiDate(new Date(appointment?.AppointTime))}
                  </Typography>
                </Grid>
              </Grid>
              <Divider variant="middle" />
              <Grid
                container
                direction="row"
                alignItems="flex-start"
                justify="center"
              >
                <Grid item xs={12} md={12} lg={12} className={classes.card}>
                  <AppointmentCard appointment={appointment} />
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <TableContainer >
                    <Table>
                      <colgroup>
                        <col style={{ width: "20%" }} />
                        <col style={{ width: "40%" }} />
                        <col style={{ width: "40%" }} />
                      </colgroup>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="center">เวลา</StyledTableCell>
                          <StyledTableCell align="center">
                            กิจกรรม
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            บันทึก
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody >
                        {appointment?.Record?.map((r, key) => {
                          return <RecordRow key={key} record={r} />;
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
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
      </Grid>
    </Grid>
  );
}

export default TrackingPage;
