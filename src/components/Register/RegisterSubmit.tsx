import {
  Button,
  createStyles,
  Divider,
  Fab,
  FormControl,
  FormControlLabel,
  Grid,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import {
  Person,
  Wc,
  Cake,
  Email,
  PhoneAndroid,
  Home,
  Book,
  School,
  Work,
  NavigateBefore,
  AssignmentInd,
  AttachFile,
  Business,
  Fingerprint,
} from "@material-ui/icons";
import GuideForm from "../../models/GuideForm";
import Image from "material-ui-image";
import convertToThaiDate from "../../hooks/convertToThaiDate";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: "100vh",
    },
    sub: {
      minHeight: "15vh",
    },
    main: {
      minHeight: "70vh",
      paddingRight: "5%",
      paddingLeft: "5%",
      minWidth: "80vw",
      maxWidth: "100vw",
    },
    form: {
      paddingTop: "5%",
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
  user: GuideForm;
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
    setStep(5);
  };

  return (
    <Grid>
      <form className={classes.form}>
        <Grid
          container
          direction="row"
          alignItems="flex-start"
          justify="space-between"
        >
          <Grid item xs={8}>
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
                  6
                </Fab>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h4">Submit</Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  ยืนยันการลงทะเบียน
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* <Typography variant="h4">ยืนยันการลงทะเบียน</Typography> */}
        <div className={classes.margin}>
          <Grid item xs={12}>
            <Typography variant="h4">Profile</Typography>
            <Typography variant="subtitle2" color="textSecondary">
              ข้อมูลส่วนตัว
            </Typography>
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={2} justify="center" alignItems="flex-end">
            <Grid item xs={5} md={4} lg={3} style={{ backgroundColor: "#EFEFEF" }}>
              <Image src={displayImg} cover={true} loading={displayImg === undefined ? false : true}/>
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
                disabled
                type="text"
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                id="input-with-icon-grid"
                label="นามสกุล"
                fullWidth={true}
                value={user.LastName}
                disabled
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
              <TextField
                id="input-with-icon-grid"
                label="เพศ"
                fullWidth={true}
                value={
                  user.Gender === "male"
                    ? "ชาย"
                    : user?.Gender === "female"
                    ? "หญิง"
                    : "อื่น ๆ"
                }
                disabled
                type="text"
              />
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
                id="input-with-icon-grid"
                label="วันเกิด"
                fullWidth={true}
                value={convertToThaiDate(new Date(user.DOB))}
                disabled
                type="text"
              />
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
                value={user.Address}
                disabled
                type="text"
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
          <Grid container spacing={2} justify="center" alignItems="flex-end">
            <Grid item>
              <Fingerprint />
            </Grid>
            <Grid item xs={10}>
              <TextField
                id="input-with-icon-grid"
                label="เลขประจำตัวประชาชน"
                fullWidth={true}
                value={user.IdCard}
                disabled
                type="text"
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={2} justify="center" alignItems="center">
            <Grid item>
              <AttachFile />
            </Grid>
            <Grid item xs={10}>
              <Typography variant="body1">
                แนบรูปคู่บัตรประจำตัวประชาชน
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="center">
                {user.FaceWithIdCard !== undefined
                  ? " อัปโหลดสำเร็จ"
                  : " ยังไม่ได้อัปโหลด"}
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
          <Grid container spacing={2} justify="center" alignItems="flex-end">
            <Grid item>
              <Book />
            </Grid>
            <Grid item xs={10}>
              <TextField
                id="input-with-icon-grid"
                label="ระดับการศึกษา"
                fullWidth={true}
                value={user.Education?.Degree}
                disabled
                type="text"
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={2} justify="center" alignItems="flex-end">
            <Grid item>
              <School />
            </Grid>
            <Grid item xs={10}>
              <TextField
                id="input-with-icon-grid"
                label="สถาบันการศึกษา"
                fullWidth={true}
                value={user.Education?.Acadamy}
                disabled
                type="text"
              />
            </Grid>
          </Grid>
        </div>

        <div className={classes.margin}>
          <Grid container spacing={2} justify="center" alignItems="center">
            <Grid item>
              <AttachFile />
            </Grid>
            <Grid item xs={10}>
              <Typography variant="body1">แนบหลักฐานทางการศึกษา</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="center">
                {user.Education?.Certificate !== undefined
                  ? " อัปโหลดสำเร็จ"
                  : " ยังไม่ได้อัปโหลด"}
              </Typography>
            </Grid>
          </Grid>
        </div>
        {user.LangSkill?.length !== 0 && user.LangSkill !== undefined && (
          <>
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
            <Grid container spacing={1} justify="center" alignItems="center">
              {user?.LangSkill.map((m) => {
                return (
                  <>
                    <Grid item xs={5}>
                      <TextField
                        id="input-with-icon-grid"
                        label="ชื่อภาษา"
                        fullWidth={true}
                        value={m.Language}
                        disabled={true}
                        type="text"
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <TextField
                        id="input-with-icon-grid"
                        label="ความชำนาญ"
                        fullWidth={true}
                        value={"ระดับ " + m.Level}
                        disabled={true}
                        type="text"
                      />
                    </Grid>
                  </>
                );
              })}
            </Grid>
          </div>
          </>
        )}
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
          <Grid container spacing={1} justify="center" alignItems="center">
            <Grid item>
              <AssignmentInd />
            </Grid>
            <Grid item xs={10}>
              <Typography variant="body1">
                คุณมีประสบการณ์การทำงานหรือไม่?
              </Typography>
            </Grid>
          </Grid>
          <FormControl component="fieldset" fullWidth={true}>
            <RadioGroup name="exp" value={user.WorkExp?.length !== 0}>
              <Grid
                container
                direction="row"
                justify="space-evenly"
                alignItems="flex-end"
              >
                <Grid item xs={5} md={4} lg={4}>
                  <FormControlLabel
                    value={false}
                    control={<Radio style={{ color: "black" }} disabled/>}
                    label={
                      <>
                        <Typography variant="body2">ไม่มี</Typography>
                      </>
                    }
                  />
                </Grid>
                <Grid item xs={5} md={4} lg={4}>
                  <FormControlLabel
                    value={true}
                    control={<Radio style={{ color: "black" }} disabled/>}
                    label={
                      <>
                        <Typography variant="body2">มี</Typography>
                      </>
                    }
                  />
                </Grid>
              </Grid>
            </RadioGroup>
          </FormControl>
        </div>
        {user.WorkExp?.length !== 0 && user.WorkExp !== undefined && (
          <>
            <div className={classes.margin}>
              <Grid container spacing={1} justify="center" alignItems="center">
                <Grid item>
                  <Work />
                </Grid>
                <Grid item xs={10}>
                  <Typography variant="body1">ประสบการณ์การทำงาน</Typography>
                </Grid>
              </Grid>
              <Grid container spacing={1} justify="center" alignItems="center">
                {user?.WorkExp.map((m) => {
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
                    </>
                  );
                })}
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
          <Grid container spacing={2} justify="center" alignItems="flex-end">
            <Grid item>
              <Business />
            </Grid>
            <Grid item xs={10}>
              <TextField
                id="input-with-icon-grid"
                label="ที่อยู่ปัจจุบัน"
                fullWidth={true}
                value={user.ContactAddress}
                type="text"
                disabled
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
                disabled
                type="text"
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
                disabled
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
              // color="primary"
              onClick={() => setSubmit(true)}
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
