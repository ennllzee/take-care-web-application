import DateFnsUtils from "@date-io/date-fns";
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
  TextFieldProps,
  Theme,
  Typography,
} from "@material-ui/core";
import { Person, Wc, Cake, Home, NavigateNext } from "@material-ui/icons";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { useState } from "react";
import convertToThaiDate from "../../hooks/convertToThaiDate";
import GuideForm from "../../models/GuideForm";
import Alert from "../Alert/Alert";
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

interface ProfileFormProps {
  user: GuideForm;
  setUser: any;
  setStep: any;
  setDisplayImg: any;
  displayImg: any;
}

function ProfileForm({
  user,
  setUser,
  setStep,
  setDisplayImg,
  displayImg,
}: ProfileFormProps) {
  const classes = useStyles();
  const [firstName, setFirstName] = useState<string | undefined>(
    user.FirstName
  );

  const convertBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const [lastName, setLastName] = useState<string | undefined>(user.LastName);
  const [dob, setDOB] = useState<string | undefined>(user.DOB);
  const [address, setAddress] = useState<string | undefined>(user.Address);

  const [gender, setGender] = useState<string | undefined>(user.Gender);
  //   const [imgName, setImgName] = useState<any | undefined>(user.FirstName);
  const [avatar, setAvatar] = useState<any | undefined>(user.Avatar);

  const uploadImage = async (e: any) => {
    const file = e.target.files[0];
    setAvatar(file);

    const base64 = await convertBase64(file);
    setDisplayImg(base64);
  };

  const [alert, setAlert] = useState<boolean>(false);

  const next = () => {
    if (
      firstName !== undefined &&
      lastName !== undefined &&
      gender !== undefined &&
      dob !== undefined &&
      address !== undefined
    ) {
      setUser({
        ...user,
        FirstName: firstName,
        LastName: lastName,
        Gender: gender,
        DOB: dob,
        Address: address,
        Avatar: avatar,
      });
      setStep(2);
    } else {
      setAlert(true);
    }
  };

  const renderInput = (props: TextFieldProps): any => (
    <TextField
      onClick={props.onClick}
      label="วันเกิด"
      fullWidth={true}
      value={dob !== undefined ? convertToThaiDate(new Date(dob)) : null}
      onChange={props.onChange}
      required
      type="text"
      InputProps={{
        readOnly: true,
      }}
    />
  );

  return (
    <Grid>
      <form className={classes.form}>
        <Grid
          container
          direction="row"
          alignItems="flex-start"
          justify="space-between"
        >
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
                  style={{ background: "#6DB8A5", color: "white" }}
                  disabled={true}
                >
                  1
                </Fab>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h4">Profile</Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  ข้อมูลส่วนตัว
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <div className={classes.margin}>
          <Grid
            container
            spacing={1}
            justify="center"
            alignItems="center"
            className={classes.card}
          >
            <Grid item xs={4} md={3} lg={2} style={{ backgroundColor: "#EFEFEF" }}>
              <Image
                src={displayImg}
                loading={displayImg === undefined ? false : true}
                cover={true}
              />
            </Grid>
            <Grid item xs={4} md={3} lg={2}>
              <Typography align="center">
                <input
                  type="file"
                  accept="image/*"
                  id="contained-button-0-file"
                  onChange={(e: any) => {
                    uploadImage(e);
                  }}
                  hidden
                />
                <label htmlFor="contained-button-0-file">
                  <Button
                    component="span"
                    style={{
                      padding: "7%",
                      backgroundColor: "#508F7F",
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
                      <Typography variant="body1">อัปโหลดรูปโปรไฟล์</Typography>
                    </Grid>
                  </Button>
                </label>
              </Typography>
              <Typography variant="body1" align="center">
                {avatar !== undefined
                  ? " อัปโหลดสำเร็จ"
                  : " ยังไม่ได้อัปโหลดไฟล์"}
              </Typography>
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
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                type="text"
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                id="input-with-icon-grid"
                label="นามสกุล"
                fullWidth={true}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                type="text"
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
              <FormControl required fullWidth={true}>
                <InputLabel id="gender-label" shrink={gender !== undefined}>
                  เพศ
                </InputLabel>
                <Select
                  labelId="gender-label"
                  value={gender}
                  onChange={(e) => setGender(e.target.value as string)}
                  fullWidth={true}
                  required
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
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  label="วันเกิด"
                  value={dob !== undefined ? new Date(dob) : null}
                  onChange={(e) => setDOB(e?.toISOString())}
                  openTo="year"
                  views={["year", "month", "date"]}
                  disableFuture
                  fullWidth={true}
                  TextFieldComponent={renderInput}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={2} justify="center" alignItems="flex-end">
            <Grid item>
              <Home />
            </Grid>
            <Grid item xs={10}>
              <TextField
                id="input-with-icon-grid"
                label="ที่อยู่"
                fullWidth={true}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                required
              />
            </Grid>
          </Grid>
        </div>

        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
          className={classes.button}
        >
          <Grid item xs={3} md={3} lg={2}>
            <Button
              fullWidth={true}
              type="button"
              // color="primary"
              onClick={next}
              style={{
                padding: "7%",
                backgroundColor: "#508F7F",
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
                <Typography variant="body1">ถัดไป</Typography>
                <NavigateNext />
              </Grid>
            </Button>
          </Grid>
        </Grid>
      </form>

      <Alert
        closeAlert={() => setAlert(false)}
        alert={alert}
        title="ข้อมูลไม่ครบ"
        text="กรุณากรอกข้อมูลที่จำเป็นให้ครบ"
        buttonText="ปิด"
      />
    </Grid>
  );
}

export default ProfileForm;
