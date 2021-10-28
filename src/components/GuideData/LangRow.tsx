import {
  TableCell,
  TableRow,
  Theme,
} from "@material-ui/core";
import { withStyles, createStyles } from "@material-ui/styles";

interface LangRowProps {
  key: number;
  lang: string;
  level: number;
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

function LangRow({ key, lang, level }: LangRowProps) {
  return (
    <StyledTableRow key={key}>
      <StyledTableCell align="center">{lang}</StyledTableCell>
      <StyledTableCell align="center">ระดับ {level} {level === 1 ? "สนทนาได้เล็กน้อย" : level === 2 ? "สนทนาได้" : "สนทนาและอ่านเขียนได้"}</StyledTableCell>
    </StyledTableRow> 
  );
}

export default LangRow;
