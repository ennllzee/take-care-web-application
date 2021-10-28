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
  Chip,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Backdrop,
} from "@material-ui/core";
import {
  Person,
  Wc,
  Cake,
  PhoneAndroid,
  Email,
  Edit,
  Error,
  Timer,
  Star,
  Payment,
  Home,
  Business,
  Language,
  Fingerprint,
  AttachFile,
  Book,
  School,
  AssignmentInd,
  Work,
} from "@material-ui/icons";
import { useState, useEffect } from "react";
import { history } from "../../helper/history";
import BottomBar from "../BottomBar/BottomBar";
import TopBar from "../TopBar/TopBar";
import ProfileCard from "./ProfileCard";
import { useQuery, useMutation } from "@apollo/client";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import convertToThaiDate from "../../hooks/convertToThaiDate";
import Alert from "../Alert/Alert";
import Submit from "../Submit/Submit";
import Guide from "../../models/Guide";
import useGuideApi from "../../hooks/guidehooks";
import LanguageSkill from "../../models/LanguageSkill";
import Image from "material-ui-image";
import WorkExp from "../../models/WorkExp";

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
      paddingTop: "3%",
      paddingBottom: "3%",
    },
    margin: {
      margin: theme.spacing(1),
      padding: theme.spacing(1, 0, 1),
    },
    cancel: {
      backgroundColor: "#EA4A4A",
      color: "white",
    },
    wait: {
      backgroundColor: "#4884E6",
      color: "white",
    },
    status: {
      paddingTop: "2%",
    },
  })
);

