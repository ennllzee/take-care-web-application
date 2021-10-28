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
  Book,
  School,
  Language,
  AttachFile,
  NavigateBefore,
  NavigateNext,
} from "@material-ui/icons";
import { useState } from "react";
import GuideForm from "../../models/GuideForm";
import LanguageSkill from "../../models/LanguageSkill";
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
    title: {
      color: "#6DB8A5",
    },
  })
);

interface EducationFormProps {
  user: GuideForm;
  setUser: any;
  setStep: any;
  setDisplayImg: any;
  displayImg: any;
}

function EducationForm({
  user,
  setUser,
  setStep,
  setDisplayImg,
  displayImg,
}: EducationFormProps) {
  const classes = useStyles();
  const [degree, setDegree] = useState<string | undefined>(
    user.Education?.Degree
  );
  const [acadamy, setAcadamy] = useState<string | undefined>(
    user.Education?.Acadamy
  );
  const [certificate, setCertificate] = useState<any | undefined>(
    user.Education?.Certificate
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

  const uploadFile = async (e: any) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setCertificate(file);
    setDisplayImg(base64);
  };

  const [languageSkill, setLanguageSkill] = useState<LanguageSkill[]>(
    user.LangSkill !== undefined ? user.LangSkill : []
  );
  const [newLang, setNewLang] = useState<string | undefined>(undefined);
  const [newLevel, setNewLevel] = useState<number>();
  const [langAlert, setLangAlert] = useState<boolean>(false);
  const addLang = () => {
    if (newLang !== undefined && newLevel !== undefined && newLang !== "" ) {
      let newSkill: LanguageSkill = {
        Language: newLang,
        Level: newLevel,
      };
      if (languageSkill.find((l) => l.Language === newSkill.Language)) {
        setLangAlert(true);
      } else {
        setLanguageSkill((l) => [...l, newSkill]);
        setNewLang("");
        setNewLevel(undefined); 
      }
    }
  };

  const deleteLang = (m: LanguageSkill) => {
    setLanguageSkill(languageSkill.filter((l) => l !== m));
  };

  const next = () => {
    if (degree !== undefined && acadamy !== undefined) {
      setUser({
        ...user,
        Education: {
          Degree: degree,
          Acadamy: acadamy,
          Certificate: certificate,
        },
        LangSkill: languageSkill,
      });
      setStep(4);
    }
  };

  const back = () => {
    setUser({
      ...user,
      Education: {
        Degree: degree,
        Acadamy: acadamy,
        Certificate: certificate,
      },
      LangSkill: languageSkill,
    });
    setStep(2);
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
                  3
                </Fab>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h4">Education</Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  การศึกษาและทักษะ
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <div className={classes.margin}>
          <Grid container spacing={2} justify="center" alignItems="flex-end">
            <Grid item>
              <Book />
            </Grid>
            <Grid item xs={10}>
              <FormControl required fullWidth={true}>
                <InputLabel id="degree-label" shrink={degree !== undefined}>
                  ระดับการศึกษา
                </InputLabel>
                <Select
                  labelId="degree-label"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value as string)}
                  fullWidth={true}
                  required
                >
                  <MenuItem value={undefined} disabled>
                    ระดับการศึกษา
                  </MenuItem>
                  <MenuItem value="ต่ำกว่ามัธยมศึกษาตอนต้น">
                    ต่ำกว่ามัธยมศึกษาตอนต้น
                  </MenuItem>
                  <MenuItem value="มัธยมศึกษาตอนต้น">มัธยมศึกษาตอนต้น</MenuItem>
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
          <Grid container spacing={2} justify="center" alignItems="flex-end">
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
          <Grid container spacing={2} justify="center" alignItems="center">
            <Grid item>
              <AttachFile />
            </Grid>
            <Grid item xs={10}>
              <Typography variant="body1">แนบหลักฐานทางการศึกษา</Typography>
            </Grid>
            <Grid item xs={4} md={3} lg={2} style={{backgroundColor: "#EFEFEF"}}>
              <Image
                src={displayImg}
                loading={displayImg === undefined ? false : true}
                // cover={true}
              />
            </Grid>
            <Grid item xs={4} md={3} lg={2}>
              <Typography align="center">
                <input
                  type="file"
                  accept="image/*"
                  id="contained-button-omg-file"
                  onChange={(e: any) => {
                    uploadFile(e);
                  }}
                  hidden
                />
                <label htmlFor="contained-button-omg-file">
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
                      <Typography variant="body1">อัปโหลด</Typography>
                    </Grid>
                  </Button>
                </label>
              </Typography>
              <Typography variant="body1" align="center">
                {certificate !== undefined
                  ? " อัปโหลดสำเร็จ"
                  : " ยังไม่ได้อัปโหลดไฟล์"}
              </Typography>
            </Grid>
          </Grid>
        </div>

        <div className={classes.margin}>
          <Grid container spacing={1} justify="center" alignItems="center">
            <Grid item>
              {/* <Typography variant="h6"> */}
              <Language />
              {/* </Typography> */}
            </Grid>
            <Grid item xs={10}>
              <Typography variant="body1">ทักษะทางด้านภาษา</Typography>
            </Grid>
          </Grid>

          <Grid container spacing={1} justify="center" alignItems="center">
            {languageSkill.map((m) => {
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
          <Grid container spacing={2} justify="center" alignItems="flex-end">
            <Grid item xs={5} md={4} lg={4}>
              <TextField
                id="input-with-icon-grid"
                label="ชื่อภาษา"
                fullWidth={true}
                value={newLang}
                onChange={(e) => setNewLang(e.target.value)}
                type="text"
                InputLabelProps={{
                  shrink: newLang !== undefined && newLang !== ""
                }}
              />
            </Grid>
            <Grid item xs={5} md={4} lg={4}>
              <FormControl required fullWidth={true}>
                <InputLabel id="level-label" shrink={newLevel !== undefined}>
                  ความชำนาญ
                </InputLabel>
                <Select
                  labelId="level-label"
                  value={newLevel !== undefined ? newLevel : null}
                  onChange={(e) => setNewLevel(e.target.value as number)}
                  fullWidth={true}
                >
                  <MenuItem value={undefined} disabled>
                    ความชำนาญ
                  </MenuItem>
                  <MenuItem value={1}>ระดับ 1 สนทนาได้เล็กน้อย</MenuItem>
                  <MenuItem value={2}>ระดับ 2 สนทนาได้</MenuItem>
                  <MenuItem value={3}>ระดับ 3 สนทนาและอ่านเขียนได้</MenuItem>
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
                    padding: 0,
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
              type="submit"
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
    </Grid>
  );
}

export default EducationForm;
