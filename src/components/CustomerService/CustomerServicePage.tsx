import {
  makeStyles,
  Theme,
  createStyles,
  Grid,
  Typography,
  Divider,
  List,
  ListItem,
  Collapse,
  // Backdrop,
  // CircularProgress,
} from "@material-ui/core";
import { 
  // DeleteForever, 
  Help 
} from "@material-ui/icons";
import { useEffect, useState } from "react";
// import { useGoogleLogout } from "react-google-login";
import { history } from "../../helper/history";
import Alert from "../Alert/Alert";
import BottomBar from "../BottomBar/BottomBar";
// import Submit from "../Submit/Submit";
import TopBar from "../TopBar/TopBar";
import ReportCard from "./ReportCard";
// import { useMutation } from "@apollo/client";
// import useGuideApi from "../../hooks/guidehooks";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(10),
      paddingRight: "5%",
      paddingLeft: "5%",
      minWidth: "100vw",
      maxWidth: "100vw",
    },
    line: {
      padding: "2%",
    },
    card: {
      padding: "2%",
    },
  })
);

function CustomerServicePage() {
  const classes = useStyles();
  const accessToken = localStorage.getItem("accessToken");
  const id = localStorage.getItem("_id");

  useEffect(() => {
    if (accessToken === null || id === null) {
      history.push("/");
    }
  }, [accessToken, id]);

  const [alert, setAlert] = useState<boolean>(false);

  const [open, setOpen] = useState<boolean>(false);

  return (
    <Grid>
      <TopBar page="งานบริการลูกค้า" />
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="space-between"
      >
        {/* <Alert
          closeAlert={() => setFailed(false)}
          alert={failed}
          title="ผิดพลาด"
          text="กรุณาลองใหม่อีกครั้ง"
          buttonText="ปิด"
        />
        <Alert
          closeAlert={signOut}
          alert={deleteAlert}
          title="สำเร็จ"
          text="ลบบัญชีผู้ใช้สำเร็จ"
          buttonText="ปิด"
        /> */}
        <Alert
          closeAlert={() => setAlert(false)}
          alert={alert}
          title="สำเร็จ"
          text="รายงานปัญหาสำเร็จ ผู้ดูแลระบบจะทำการติดต่อไปยังอีเมล์"
          buttonText="ปิด"
        />
        {/* <Submit
          submit={deleteConfirm}
          title="ลบบัญชีผู้ใช้"
          text="ยืนยันการลบบัญชีผู้ใช้?"
          denyText="ยกเลิก"
          submitText="ยืนยัน"
          denyAction={() => setDeleteConfirm(false)}
          submitAction={deleteAccount}
        />
        <Backdrop open={mutationLoading}>
          <CircularProgress color="inherit" />
        </Backdrop> */}
        <Grid item className={classes.main}>
          <List component="nav" aria-label="mailbox folders">
            <Divider />
            <ListItem button onClick={() => setOpen(true)} disabled={open}>
              <Grid container direction="row" alignItems="center">
                <Grid item xs={2} md={2} lg={1}>
                  <Help />
                </Grid>
                <Grid item xs={10} md={10} lg={11}>
                  <Typography variant="h6">รายงานปัญหา</Typography>
                </Grid>
              </Grid>
            </ListItem>
            <Collapse in={open}>
              <List
                component="div"
                disablePadding
                style={{ paddingBottom: "2%" }}
              >
                <ReportCard setAlert={setAlert} setOpen={setOpen} />
              </List>
            </Collapse>
            <Divider />
            {/* <ListItem button onClick={() => setDeleteConfirm(true)}>
              <Grid container direction="row" alignItems="center">
                <Grid item xs={2} md={2} lg={1}>
                  <DeleteForever />
                </Grid>
                <Grid item xs={10} md={10} lg={11}>
                  <Typography variant="h6">ลบบัญชีผู้ใช้</Typography>
                </Grid>
              </Grid>
            </ListItem>
            <Divider /> */}
          </List>
        </Grid>
      </Grid>
      <BottomBar page="Customer Service" />
    </Grid>
  );
}
export default CustomerServicePage;