function ProfilePage() {
  const classes = useStyles();
  const accessToken = localStorage.getItem("accessToken");
  const id = localStorage.getItem("_id");

  const {
    GET_SINGLE_GUIDE,
    UPDATE_GUIDE,
    UPLOAD_PROFILE,
    UPLOAD_CERTIFICATE,
    UPLOAD_FACEWITHIDCARD,
  } = useGuideApi();

  const { loading, error, data, refetch } = useQuery(GET_SINGLE_GUIDE, {
    variables: { getGuideId: id },
  });

  const [user, setUser] = useState<Guide | undefined>(
    data !== undefined ? data.getGuide : undefined
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

  useEffect(() => {
    if (!loading && data) {
      setUser(data.getGuide);
      setFirstName(data.getGuide?.FirstName);
      setLastName(data.getGuide?.LastName);
      setDOB(data.getGuide?.DOB);
      setAddress(data.getGuide.Address);
      setContactAddress(data.getGuide.ContactAddress);
      setPhoneNum(data.getGuide?.PhoneNumber);
      setEmail(data.getGuide?.Email);
      setGender(data.getGuide?.Gender);
      setAvatar(undefined);
      setIdCardPic(undefined);
      setEducation(undefined);
      setDisplayImg(
        data.getGuide.FaceWithIdCard !== null &&
          data.getGuide.FaceWithIdCard !== undefined
          ? `data:${data.getGuide?.FaceWithIdCardtar?.mimetype};base64,${data.getGuide?.FaceWithIdCard?.data}`
          : `data:${undefined};base64,${undefined}`
      );
      setDisplayCerImg(
        data.getGuide.Education.Certificate !== null &&
          data.getGuide.Education.Certificate !== undefined
          ? `data:${data.getGuide?.Education.Certificate?.mimetype};base64,${data.getGuide?.Education.Certificate?.data}`
          : `data:${undefined};base64,${undefined}`
      );
      const filterLangskill = data.getGuide.LangSkill.map((data: any) => {
        return { Language: data.Language, Level: data.Level };
      });
      setLangSkill(filterLangskill);
      setIdCard(data.getGuide.IdCard);
      setDegree(data.getGuide.Education.Degree);
      setAcadamy(data.getGuide.Education.Acadamy);
      const filterWorkExp = data.getGuide.WorkExp.map((data: any) => {
        return { JobTitle: data.JobTitle, WorkPlace: data.WorkPlace };
      });
      setWorkExp(filterWorkExp);
      setProfile(
        data.getGuide?.Avatar !== null
          ? `data:${data.getGuide?.Avatar?.mimetype};base64,${data.getGuide?.Avatar?.data}`
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
  const [address, setAddress] = useState<string | undefined>(user?.Address);
  const [contactAddress, setContactAddress] = useState<string | undefined>(
    user?.ContactAddress
  );
  const [idCard, setIdCard] = useState<string | undefined>(user?.IdCard);
  const [email, setEmail] = useState<string | undefined>(user?.Email);
  const [gender, setGender] = useState<string | undefined>(user?.Gender);
  const [avatar, setAvatar] = useState<any | undefined>(undefined);
  const [profile, setProfile] = useState<any | undefined>(
    user?.Avatar !== null
      ? `data:${user?.Avatar?.mimetype};base64,${user?.Avatar?.data}`
      : `data:${undefined};base64,${undefined}`
  );
  const [degree, setDegree] = useState<string | undefined>(
    user?.Education.Degree
  );
  const [acadamy, setAcadamy] = useState<string | undefined>(
    user?.Education.Acadamy
  );
  const [langSkill, setLangSkill] = useState<LanguageSkill[]>(
    user?.LangSkill !== undefined ? user.LangSkill : []
  );
  const [idCardPic, setIdCardPic] = useState<any | undefined>(undefined);
  const [education, setEducation] = useState<any | undefined>(undefined);
  const [same, setSame] = useState<boolean>(
    user?.Address === user?.ContactAddress
  );

  useEffect(() => {
    if (accessToken === null || id === null) {
      history.push("/");
    }
  }, [accessToken, id]);

  const [confirmEdit, setConfirmEdit] = useState<boolean>(false);
  const [alert, setAlert] = useState<boolean>(false);
  const [alertData, setAlertData] = useState<boolean>(false);
  const [newLang, setNewLang] = useState<string>("");
  const [newLevel, setNewLevel] = useState<number>();
  const [langAlert, setLangAlert] = useState<boolean>(false);
  const [displayImg, setDisplayImg] = useState<any>(
    user?.FaceWithIdCard !== null && user?.FaceWithIdCard !== undefined
      ? `data:${user?.FaceWithIdCard?.mimetype};base64,${user?.FaceWithIdCard?.data}`
      : `data:${undefined};base64,${undefined}`
  );
  const [displayCerImg, setDisplayCerImg] = useState<any>(
    user?.Education.Certificate !== null &&
      user?.Education.Certificate !== undefined
      ? `data:${user?.Education.Certificate?.mimetype};base64,${user?.Education.Certificate?.data}`
      : `data:${undefined};base64,${undefined}`
  );
  const [workExp, setWorkExp] = useState<WorkExp[]>(
    user?.WorkExp !== undefined ? user?.WorkExp : []
  );
  const [newTitle, setNewTitle] = useState<string>("");
  const [newWorkPlace, setNewWorkPlace] = useState<string>("");
  const [duplicate, setDuplicate] = useState<boolean>(false);
  const [hasExp, setHasExp] = useState<boolean>(user?.WorkExp?.length !== 0);

  const addWork = () => {
    if (newTitle !== "" && newWorkPlace !== "") {
      let newExp: WorkExp = {
        JobTitle: newTitle,
        WorkPlace: newWorkPlace,
      };
      if (workExp?.find((e) => e === newExp)) {
        setDuplicate(true);
      } else {
        setWorkExp((w) => [...w, newExp]);
        setNewTitle("");
        setNewWorkPlace("");
      }
    }
  };

  const deleteWork = (w: WorkExp) => {
    setWorkExp(workExp.filter((e) => e !== w));
  };

  const handleChangeExp = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasExp(
      (event.target as HTMLInputElement).value === "true" ? true : false
    );
  };

  const uploadFile = async (e: any, t: string) => {
    const file = e.target.files[0];

    const base64 = await convertBase64(file);

    if (t === "id") {
      setIdCardPic(file);
    } else if (t === "cer") {
      setEducation(file);
    } else if (t === "avatar") {
      setAvatar(file);
    }

    if (t === "id") {
      setDisplayImg(base64);
    } else if (t === "cer") {
      setDisplayCerImg(base64);
    } else if (t === "avatar") {
      setProfile(base64);
    }
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

  const [updateProfile, { loading: mutationLoading, error: mutationError }] =
    useMutation(UPDATE_GUIDE, {
      onCompleted: (data) => {
        console.log(data);
      },
    });

  const [
    uploadProfileImg,
    { loading: mutationProfileLoading, error: mutationProfileError },
  ] = useMutation(UPLOAD_PROFILE, {
    onCompleted: (data) => {
      console.log(data);
    },
  });

  const [
    uploadProfileCer,
    { loading: mutationCerLoading, error: mutationCerError },
  ] = useMutation(UPLOAD_CERTIFICATE, {
    onCompleted: (data) => {
      console.log(data);
    },
  });

  const [
    uploadProfileFacewuthId,
    { loading: mutationIdLoading, error: mutationIdError },
  ] = useMutation(UPLOAD_FACEWITHIDCARD, {
    onCompleted: (data) => {
      console.log(data);
    },
  });

  const [failed, setFailed] = useState<boolean>(false);

  const editProfile = async () => {
    setConfirmEdit(false);
    if (
      firstName !== "" &&
      lastName !== "" &&
      dob !== undefined &&
      phoneNum !== "" &&
      gender !== undefined &&
      email !== "" &&
      address !== "" &&
      contactAddress !== "" &&
      idCard !== "" &&
      acadamy !== ""
    ) {
      await updateProfile({
        variables: {
          id: id,
          input: {
            FirstName: firstName,
            LastName: lastName,
            Gender: gender,
            DOB: dob,
            Address: address,
            ContactAddress: contactAddress,
            PhoneNumber: phoneNum,
            Education: {
              Degree: degree,
              Acadamy: acadamy,
            },
            WorkExp: workExp,
            LangSkill: langSkill,
            IdCard: idCard,
          },
        },
        refetchQueries: [
          {
            query: GET_SINGLE_GUIDE,
            variables: { getGuideId: id },
          },
        ],
      });

      if (avatar !== undefined) {
        await uploadProfileImg({
          variables: {
            guideId: id,
            file: avatar,
          },
        });
      }
      if (idCardPic !== undefined) {
        await uploadProfileFacewuthId({
          variables: {
            uploadFaceWithIdcardGuideGuideId: id,
            uploadFaceWithIdcardGuideFile: idCardPic,
          },
        });
      }
      if (education !== undefined) {
        await uploadProfileCer({
          variables: {
            guideId: id,
            file: education,
          },
        });
      }

      refetch();

      while (
        mutationCerLoading ||
        mutationIdLoading ||
        mutationProfileLoading ||
        mutationLoading
      ) {}

      if (
        mutationCerError ||
        mutationIdError ||
        mutationProfileError ||
        mutationError
      ) {
        if (mutationCerError) {
          console.log(mutationCerError?.graphQLErrors);
        }
        if (mutationIdError) {
          console.log(mutationIdError?.graphQLErrors);
        }
        if (mutationProfileError) {
          console.log(mutationProfileError?.graphQLErrors);
        }
        if (mutationError) {
          console.log(mutationError?.graphQLErrors);
        }
        setFailed(true);
      } else {
        setAlert(true);
        setEdit(false);
      }
    } else {
      setAlertData(true);
    }
  };

  const addLang = () => {
    if (newLang !== "" && newLevel !== undefined) {
      let newSkill: LanguageSkill = {
        Language: newLang,
        Level: newLevel,
      };
      if (langSkill?.find((l) => l.Language === newSkill.Language)) {
        setLangAlert(true);
      } else {
        setLangSkill((l) => [...l, newSkill]);
        setNewLang("");
        setNewLevel(undefined);
      }
    }
  };

  const deleteLang = (m: LanguageSkill) => {
    setLangSkill(langSkill?.filter((l) => l !== m));
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
          setEdit(false);
          setClose(false);
        }}
      />
      <Backdrop
        open={
          mutationCerLoading ||
          mutationIdLoading ||
          mutationProfileLoading ||
          mutationLoading
        }
      >
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
              {edit && user?.Status.Tag !== "Wait to verify" ? (
                <Grid item xs={12} md={10} lg={8} className={classes.status}>
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justify="flex-start"
                  >
                    <Grid item xs={12}>
                      <Typography align="center">
                        <input
                          type="file"
                          accept="image/*"
                          id="contained-button-0-file"
                          onChange={(e: any) => {
                            uploadFile(e, "avatar");
                          }}
                          hidden
                        />
                        <label htmlFor="contained-button-0-file">
                          <Button
                            component="span"
                            style={{
                              backgroundColor: "#508F7F",
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
                        {avatar !== undefined && " อัปโหลดสำเร็จ"}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              ) : (
                <>
                  {!user?.IsVerified ? (
                    <Grid
                      item
                      xs={12}
                      md={10}
                      lg={8}
                      className={classes.status}
                    >
                      <Grid
                        container
                        direction="row"
                        spacing={2}
                        alignItems="center"
                        justify="center"
                      >
                        {user?.Status.Tag === "Verify Failed" ? (
                          <>
                            <Grid item>
                              <Chip
                                size="small"
                                icon={<Error style={{ color: "white" }} />}
                                label="ไม่ผ่านการอนุมัติ"
                                className={classes.cancel}
                              />
                            </Grid>
                            <Grid item>
                              <Typography color="textSecondary">
                                {user?.Status.Details}
                              </Typography>
                            </Grid>
                          </>
                        ) : (
                          <Grid item>
                            <Chip
                              size="small"
                              icon={<Timer style={{ color: "white" }} />}
                              label="รอการอนุมัติ"
                              className={classes.wait}
                            />
                          </Grid>
                        )}
                      </Grid>
                    </Grid>
                  ) : (
                    <Grid
                      item
                      xs={12}
                      md={10}
                      lg={8}
                      className={classes.status}
                    >
                      <Grid
                        container
                        direction="row"
                        spacing={2}
                        alignItems="center"
                        justify="center"
                      >
                        <Grid item>
                          <Grid
                            container
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            justify="center"
                          >
                            <Grid item>
                              <Star style={{ color: "#FFC300" }} />
                            </Grid>
                            <Grid item>
                              <Typography variant="body1">
                                {" "}
                                {user?.Rating !== null && user?.Rating !== 0
                                  ? user?.Rating
                                  : "new guide"}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Grid
                            container
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            justify="center"
                          >
                            <Grid item>
                              <Typography variant="body1">
                                <Payment />
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography variant="body1">
                                Tips: {user.Tips} บาท/ชั่วโมง
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Divider variant="middle" />
                    </Grid>
                  )}
                </>
              )}
              <Grid item xs={12} md={10} lg={8}>
                <form className={classes.form}>
                  {edit ? (
                    <>
                      <Divider variant="middle" />
                      <div className={classes.margin}>
                        <Grid item xs={12}>
                          <Typography variant="h4">Profile</Typography>
                          <Typography variant="subtitle2" color="textSecondary">
                            ข้อมูลส่วนตัว
                          </Typography>
                        </Grid>
                      </div>
                      <div className={classes.margin}>
                        <Grid
                          container
                          spacing={2}
                          justify="center"
                          alignItems="flex-end"
                        >
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
                        <Grid
                          container
                          spacing={2}
                          justify="center"
                          alignItems="flex-end"
                        >
                          <Grid item>
                            <Wc />
                          </Grid>
                          <Grid item xs={10}>
                            <FormControl required fullWidth={true}>
                              <InputLabel
                                id="gender-label"
                                shrink={gender !== undefined}
                              >
                                เพศ
                              </InputLabel>
                              <Select
                                labelId="gender-label"
                                value={gender}
                                onChange={(e) =>
                                  setGender(e.target.value as string)
                                }
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
                        <Grid
                          container
                          spacing={2}
                          justify="center"
                          alignItems="flex-end"
                        >
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
                        <Grid
                          container
                          spacing={2}
                          justify="center"
                          alignItems="flex-end"
                        >
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
                      <Divider variant="middle" />
                      <div className={classes.margin}>
                        <Grid item xs={12}>
                          <Typography variant="h4">Identity Card</Typography>
                          <Typography variant="subtitle2" color="textSecondary">
                            บัตรประจำตัวประชาชน
                          </Typography>
                        </Grid>
                      </div>
                      <div className={classes.margin}>
                        <Grid
                          container
                          spacing={2}
                          justify="center"
                          alignItems="flex-end"
                        >
                          <Grid item>
                            <Fingerprint />
                          </Grid>
                          <Grid item xs={10}>
                            <TextField
                              id="input-with-icon-grid"
                              label="เลขประจำตัวประชาชน"
                              fullWidth={true}
                              value={idCard}
                              onChange={(e) => setIdCard(e.target.value)}
                              type="text"
                              required
                            />
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
                          <Grid item>
                            <AttachFile />
                          </Grid>
                          <Grid item xs={10}>
                            <Typography variant="body1">
                              แนบรูปคู่บัตรประจำตัวประชาชน
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={4}
                            md={3}
                            lg={2}
                            style={{ backgroundColor: "#EFEFEF" }}
                          >
                            <Image src={displayImg} />
                          </Grid>
                          <Grid item xs={6}>
                            <Typography align="left">
                              <input
                                type="file"
                                accept="image/*"
                                id="contained-button-file"
                                onChange={(e: any) => {
                                  uploadFile(e, "id");
                                }}
                                hidden
                              />
                              <label htmlFor="contained-button-file">
                                <Button
                                  component="span"
                                  style={{
                                    backgroundColor: "#508F7F",
                                    color: "white",
                                  }}
                                >
                                  อัปโหลด
                                </Button>
                              </label>
                              {idCardPic !== undefined && " อัปโหลดสำเร็จ"}
                            </Typography>
                          </Grid>
                        </Grid>
                      </div>
                      <Divider variant="middle" />
                      <div className={classes.margin}>
                        <Grid item xs={12}>
                          <Typography variant="h4">Education</Typography>
                          <Typography variant="subtitle2" color="textSecondary">
                            ข้อมูลการศึกษา
                          </Typography>
                        </Grid>
                      </div>
                      <div className={classes.margin}>
                        <Grid
                          container
                          spacing={2}
                          justify="center"
                          alignItems="flex-end"
                        >
                          <Grid item>
                            <Book />
                          </Grid>
                          <Grid item xs={10}>
                            <FormControl required fullWidth={true}>
                              <InputLabel
                                id="degree-label"
                                shrink={degree !== undefined}
                              >
                                ระดับการศึกษา
                              </InputLabel>
                              <Select
                                labelId="degree-label"
                                value={degree}
                                onChange={(e) =>
                                  setDegree(e.target.value as string)
                                }
                                fullWidth={true}
                                required
                              >
                                <MenuItem value={undefined} disabled>
                                  ระดับการศึกษา
                                </MenuItem>
                                <MenuItem value="ต่ำกว่ามัธยมศึกษาตอนต้น">
                                  ต่ำกว่ามัธยมศึกษาตอนต้น
                                </MenuItem>
                                <MenuItem value="มัธยมศึกษาตอนต้น">
                                  มัธยมศึกษาตอนต้น
                                </MenuItem>
                                <MenuItem value="มัธยมศึกษาตอนปลายหรือเทียบเท่า">
                                  มัธยมศึกษาตอนปลายหรือเทียบเท่า
                                </MenuItem>
                                <MenuItem value="อุดมศึกษาหรือเทียบเท่า">
                                  อุดมศึกษาหรือเทียบเท่า
                                </MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </div>
                      <div className={classes.margin}>
                        <Grid
                          container
                          spacing={2}
                          justify="center"
                          alignItems="flex-end"
                        >
                          <Grid item>
                            <School />
                          </Grid>
                          <Grid item xs={10}>
                            <TextField
                              id="input-with-icon-grid"
                              label="สถาบันการศึกษา"
                              fullWidth={true}
                              value={acadamy}
                              onChange={(e) => setAcadamy(e.target.value)}
                              type="text"
                              required
                            />
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
                          <Grid item>
                            <AttachFile />
                          </Grid>
                          <Grid item xs={10}>
                            <Typography variant="body1">
                              แนบหลักฐานทางการศึกษา
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={4}
                            md={3}
                            lg={2}
                            style={{ backgroundColor: "#EFEFEF" }}
                          >
                            <Image src={displayCerImg} />
                          </Grid>
                          <Grid item xs={6}>
                            <Typography align="left">
                              <input
                                type="file"
                                accept="image/*"
                                id="contained-button-2-file"
                                onChange={(e: any) => {
                                  uploadFile(e, "cer");
                                }}
                                hidden
                              />
                              <label htmlFor="contained-button-2-file">
                                <Button
                                  component="span"
                                  style={{
                                    backgroundColor: "#508F7F",
                                    color: "white",
                                  }}
                                >
                                  อัปโหลด
                                </Button>
                              </label>
                              {education !== undefined && " อัปโหลดสำเร็จ"}
                            </Typography>
                          </Grid>
                        </Grid>
                      </div>
                      <Divider variant="middle" />
                      <div className={classes.margin}>
                        <Grid item xs={12}>
                          <Typography variant="h4">Language Skills</Typography>
                          <Typography variant="subtitle2" color="textSecondary">
                            ทักษะทางด้านภาษา
                          </Typography>
                        </Grid>
                      </div>
                      <div className={classes.margin}>
                        <Grid
                          container
                          spacing={1}
                          justify="center"
                          alignItems="center"
                        >
                          {langSkill.map((m) => {
                            return (
                              <>
                                <Grid item xs={4}>
                                  <TextField
                                    id="input-with-icon-grid"
                                    label="ชื่อภาษา"
                                    fullWidth={true}
                                    value={m.Language}
                                    disabled={true}
                                    type="text"
                                  />
                                </Grid>
                                <Grid item xs={4}>
                                  <TextField
                                    id="input-with-icon-grid"
                                    label="ความชำนาญ"
                                    fullWidth={true}
                                    value={"ระดับ " + m.Level}
                                    disabled={true}
                                    type="text"
                                  />
                                </Grid>
                                <Grid item xs={2}>
                                  <Button
                                    type="button"
                                    onClick={() => deleteLang(m)}
                                    style={{
                                      padding: 0,
                                      color: "white",
                                      backgroundColor: "black",
                                    }}
                                  >
                                    ลบ
                                  </Button>
                                </Grid>
                              </>
                            );
                          })}
                        </Grid>
                        <Grid
                          container
                          spacing={2}
                          justify="center"
                          alignItems="flex-end"
                        >
                          <Grid item xs={5} md={4} lg={4}>
                            <TextField
                              id="input-with-icon-grid"
                              label="ชื่อภาษา"
                              fullWidth={true}
                              value={newLang}
                              onChange={(e) => setNewLang(e.target.value)}
                              InputLabelProps={{
                                shrink: newLang !== "",
                              }}
                              type="text"
                            />
                          </Grid>
                          <Grid item xs={5} md={4} lg={4}>
                            <FormControl required fullWidth={true}>
                              <InputLabel
                                id="level-label"
                                shrink={newLevel !== undefined}
                              >
                                ความชำนาญ
                              </InputLabel>
                              <Select
                                labelId="level-label"
                                value={newLevel !== undefined ? newLevel : null}
                                onChange={(e) =>
                                  setNewLevel(e.target.value as number)
                                }
                                fullWidth={true}
                              >
                                <MenuItem value={undefined} disabled>
                                  ความชำนาญ
                                </MenuItem>
                                <MenuItem value={1}>
                                  ระดับ 1 สนทนาได้เล็กน้อย
                                </MenuItem>
                                <MenuItem value={2}>ระดับ 2 สนทนาได้</MenuItem>
                                <MenuItem value={3}>
                                  ระดับ 3 สนทนาและอ่านเขียนได้
                                </MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={11} md={2} lg={1}>
                            <Typography align="center">
                              <Button
                                type="button"
                                fullWidth={true}
                                onClick={addLang}
                                style={{
                                  color: "white",
                                  backgroundColor: "#508F7F",
                                }}
                              >
                                เพิ่ม
                              </Button>
                            </Typography>
                          </Grid>
                        </Grid>
                      </div>

                      <Alert
                        closeAlert={() => setLangAlert(false)}
                        alert={langAlert}
                        title="ภาษาซ้ำ"
                        text="มีภาษานี้อยู่ในรายการแล้ว"
                        buttonText="รับทราบ"
                      />
                      <Divider variant="middle" />
                      <div className={classes.margin}>
                        <Grid item xs={12}>
                          <Typography variant="h4">Work Experiences</Typography>
                          <Typography variant="subtitle2" color="textSecondary">
                            ประสบการณ์การทำงาน
                          </Typography>
                        </Grid>
                      </div>
                      <div className={classes.margin}>
                        <Grid
                          container
                          spacing={1}
                          justify="center"
                          alignItems="center"
                        >
                          <Grid item>
                            {/* <Typography variant="h6"> */}
                            <AssignmentInd />
                            {/* </Typography> */}
                          </Grid>
                          <Grid item xs={10}>
                            <Typography variant="body1">
                              คุณมีประสบการณ์การทำงานหรือไม่?
                            </Typography>
                          </Grid>
                        </Grid>
                        <FormControl component="fieldset" fullWidth={true}>
                          <RadioGroup
                            name="exp"
                            value={hasExp}
                            onChange={handleChangeExp}
                          >
                            <Grid
                              container
                              direction="row"
                              justify="space-evenly"
                              alignItems="flex-end"
                            >
                              <Grid item xs={5} md={4} lg={4}>
                                <FormControlLabel
                                  value={false}
                                  control={<Radio style={{ color: "black" }} />}
                                  label={
                                    <>
                                      <Typography variant="body2">
                                        ไม่มี
                                      </Typography>
                                    </>
                                  }
                                />
                              </Grid>
                              <Grid item xs={5} md={4} lg={4}>
                                <FormControlLabel
                                  value={true}
                                  control={<Radio style={{ color: "black" }} />}
                                  label={
                                    <>
                                      <Typography variant="body2">
                                        มี
                                      </Typography>
                                    </>
                                  }
                                />
                              </Grid>
                            </Grid>
                          </RadioGroup>
                        </FormControl>
                      </div>
                      {hasExp && (
                        <>
                          <div className={classes.margin}>
                            <Grid
                              container
                              spacing={1}
                              justify="center"
                              alignItems="center"
                            >
                              <Grid item>
                                {/* <Typography variant="h6"> */}
                                <Work />
                                {/* </Typography> */}
                              </Grid>
                              <Grid item xs={10}>
                                <Typography variant="body1">
                                  ประสบการณ์การทำงาน
                                </Typography>
                              </Grid>
                            </Grid>
                            <Grid
                              container
                              spacing={1}
                              justify="center"
                              alignItems="center"
                            >
                              {workExp.map((m) => {
                                return (
                                  <>
                                    <Grid item xs={4}>
                                      <TextField
                                        id="input-with-icon-grid"
                                        label="ตำแหน่งงาน"
                                        fullWidth={true}
                                        value={m.JobTitle}
                                        disabled={true}
                                        type="text"
                                      />
                                    </Grid>
                                    <Grid item xs={4}>
                                      <TextField
                                        id="input-with-icon-grid"
                                        label="สถานที่ทำงาน"
                                        fullWidth={true}
                                        value={m.WorkPlace}
                                        disabled={true}
                                        type="text"
                                      />
                                    </Grid>
                                    <Grid item xs={2}>
                                      <Button
                                        type="button"
                                        onClick={() => deleteWork(m)}
                                        style={{
                                          padding: 0,
                                          backgroundColor: "black",
                                          color: "white",
                                        }}
                                      >
                                        ลบ
                                      </Button>
                                    </Grid>
                                  </>
                                );
                              })}
                            </Grid>
                            <Grid
                              container
                              spacing={2}
                              justify="center"
                              alignItems="flex-end"
                            >
                              <Grid item xs={5} md={4} lg={4}>
                                <TextField
                                  id="input-with-icon-grid"
                                  label="ตำแหน่งงาน"
                                  fullWidth={true}
                                  value={newTitle}
                                  onChange={(e) => setNewTitle(e.target.value)}
                                  type="text"
                                  InputLabelProps={{
                                    shrink: newTitle !== "",
                                  }}
                                />
                              </Grid>
                              <Grid item xs={5} md={4} lg={4}>
                                <TextField
                                  id="input-with-icon-grid"
                                  label="สถานที่ทำงาน"
                                  fullWidth={true}
                                  value={newWorkPlace}
                                  onChange={(e) =>
                                    setNewWorkPlace(e.target.value)
                                  }
                                  type="text"
                                  InputLabelProps={{
                                    shrink: newWorkPlace !== "",
                                  }}
                                />
                              </Grid>
                              <Grid item xs={11} md={2} lg={1}>
                                <Typography align="center">
                                  <Button
                                    type="button"
                                    fullWidth={true}
                                    onClick={addWork}
                                    style={{
                                      color: "white",
                                      backgroundColor: "#508F7F",
                                    }}
                                  >
                                    เพิ่ม
                                  </Button>
                                </Typography>
                              </Grid>
                            </Grid>
                          </div>
                        </>
                      )}
                      <Divider variant="middle" />
                      <div className={classes.margin}>
                        <Grid item xs={12}>
                          <Typography variant="h4">Contact</Typography>
                          <Typography variant="subtitle2" color="textSecondary">
                            ช่องทางการติดต่อ
                          </Typography>
                        </Grid>
                      </div>
                      <div className={classes.margin}>
                        <Grid
                          container
                          spacing={2}
                          justify="center"
                          alignItems="flex-end"
                        >
                          <Grid item>
                            <Business />
                          </Grid>
                          <Grid item xs={10}>
                            <TextField
                              id="input-with-icon-grid"
                              label="ที่อยู่ปัจจุบัน"
                              fullWidth={true}
                              value={contactAddress}
                              onChange={(e) =>
                                setContactAddress(e.target.value)
                              }
                              InputLabelProps={{
                                shrink: contactAddress !== undefined,
                              }}
                              type="text"
                              disabled={same}
                              required
                            />
                          </Grid>
                          <Grid item xs={2}></Grid>
                          <Grid item xs={10} style={{ padding: 0 }}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={same}
                                  onChange={() => {
                                    if (!same) {
                                      setContactAddress(address);
                                    }
                                    setSame((s) => !s);
                                  }}
                                  style={{ color: "#508F7F" }}
                                />
                              }
                              label="ที่อยู่เดียวกับข้อมูลบนบัตรประชาชน"
                            />
                          </Grid>
                        </Grid>
                      </div>
                      <div className={classes.margin}>
                        <Grid
                          container
                          spacing={2}
                          justify="center"
                          alignItems="flex-end"
                        >
                          <Grid item>
                            <PhoneAndroid />
                          </Grid>
                          <Grid item xs={10}>
                            <TextField
                              id="input-with-icon-grid"
                              label="เบอร์โทรศัพท์มือถือ"
                              fullWidth={true}
                              value={phoneNum}
                              onChange={(e) => setPhoneNum(e.target.value)}
                              required
                              type="text"
                            />
                          </Grid>
                        </Grid>
                      </div>
                      <div className={classes.margin}>
                        <Grid
                          container
                          spacing={2}
                          justify="center"
                          alignItems="flex-end"
                        >
                          <Grid item>
                            <Email />
                          </Grid>
                          <Grid item xs={10}>
                            <TextField
                              id="input-with-icon-grid"
                              label="อีเมล์"
                              fullWidth={true}
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              type="email"
                              required
                            />
                          </Grid>
                        </Grid>
                      </div>
                      <Alert
                        closeAlert={() => setDuplicate(false)}
                        alert={duplicate}
                        title="งานซ้ำ"
                        text="มีงานนี้อยู่ในรายการแล้ว"
                        buttonText="รับทราบ"
                      />
                    </>
                  ) : (
                    <>
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
                          <Grid item xs={10}>
                            <Typography variant="body1">
                              ชื่อ: {user?.FirstName} {user?.LastName}
                            </Typography>
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
                              <Wc />
                            </Typography>
                          </Grid>
                          <Grid item xs={10}>
                            <Typography variant="body1">
                              เพศ:{" "}
                              {user?.Gender === "male"
                                ? "ชาย"
                                : user?.Gender === "female"
                                ? "หญิง"
                                : "อื่น ๆ"}
                            </Typography>
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
                            <Typography variant="body1">
                              วันเกิด: {convertToThaiDate(new Date(user?.DOB))}
                            </Typography>
                          </Grid>
                        </Grid>
                      </div>
                      <div className={classes.margin}>
                        <Grid
                          container
                          spacing={2}
                          justify="center"
                          alignItems="flex-start"
                        >
                          <Grid item xs={2}>
                            <Typography align={"center"}>
                              <Language />
                            </Typography>
                          </Grid>

                          <Grid item xs={10}>
                            <Typography variant="body1">
                              ทักษะทางด้านภาษา: {<br />}
                              {user?.LangSkill.map((l, k) => {
                                return (
                                  <>
                                    {k !== 0 && ", "}
                                    {l.Language}(
                                    {l.Level === 1
                                      ? "สนทนาได้ไม่คล่อง"
                                      : l.Level === 2
                                      ? "สนทนาได้"
                                      : "สนทนาและอ่านเขียนได้"}
                                    )
                                  </>
                                );
                              })}
                            </Typography>
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
                            <Typography variant="body1">
                              เบอร์โทร: {user?.PhoneNumber[0]}
                              {user?.PhoneNumber[1]}
                              {user?.PhoneNumber[2]}-{user?.PhoneNumber[3]}
                              {user?.PhoneNumber[4]}
                              {user?.PhoneNumber[5]}-{user?.PhoneNumber[6]}
                              {user?.PhoneNumber[7]}
                              {user?.PhoneNumber[8]}
                              {user?.PhoneNumber[9]}
                            </Typography>
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
                            <Typography variant="body1">
                              อีเมล์: {user?.Email}
                            </Typography>
                          </Grid>
                        </Grid>
                      </div>
                    </>
                  )}
                </form>
                {/* <div className={classes.margin}> */}
                {user?.Status.Tag !== "Wait for verify" && (
                  <>
                    <Divider variant="middle" />
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                      style={{ padding: "3%" }}
                    >
                      <Grid item>
                        {edit && (
                          <Button
                            onClick={() => setClose(true)}
                            type="button"
                            fullWidth={true}
                            style={{
                              backgroundColor: "#D86060",
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
                            fullWidth={true}
                            style={{
                              backgroundColor: "#4CB85C",
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
                              backgroundColor: "#508F7F",
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
                              <Typography variant="body1">
                                แก้ไขข้อมูล
                              </Typography>
                            </Grid>
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  </>
                )}
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
