import {
  makeStyles,
  Theme,
  createStyles,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  TextFieldProps,
  Typography,
  Divider,
  Backdrop,
} from "@material-ui/core";
import {
  Person,
  Wc,
  Cake,
  Healing,
  PhoneAndroid,
  Email,
  Phone,
  Edit,
} from "@material-ui/icons";
import { useState, useEffect } from "react";
import { history } from "../../helper/history";
import Customer from "../../models/Customer";
import BottomBar from "../BottomBar/BottomBar";
import TopBar from "../TopBar/TopBar";
import ProfileCard from "./ProfileCard";
import { useQuery, useMutation } from "@apollo/client";
import useCustomerApi from "../../hooks/customerhooks";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import convertToThaiDate from "../../hooks/convertToThaiDate";
import Alert from "../Alert/Alert";
import Submit from "../Submit/Submit";
import moment from "moment";

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
    form: {
      paddingTop: "5%",
      paddingBottom: "3%",
    },
    margin: {
      margin: theme.spacing(1),
    },
  })
);

function ProfilePage() {
  const classes = useStyles();
  const accessToken = localStorage.getItem("accessToken");
  const id = localStorage.getItem("_id");

  const { GET_SINGLE_CUSTOMER, UPDATE_CUSTOMER, UPLOAD_PROFILE } =
    useCustomerApi();

  const { loading, error, data } = useQuery(GET_SINGLE_CUSTOMER, {
    variables: { getCustomerId: id },
  });

  const [user, setUser] = useState<Customer | undefined>(
    data !== undefined ? data.getCustomer : undefined
  );

  const renderInput = (props: TextFieldProps): any => (
    <TextField
      onClick={edit ? props.onClick : undefined}
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

  const [edit, setEdit] = useState<boolean>(false);

  const [failed, setFailed] = useState<boolean>(false);

  useEffect(() => {
    if (!loading && data) {
      setUser(data.getCustomer);
      setFirstName(data.getCustomer?.FirstName);
      setLastName(data.getCustomer?.LastName);
      setDOB(data.getCustomer?.DOB);
      setPhoneNum(data.getCustomer?.PhoneNumber);
      setEmail(data.getCustomer?.Email);
      setGender(data.getCustomer?.Gender);
      setDisorder(data.getCustomer?.CongenitalDisorders);
      setEmerNum(data.getCustomer?.EmergencyTel);
      setAvatar(undefined);
      setProfile(
        data.getGuide?.Avatar !== null
          ? `data:${data.getCustomer?.Avatar?.mimetype};base64,${data.getCustomer?.Avatar?.data}`
          : `data:${undefined};base64,${undefined}`
      );
    }
    if (error) {
      setFailed(true);
      console.log(error?.graphQLErrors);
    }
  }, [loading, data, error, edit]);

  const [firstName, setFirstName] = useState<string | undefined>(
    user?.FirstName
  );
  const [lastName, setLastName] = useState<string | undefined>(user?.LastName);
  const [dob, setDOB] = useState<string | undefined>(user?.DOB);
  const [phoneNum, setPhoneNum] = useState<string | undefined>(
    user?.PhoneNumber
  );
  const [email, setEmail] = useState<string | undefined>(user?.Email);
  const [emerNum, setEmerNum] = useState<string | undefined>(
    user?.EmergencyTel
  );
  const [disorder, setDisorder] = useState<string | undefined>(
    user?.CongenitalDisorders
  );
  const [gender, setGender] = useState<string | undefined>(user?.Gender);
  const [avatar, setAvatar] = useState<any | undefined>(undefined);
  const [profile, setProfile] = useState<any | undefined>(
    user?.Avatar !== null
      ? `data:${user?.Avatar?.mimetype};base64,${user?.Avatar?.data}`
      : `data:${undefined};base64,${undefined}`
  );

  useEffect(() => {
    if (accessToken === null || id === null) {
      history.push("/");
    }
  }, [accessToken, id]);

  const uploadImage = async (e: any) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setAvatar(file);
    setProfile(base64);
  };

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

  const [confirmEdit, setConfirmEdit] = useState<boolean>(false);
  const [alert, setAlert] = useState<boolean>(false);
  const [alertData, setAlertData] = useState<boolean>(false);

  const [updateProfile, { loading: mutationLoading, error: mutationError }] =
    useMutation(UPDATE_CUSTOMER, {
      onCompleted: (data: any) => {
        console.log(data);
      },
    });

  const [
    updateProfileImg,
    { loading: mutationImgLoading, error: mutationImgError },
  ] = useMutation(UPLOAD_PROFILE, {
    onCompleted: (data: any) => {
      console.log(data);
    },
  });

  const editProfile = async () => {
    setConfirmEdit(false);
    if (
      firstName !== "" &&
      lastName !== "" &&
      dob !== "" &&
      phoneNum !== "" &&
      gender !== "" &&
      email !== ""
    ) {
      if (avatar) {
        await updateProfileImg({
          variables: {
            addCustomerProfileFile: avatar,
            addCustomerProfileCustomerId: id,
          },
        });
      }
      await updateProfile({
        variables: {
          updateCustomerId: id,
          updateCustomerInput: {
            FirstName: firstName,
            LastName: lastName,
            Gender: gender,
            DOB: dob,
            PhoneNumber: phoneNum,
            EmergencyTel: emerNum,
            CongenitalDisorders: disorder,
          },
        },
        refetchQueries: [
          {
            query: GET_SINGLE_CUSTOMER,
            variables: { getCustomerId: id },
          },
        ],
      });
      while (mutationImgLoading || mutationLoading) {}
      if (mutationImgError || mutationError) {
        if (mutationImgError) console.log(mutationImgError.graphQLErrors);
        if (mutationError) console.log(mutationError.graphQLErrors);
        setFailed(true);
      } else {
        setAlert(true);
        setEdit(false);
      }
    } else {
      setAlertData(true);
    }
  };
  const [close, setClose] = useState<boolean>(false);

  return (
    <Grid>
      <TopBar page="ข้อมูลส่วนตัว" />
      <Submit
        submit={close}
        title="ข้อมูลส่วนตัว"
        text="ต้องการปิดตารางงานใช่หรือไม่? ข้อมูลที่ทำการแก้ไขจะไม่ถูกบันทึก กรุณาทำการบันทึกก่อนออกจากโหมดแก้ไข"
        denyText="กลับ"
        submitText="ออก"
        denyAction={() => setClose(false)}
        submitAction={() => {
          setClose(false);
          setEdit(false);
        }}
      />
      <Backdrop open={mutationLoading || mutationImgLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Alert
        closeAlert={() => setFailed(false)}
        alert={failed}
        title="ผิดพลาด"
        text="กรุณาลองใหม่อีกครั้ง"
        buttonText="ปิด"
      />
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="space-between"
      >
        <Grid item className={classes.main}>
          {!loading ? (
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
            >
              <Grid item xs={12} md={10} lg={8}>
                <ProfileCard
                  name={user?.FirstName + " " + user?.LastName}
                  gmail={user?.Gmail}
                  img={profile}
                />
              </Grid>
              {edit && (
                <Grid item xs={12} md={10} lg={8} style={{ paddingTop: "3%" }}>
                  <Typography align="center">
                    <input
                      type="file"
                      accept="image/*"
                      id="contained-button-file"
                      onChange={(e: any) => {
                        uploadImage(e);
                      }}
                      hidden
                    />
                    <label htmlFor="contained-button-file">
                      <Button
                        component="span"
                        style={{
                          backgroundColor: "#7C5D92",
                          color: "white",
                        }}
                      >
                        <Grid
                          container
                          direction="row"
                          justify="center"
                          alignItems="center"
                        >
                          <Typography variant="body1">
                            อัปโหลดรูปโปรไฟล์
                          </Typography>
                        </Grid>
                      </Button>
                    </label>
                    {avatar !== undefined
                      ? " อัปโหลดสำเร็จ"
                      : " ยังไม่ได้อัปโหลดไฟล์"}
                  </Typography>
                </Grid>
              )}
              <Grid item xs={12} md={10} lg={8}>
                <form className={classes.form}>
                  <div className={classes.margin}>
                    <Grid
                      container
                      spacing={2}
                      justify="center"
                      alignItems="center"
                    >
                      <Grid item xs={2}>
                        <Typography align="center">
                          <Person />
                        </Typography>
                      </Grid>

                      {edit ? (
                        <>
                          <Grid item xs={5}>
                            <TextField
                              id="input-with-icon-grid"
                              label="ชื่อ"
                              fullWidth={true}
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              required
                              disabled={!edit}
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
                        </>
                      ) : (
                        <Grid item xs={10}>
                          <Typography variant="body1">
                            ชื่อ: {user?.FirstName} {user?.LastName}
                          </Typography>
                        </Grid>
                      )}
                    </Grid>
                  </div>
                  <div className={classes.margin}>
                    <Grid
                      container
                      spacing={2}
                      justify="center"
                      alignItems="center"
                    >
                      <Grid item xs={2}>
                        <Typography align="center">
                          <Wc />
                        </Typography>
                      </Grid>
                      <Grid item xs={10}>
                        {edit ? (
                          <FormControl required fullWidth={true}>
                            <InputLabel id="gender-label" shrink={true}>
                              เพศ
                            </InputLabel>
                            <Select
                              labelId="gender-label"
                              value={user !== undefined ? gender : "gender"}
                              onChange={(e) => {
                                setGender(e.target.value as string);
                              }}
                              fullWidth={true}
                              required
                            >
                              <MenuItem value={undefined} disabled>
                                เพศ
                              </MenuItem>
                              <MenuItem value="male">ชาย</MenuItem>
                              <MenuItem value="female">หญิง</MenuItem>
                              <MenuItem value="other">อื่น ๆ</MenuItem>
                            </Select>
                          </FormControl>
                        ) : (
                          <Typography variant="body1">
                            เพศ:{" "}
                            {user?.Gender === "male"
                              ? "ชาย"
                              : user?.Gender === "female"
                              ? "หญิง"
                              : "อื่น ๆ"}
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </div>
                  <div className={classes.margin}>
                    <Grid
                      container
                      spacing={2}
                      justify="center"
                      alignItems="center"
                    >
                      <Grid item xs={2}>
                        <Typography align="center">
                          <Cake />
                        </Typography>
                      </Grid>
                      <Grid item xs={10}>
                        {edit ? (
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                              label="วันเกิด"
                              value={dob !== undefined ? new Date(dob) : null}
                              onChange={(e) => setDOB(moment(e).format())}
                              openTo="year"
                              views={["year", "month", "date"]}
                              disableFuture
                              fullWidth={true}
                              TextFieldComponent={renderInput}
                            />
                          </MuiPickersUtilsProvider>
                        ) : (
                          <Typography variant="body1">
                            วันเกิด: {convertToThaiDate(new Date(user?.DOB))}
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </div>
                  <div className={classes.margin}>
                    <Grid
                      container
                      spacing={2}
                      justify="center"
                      alignItems="center"
                    >
                      <Grid item xs={2}>
                        <Typography align="center">
                          <Healing />
                        </Typography>
                      </Grid>
                      <Grid item xs={10}>
                        {edit ? (
                          <TextField
                            id="input-with-icon-grid"
                            label="โรครประจำตัว (ถ้ามี)"
                            fullWidth={true}
                            value={disorder}
                            onChange={(e) => setDisorder(e.target.value)}
                            type="text"
                          />
                        ) : (
                          <Typography variant="body1">
                            โรคประจำตัว:{" "}
                            {user?.CongenitalDisorders !== null
                              ? user?.CongenitalDisorders
                              : "ไม่มี"}
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </div>
                  <div className={classes.margin}>
                    <Grid
                      container
                      spacing={2}
                      justify="center"
                      alignItems="center"
                    >
                      <Grid item xs={2}>
                        <Typography align="center">
                          <PhoneAndroid />
                        </Typography>
                      </Grid>
                      <Grid item xs={10}>
                        {edit ? (
                          <TextField
                            id="input-with-icon-grid"
                            label="เบอร์โทรศัพท์"
                            fullWidth={true}
                            value={phoneNum}
                            onChange={(e) => setPhoneNum(e.target.value)}
                            required
                            type="text"
                          />
                        ) : (
                          <Typography variant="body1">
                            เบอร์โทร: {user?.PhoneNumber}
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </div>
                  <div className={classes.margin}>
                    <Grid
                      container
                      spacing={2}
                      justify="center"
                      alignItems="center"
                    >
                      <Grid item xs={2}>
                        <Typography align="center">
                          <Email />
                        </Typography>
                      </Grid>
                      <Grid item xs={10}>
                        {edit ? (
                          <TextField
                            id="input-with-icon-grid"
                            label="อีเมล์"
                            fullWidth={true}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            required
                          />
                        ) : (
                          <Typography variant="body1">
                            อีเมล์: {user?.Email}
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </div>
                  <div className={classes.margin}>
                    <Grid
                      container
                      spacing={2}
                      justify="center"
                      alignItems="center"
                    >
                      <Grid item xs={2}>
                        <Typography align="center">
                          <Phone />
                        </Typography>
                      </Grid>
                      <Grid item xs={10}>
                        {edit ? (
                          <TextField
                            id="input-with-icon-grid"
                            label="เบอร์โทรฉุกเฉิน (ถ้ามี)"
                            fullWidth={true}
                            value={emerNum}
                            onChange={(e) => setEmerNum(e.target.value)}
                            type="text"
                          />
                        ) : (
                          <Typography variant="body1">
                            เบอร์โทรฉุกเฉิน:{" "}
                            {user?.EmergencyTel !== null
                              ? user?.EmergencyTel
                              : "ไม่มี"}
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </div>
                </form>
                {/* <div className={classes.margin}> */}
                <Divider variant="middle" />
                {/* </div> */}
                <Alert
                  closeAlert={() => setAlert(false)}
                  alert={alert}
                  title="สำเร็จ"
                  text="แก้ไขข้อมูลสำเร็จ"
                  buttonText="ปิด"
                />
                <Alert
                  closeAlert={() => setAlertData(false)}
                  alert={alertData}
                  title="ข้อมูลไม่ครบ"
                  text="กรุณากรอกข้อมูลให้ครบ"
                  buttonText="ปิด"
                />
                <Submit
                  submit={confirmEdit}
                  title="แก้ไขข้อมูล"
                  text="ยืนยันการแก้ไขข้อมูลใช่หรือไม่?"
                  denyText="ยกเลิก"
                  submitText="ยืนยัน"
                  denyAction={() => setConfirmEdit(false)}
                  submitAction={editProfile}
                />
              </Grid>
              <Grid xs={12} md={10} lg={8}>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                  style={{ padding: "2%" }}
                >
                  <Grid item>
                    {edit && (
                      <Button
                        onClick={() => setClose(true)}
                        type="button"
                        // fullWidth={true}
                      >
                        <Grid
                          container
                          direction="row"
                          justify="center"
                          alignItems="center"
                        >
                          <Typography variant="body1">ยกเลิก</Typography>
                        </Grid>
                      </Button>
                    )}
                  </Grid>
                  <Grid item>
                    {edit ? (
                      <Button
                        onClick={() => setConfirmEdit(true)}
                        type="button"
                        style={{
                          backgroundColor: "#7C5D92",
                          color: "white",
                        }}
                      >
                        <Grid
                          container
                          direction="row"
                          justify="center"
                          alignItems="center"
                        >
                          {/* <ExitToApp /> */}
                          <Typography variant="body1">ยืนยัน</Typography>
                        </Grid>
                      </Button>
                    ) : (
                      <Button
                        onClick={() => setEdit(true)}
                        type="button"
                        fullWidth={true}
                        style={{
                          backgroundColor: "#7C5D92",
                          color: "white",
                        }}
                      >
                        <Grid
                          container
                          direction="row"
                          justify="center"
                          alignItems="center"
                        >
                          <Edit />
                          <Typography variant="body1">แก้ไขข้อมูล</Typography>
                        </Grid>
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
            >
              <CircularProgress disableShrink />
            </Grid>
          )}
        </Grid>
      </Grid>
      <BottomBar page="Profile" />
    </Grid>
  );
}

export default ProfilePage;
