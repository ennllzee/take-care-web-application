import {
  Container,
  createStyles,
  Grid,
  LinearProgress,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Theme,
  Typography,
  withStyles,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { history } from "../../helper/history";
import { PersonPin } from "@material-ui/icons";
import Guide from "../../models/Guide";
import { useQuery } from "@apollo/client";
import useAdminApi from "../../hooks/adminhooks";
import GuideRow from "./GuideRow";

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

function GuideDataPage() {
  const classes = useStyles();
  const id = localStorage.getItem("_id");
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken === null || id === null) {
      history.push(`/`);
    }
  }, [accessToken, id]);

  const { GET_ALLGUIDE } = useAdminApi();

  const { loading, error, data } = useQuery(GET_ALLGUIDE, {
    pollInterval: 60000,
  });

  const [guides, setGuides] = useState<Guide[]>(
    data !== undefined ? data.getAllGuide : []
  );

  useEffect(() => {
    if (!loading && data) {
      setGuides(data.getAllGuide);
    }
    if (error) console.log(error.graphQLErrors);
  }, [loading, data, error]);

  const [search, setSearch] = useState<string>("");

  return (
    <div className={classes.root}>
      <Grid className={classes.title}>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <PersonPin fontSize="large" />
          </Grid>
          <Grid item xs zeroMinWidth style={{ margin: "auto" }}>
            <Typography variant="h3" noWrap>
              รายชื่อไกด์
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} style={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 0 }}>
            <TextField
              variant="outlined"
              fullWidth={true}
              type="text"
              label="ค้นหาชื่อ"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ backgroundColor: "white" }}
            />
            <Typography align="right" color="textSecondary">
              จำนวนข้อมูลทั้งหมด:{" "}
              {
                guides.filter(
                  (g) =>
                    (g.FirstName.includes(search) ||
                    g.LastName.includes(search) ||
                    search === "") && g.IsVerified
                ).length
              }
            </Typography>
          </Grid>
          <TableContainer className={classes.table_contianer}>
            <Table>
              <colgroup>
              <col style={{ width: "30%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "20%" }} />
              </colgroup>
              <TableHead>
                <TableRow className={classes.thead}>
                  <StyledTableCell>ชื่อ-นามสกุล</StyledTableCell>
                  <StyledTableCell>เพศ</StyledTableCell>
                  <StyledTableCell>วันที่ลงทะเบียน</StyledTableCell>
                  <StyledTableCell>อัปเดตข้อมูลล่าสุด</StyledTableCell>
                  <StyledTableCell>ข้อมูล</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody className={classes.tbody}>
                {guides
                  .slice()
                  .sort((a, b) => {
                    return (
                      new Date(a.CreatedAt).getTime() -
                      new Date(b.CreatedAt).getTime()
                    );
                  })
                  .filter((g) => g.IsVerified)
                  .map((g, k) => {
                    if (
                      g.FirstName.includes(search) ||
                      g.LastName.includes(search) ||
                      search === ""
                    ) {
                      return <GuideRow key={k} guide={g} />;
                    } else {
                      return <></>;
                    }
                  })}
              </TableBody>
            </Table>
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
export default GuideDataPage;
