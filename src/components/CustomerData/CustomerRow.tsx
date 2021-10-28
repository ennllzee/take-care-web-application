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
import Customer from "../../models/Customer";
import CustomerInfo from "./CustomerInfo";
interface CustomerRowProps {
  key: any;
  customer: Customer;
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

function CustomerRow({ key, customer }: CustomerRowProps) {

  const [open, setOpen] = useState<boolean>(false)

  return (
    <StyledTableRow key={key}>
      <StyledTableCell align="center">
        {customer?.FirstName} {customer?.LastName}
      </StyledTableCell>
      <StyledTableCell align="center">
        {customer?.Gender === "male"
          ? "ชาย"
          : customer?.Gender === "female"
          ? "หญิง"
          : "อื่น ๆ "}
      </StyledTableCell>
      <StyledTableCell align="center">
        {convertToThaiDate(new Date(customer?.CreatedAt))}
      </StyledTableCell>
      <StyledTableCell align="center">
        {convertToThaiDate(new Date(customer?.UpdatedAt))}
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
      <CustomerInfo open={open} setOpen={setOpen} customer={customer}/>
    </StyledTableRow>
  );
}

export default CustomerRow;
