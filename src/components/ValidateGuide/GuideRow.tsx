import {
  Button,
  Grid,
  TableCell,
  TableRow,
  Theme,
  Typography,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { withStyles, createStyles } from "@material-ui/styles";
import { useState } from "react";
import convertToThaiDate from "../../hooks/convertToThaiDate";
import Guide from "../../models/Guide";
import GuideInfo from "./GuideInfo";

interface GuideRowProps {
  key: any;
  guide: Guide;
  setAlert: any
  setDenyAlert: any
  refresh: any
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

function GuideRow({ key, guide, setAlert, setDenyAlert, refresh }: GuideRowProps) {

  const [open, setOpen] = useState<boolean>(false)

  return (
    <StyledTableRow key={key}>
      <StyledTableCell align="center">
        {guide?.FirstName} {guide?.LastName}
      </StyledTableCell>
      <StyledTableCell align="center">
        {guide?.Gender === "male"
          ? "ชาย"
          : guide?.Gender === "female"
          ? "หญิง"
          : "อื่น ๆ "}
      </StyledTableCell>
      <StyledTableCell align="center">
        {convertToThaiDate(new Date(guide?.CreatedAt))}
      </StyledTableCell>
      <StyledTableCell align="center">
        {convertToThaiDate(new Date(guide?.UpdatedAt))}
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
            <Typography variant="body1">ตรวจสอบ</Typography>
          </Grid>
        </Button>
      </StyledTableCell>
      <GuideInfo open={open} setOpen={setOpen} setAlert={setAlert} setDenyAlert={setDenyAlert} guide={guide} refresh={() => refresh()}/>
    </StyledTableRow>
  );
}

export default GuideRow;
