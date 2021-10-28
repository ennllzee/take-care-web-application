import { TableCell, TableRow, Theme } from "@material-ui/core";
import { withStyles, createStyles } from "@material-ui/styles";
import moment from "moment";
import Record from "../../models/Record";

interface RecordRowProps {
  key: any;
  record?: Record;
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
      fontSize: 11,
      padding: '1%',
    },
  })
)(TableCell);

function RecordRow({ key, record }: RecordRowProps) {
  return (
    <StyledTableRow key={key}>
      <StyledTableCell align="center">{moment(record?.At).format('H.mm น.')}</StyledTableCell>
      <StyledTableCell align="left">{record?.Title}</StyledTableCell>
      <StyledTableCell align="left">{record?.Description}</StyledTableCell>
    </StyledTableRow>
  );
}

export default RecordRow;
