import {
  TableCell,
  TableRow,
  Theme,
} from "@material-ui/core";
import { withStyles, createStyles } from "@material-ui/styles";

interface WorkRowProps {
  key: number;
  title: string;
  place: string;
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
      padding: '1%'
    },
  })
)(TableCell);

function WorkRow({ key, title, place }: WorkRowProps) {
  return (
    <StyledTableRow key={key}>
      <StyledTableCell align="center">{place}</StyledTableCell>
      <StyledTableCell align="center">{title}</StyledTableCell>
    </StyledTableRow>
  );
}

export default WorkRow;
