import {
  createStyles,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Modal,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import { Close, ContactPhone } from "@material-ui/icons";
import Customer from "../../models/Customer";
import Image from "material-ui-image";
import moment from "moment";
import convertToThaiDate from "../../hooks/convertToThaiDate";

interface CustomerInfoProps {
  open: boolean;
  setOpen: any;
  customer: Customer;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      height: "85vh",
      width: "80vw",
      overflow: "auto",
    },
    line: {
      padding: "2%",
    },
    divide: {
      padding: "2%",
      paddingTop: 0,
    },
    bord: {
      // border: "2px solid black",
      padding: "1%",
    },
  })
);

function CustomerInfo({ open, setOpen, customer }: CustomerInfoProps) {
  const classes = useStyles();

  return (
    <Modal open={open} className={classes.modal}>
      <Paper className={classes.paper}>
        <Typography align="right">
          <IconButton onClick={() => setOpen(false)} style={{ padding: "0" }}>
            <Close />
          </IconButton>
        </Typography>
        <Grid xs={12} md={12} lg={12} className={classes.line}>
          <Typography variant="h1">ข้อมูลลูกค้า</Typography>
        </Grid>

        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          {/* <Grid item xs={12} md={12} lg={12} className={classes.divide}>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            > */}
          <Grid xs={12} md={10} lg={8} className={classes.divide}>
            <Grid
              container
              alignItems="center"
              justify="center"
              className={classes.bord}
            >
              <Grid item xs={12} md={4} lg={4} style={{ padding: "1%" }}>
                <Image
                  src={
                    customer.Avatar === null
                      ? `data:${undefined};base64,${undefined}`
                      : `data:${customer.Avatar.mimetype};base64,${customer.Avatar.data}`
                  }
                  cover={true}
                />
              </Grid>
              <Grid item xs={12} md={8} lg={8} style={{ padding: "1%" }}>
                <Grid
                  container
                  direction="row"
                  alignItems="flex-start"
                  justify="space-between"
                  // style={{ padding: "1%" }}
                >
                  <Grid item xs={3}>
                    <Typography variant="h6" align="right">
                      ชื่อ:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="h6">
                      {customer.FirstName} {customer?.LastName}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="h6" align="right">
                      เพศ:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="h6">
                      {customer.Gender === "male"
                        ? "ชาย"
                        : customer.Gender === "female"
                        ? "หญิง"
                        : "อื่น ๆ"}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="h6" align="right">
                      วันเกิด:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="h6">
                      {convertToThaiDate(new Date(customer.DOB))} (
                      {moment().diff(customer.DOB, "years", false)} ปี)
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="h6" align="right">
                      โรคประจำตัว:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="h6">
                      {customer.CongenitalDisorders !== null
                        ? customer.CongenitalDisorders
                        : "ไม่มี"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12} md={12} lg={12} className={classes.divide}>
              <Divider />
              <Grid
                container
                direction="row"
                alignItems="flex-start"
                justify="space-evenly"
                className={classes.bord}
              >
                <Grid item xs={12} md={12} lg={12}>
                  <Typography variant="h3" align="left">
                    <ContactPhone /> ช่องทางการติดต่อ
                  </Typography>
                </Grid>
                <Grid item xs={3} md={3} lg={3}>
                  <Typography variant="h6" align="left">
                    เบอร์โทรศัพท์:
                  </Typography>
                </Grid>
                <Grid item xs={8} md={8} lg={8}>
                  <Typography variant="h6">{customer.PhoneNumber}</Typography>
                </Grid>
                <Grid item xs={3} md={3} lg={3}>
                  <Typography variant="h6" align="left">
                    อีเมล์:
                  </Typography>
                </Grid>
                <Grid item xs={8} md={8} lg={8}>
                  <Typography variant="h6">{customer.Email}</Typography>
                </Grid>
                <Grid item xs={3} md={3} lg={3}>
                  <Typography variant="h6" align="left">
                    เบอร์โทรฉุกเฉิน:
                  </Typography>
                </Grid>
                <Grid item xs={8} md={8} lg={8}>
                  <Typography variant="h6">{customer.EmergencyTel !== null ? customer.EmergencyTel : "ไม่มี"}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
}

export default CustomerInfo;
