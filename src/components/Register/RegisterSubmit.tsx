import {
  Button,
  createStyles,
  Fab,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import {
  Person,
  Wc,
  Cake,
  Healing,
  Email,
  Phone,
  PhoneAndroid,
  NavigateBefore,
} from "@material-ui/icons";
import convertToThaiDate from "../../hooks/convertToThaiDate";
import CustomerForm from "../../models/CustomerForm";
import Image from "material-ui-image";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      paddingTop: "2%",
    },
    margin: {
      margin: theme.spacing(1),
    },
    box: {
      padding: "5%",
      marginBottom: "5%",
    },
    end: {
      minHeight: "5vh",
    },
    img: {
      height: "20vh",
      weight: "80%",
      border: "2px solid #000",
    },
    card: {
      padding: "2%",
    },
    button: {
      padding: "5%",
    },
  })
);

interface RegisterSubmitProps {
  user: CustomerForm;
  setStep: any;
  setSubmit: any;
  displayImg: any;
}

function RegisterSubmit({
  user,
  setStep,
  setSubmit,
  displayImg,
}: RegisterSubmitProps) {
  const classes = useStyles();

  const back = () => {
    setStep(3);
  };

  // const convertBase64 = (file: any) => {
  //   return new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(file);

  //     fileReader.onload = () => {
  //       resolve(fileReader.result);
  //     };

  //     fileReader.onerror = (error) => {
  //       reject(error);
  //     };
  //   });
  // };

  // const base64Avatar = convertBase64(user.Avatar);

  return (
    <Grid>
      <form className={classes.form}>
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="space-between"
        >
          {/* <Grid item xs={1}>
            <Typography align="center">1</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography align="center">2</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography align="center">3</Typography>
          </Grid> */}
          <Grid item xs={12}>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justify="flex-start"
            >
              <Grid item>
                <Fab
                  variant="extended"
                  style={{ background: "#AC86C7", color: "white" }}
                  disabled={true}
                >
                  4
                </Fab>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h4">Summary</Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  สรุปข้อมูลการลงทะเบียน
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* <Typography variant="h4">ยืนยันการลงทะเบียน</Typography> */}
        <div className={classes.margin}>
          <Grid
            container
            spacing={1}
            justify="center"
            alignItems="center"
            className={classes.card}
          >
            <Grid item xs={4} md={3} lg={2}  style={{backgroundColor: "#EFEFEF"}}>
              <Image
                src={displayImg}
                loading={displayImg === undefined ? false : true}
                cover={true}
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={2} justify="center" alignItems="flex-end">
            <Grid item>
              <Person />
            </Grid>
            <Grid item xs={5}>
              <TextField
                id="input-with-icon-grid"
                label="ชื่อ"
                fullWidth={true}
                value={user.FirstName}
                // required
                type="text"
                disabled={true}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                id="input-with-icon-grid"
                label="นามสกุล"
                fullWidth={true}
                value={user.LastName}
                // required
                type="text"
                disabled={true}
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={2} justify="center" alignItems="flex-end">
            <Grid item>
              <Wc />
            </Grid>
            <Grid item xs={10}>
              <FormControl fullWidth={true}>
                <InputLabel id="gender-label" shrink={true}>
                  เพศ
                </InputLabel>
                <Select
                  labelId="gender-label"
                  value={user.Gender}
                  fullWidth={true}
                  disabled={true}
                >
                  <MenuItem value={undefined} disabled>
                    เพศ
                  </MenuItem>
                  <MenuItem value="male">ชาย</MenuItem>
                  <MenuItem value="female">หญิง</MenuItem>
                  <MenuItem value="others">อื่น ๆ</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={2} justify="center" alignItems="flex-end">
            <Grid item>
              <Cake />
            </Grid>
            <Grid item xs={10}>
              <TextField
                // id="date"
                label="วันเกิด"
                // type="date"
                // defaultValue={moment(user.DOB).format("YYYY-MM-DD")}
                value={convertToThaiDate(new Date(user.DOB))}
                // InputLabelProps={{
                //   shrink: true,
                // }}
                fullWidth={true}
                disabled={true}
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={2} justify="center" alignItems="flex-end">
            <Grid item>
              <Healing />
            </Grid>
            <Grid item xs={10}>
              <TextField
                id="input-with-icon-grid"
                label="โรคประจำตัว"
                fullWidth={true}
                value={
                  user.CongenitalDisorders !== undefined
                    ? user.CongenitalDisorders
                    : "-"
                }
                type="text"
                // required
                disabled={true}
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={2} justify="center" alignItems="flex-end">
            <Grid item>
              <PhoneAndroid />
            </Grid>
            <Grid item xs={10}>
              <TextField
                id="input-with-icon-grid"
                label="เบอร์โทรศัพท์มือถือ"
                fullWidth={true}
                value={user.PhoneNumber}
                // required
                type="text"
                disabled={true}
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={2} justify="center" alignItems="flex-end">
            <Grid item>
              <Email />
            </Grid>
            <Grid item xs={10}>
              <TextField
                id="input-with-icon-grid"
                label="อีเมล์"
                fullWidth={true}
                value={user.Email}
                type="text"
                // required
                disabled={true}
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={2} justify="center" alignItems="flex-end">
            <Grid item>
              <Phone />
            </Grid>
            <Grid item xs={10}>
              <TextField
                id="input-with-icon-grid"
                label="เบอร์โทรกรณีฉุกเฉิน (ถ้ามี)"
                fullWidth={true}
                value={
                  user.EmergencyTel !== undefined || user.EmergencyTel !== ""
                    ? user.EmergencyTel
                    : "ไม่มี"
                }
                type="text"
                disabled={true}
              />
            </Grid>
          </Grid>
        </div>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          className={classes.button}
        >
          <Grid item xs={3} md={3} lg={2}>
            <Button
              fullWidth={true}
              type="button"
              // color="primary"
              onClick={back}
              style={{
                padding: "7%",
                // backgroundColor: "#508F7F",
                color: "black",
              }}
            >
              <Grid
                container
                direction="row"
                spacing={1}
                justify="center"
                alignItems="center"
              >
                <NavigateBefore />
                <Typography variant="body1">ก่อนหน้า</Typography>
              </Grid>
            </Button>
          </Grid>
          <Grid item xs={3} md={3} lg={2}>
            <Button
              fullWidth={true}
              type="button"
              onClick={() => setSubmit(true)}
              style={{
                padding: "7%",
                backgroundColor: "#7C5D92",
                color: "white",
              }}
            >
              <Grid
                container
                direction="row"
                spacing={1}
                justify="center"
                alignItems="center"
              >
                <Typography variant="body1">ยืนยัน</Typography>
              </Grid>
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}

export default RegisterSubmit;
