import {
  Container,
  createStyles,
  FormControl,
  FormControlLabel,
  Grid,
  LinearProgress,
  makeStyles,
  Radio,
  RadioGroup,
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
import { useEffect, useState } from "react";
import { history } from "../../helper/history";
import { ReportProblem } from "@material-ui/icons";
import useAdminApi from "../../hooks/adminhooks";
import Report from "../../models/Report";
import { useQuery } from "@apollo/client";
import ReportRow from "./ReportRow";
import Alert from "../Alert/Alert";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3),
    },
    title: {
      marginTop: "3%",
      marginLeft: "2%",
      marginBottom: "2%",
    },
    table_contianer: {
      width: "100%",
      paddingBottom: "1%",
    },
    thead: {
      background: "#25272E",
    },
    tbody: {
      background: "white",
    },
  })
);

const StyledTableCell = withStyles((theme: Theme) => ({
  head: {
    backgroundColor: "#6479D9",
    color: "white",
    textAlign: "center",
  },
}))(TableCell);

function ReportPage() {
  const classes = useStyles();
  const id = localStorage.getItem("_id");
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken === null || id === null) {
      history.push(`/`);
    }
  }, [accessToken, id]);

  const { GET_REQUEST_REPORT } = useAdminApi();

  const { loading, error, data } = useQuery(GET_REQUEST_REPORT, {
    pollInterval: 60000,
  });

  useEffect(() => {
    if (!loading && data) {
      setReports(data.getRequestReport);
    }
    if (error) console.log(error.graphQLErrors);
  }, [loading, data, error]);

  const [reports, setReports] = useState<Report[]>([]);
  const [filter, setFilter] = useState<string>("all");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter((event.target as HTMLInputElement).value);
  };

  const [alert, setAlert] = useState<boolean>(false);

  return (
    <div className={classes.root}>
      <Grid className={classes.title}>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <ReportProblem fontSize="large" />
          </Grid>
          <Grid item xs zeroMinWidth style={{ margin: "auto" }}>
            <Typography variant="h3" noWrap>
              รายงานปัญหา
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            style={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 0 }}
          >
            <FormControl component="fieldset" fullWidth={true}>
              <RadioGroup name="exp" value={filter} onChange={handleChange}>
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-end"
                >
                  <Grid item xs={3} md={3} lg={3}>
                    <FormControlLabel
                      value="all"
                      control={<Radio style={{ color: "black" }} />}
                      label={
                        <>
                          <Typography variant="body2">ทั้งหมด</Typography>
                        </>
                      }
                    />
                  </Grid>
                  <Grid item xs={3} md={3} lg={3}>
                    <FormControlLabel
                      value="customer"
                      control={<Radio style={{ color: "black" }} />}
                      label={
                        <>
                          <Typography variant="body2">ลูกค้า</Typography>
                        </>
                      }
                    />
                  </Grid>
                  <Grid item xs={3} md={3} lg={3}>
                    <FormControlLabel
                      value="guide"
                      control={<Radio style={{ color: "black" }} />}
                      label={
                        <>
                          <Typography variant="body2">ไกด์</Typography>
                        </>
                      }
                    />
                  </Grid>
                  <Grid item xs={3} md={3} lg={3}>
                    <Typography align="right" color="textSecondary">
                      จำนวนข้อมูลทั้งหมด:{" "}
                      {
                        reports.filter((e) => {
                          return (e.Reporter.Role === filter || filter === "all") && e.UpdatedAt !== null
                        }).length
                      }
                    </Typography>
                  </Grid>
                </Grid>
              </RadioGroup>
            </FormControl>
          </Grid>
          <TableContainer className={classes.table_contianer}>
            <Table>
              <colgroup>
                <col style={{ width: "30%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "20%" }} />
              </colgroup>
              <TableHead>
                <TableRow className={classes.thead}>
                  <StyledTableCell>ชื่อเรื่อง</StyledTableCell>
                  <StyledTableCell>ผู้รายงาน</StyledTableCell>
                  <StyledTableCell>ประเภทผู้ใช้</StyledTableCell>
                  <StyledTableCell>วันที่รับรายงาน</StyledTableCell>
                  <StyledTableCell>รายละเอียด</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody className={classes.tbody}>
                {reports
                  .slice()
                  .sort((a, b) => {
                    return (
                      new Date(a.CreatedAt).getTime() -
                      new Date(b.CreatedAt).getTime()
                    );
                  })
                  .filter(
                    (e) =>
                      (e.Reporter.Role === filter || filter === "all") &&
                      e.UpdatedAt !== null
                  )
                  .map((r, k) => {
                    return <ReportRow key={k} report={r} setAlert={setAlert} />;
                  })}
              </TableBody>
            </Table>
            <Alert
              closeAlert={() => setAlert(false)}
              alert={alert}
              title="สำเร็จ"
              text="ตอบกลับสำเร็จ"
              buttonText="ปิด"
            />
            {loading && (
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="center"
              >
                <Grid item xs={12}>
                  <LinearProgress />
                </Grid>
              </Grid>
            )}
          </TableContainer>
        </Grid>
      </Container>
    </div>
  );
}
export default ReportPage;
