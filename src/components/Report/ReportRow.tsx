import {
  Button,
  Chip,
  Grid,
  TableCell,
  TableRow,
  Theme,
  Typography,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { withStyles, createStyles, makeStyles } from "@material-ui/styles";
import { useState } from "react";
import convertToThaiDate from "../../hooks/convertToThaiDate";
import Report from "../../models/Report";
import ReportInfo from "./ReportInfo";
interface ReportRowProps {
  key: any;
  report: Report;
  setAlert: any
}

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    body: {
      fontSize: 12,
      // padding: '2%'
    },
  })
)(TableCell);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    customer: {
      color: "white",
      backgroundColor: "#7C5D92"
    },
    guide: {
      color: "white",
      backgroundColor: "#508F7F"
    }
  })
);

function ReportRow({ key, report, setAlert }: ReportRowProps) {
  const [open, setOpen] = useState<boolean>(false);
  const classes = useStyles()

  return (
    <StyledTableRow key={key}>
      <StyledTableCell align="center">{report.Title}</StyledTableCell>
      <StyledTableCell align="center">
        {report.Reporter.FirstName} {report.Reporter.LastName}
      </StyledTableCell>
      <StyledTableCell align="center">
        <Chip
          size="small"
          label= {report.Reporter.Role === "customer" ? "ลูกค้า" : "ไกด์"}
          className={report.Reporter.Role === "customer" ? classes.customer : classes.guide}
        />
      </StyledTableCell>
      <StyledTableCell align="center">
        {convertToThaiDate(new Date(report.CreatedAt))}
      </StyledTableCell>
      <StyledTableCell align="center">
        <Button onClick={() => setOpen(true)}>
          <Grid
            container
            direction="row"
            spacing={1}
            justify="center"
            alignItems="center"
          >
            <Search />
            <Typography variant="body1">รายละเอียด</Typography>
          </Grid>
        </Button>
      </StyledTableCell>
      <ReportInfo open={open} setOpen={setOpen} report={report} setAlert={setAlert}/>
    </StyledTableRow>
  );
}

export default ReportRow;
