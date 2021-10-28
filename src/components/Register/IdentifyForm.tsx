import {
  Button,
  createStyles,
  Fab,
  Grid,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { AttachFile, Fingerprint, NavigateBefore, NavigateNext } from "@material-ui/icons";
import { useState } from "react";
import GuideForm from "../../models/GuideForm";
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

interface IdentifyFormProps {
  user: GuideForm;
  setUser: any;
  setStep: any;
  setDisplayImg: any
  displayImg: any
}

function IdentifyForm({ user, setUser, setStep, setDisplayImg, displayImg  }: IdentifyFormProps) {
  const classes = useStyles();
  const [idCard, setIdCard] = useState<string | undefined>(user.IdCard);
  const [idCardPic, setIdCardPic] = useState<any | undefined>(
    user.FaceWithIdCard
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
    setIdCardPic(file);
    setDisplayImg(base64)
  };

  const next = () => {
    if (idCard !== undefined) {
      setUser({
        ...user,
        IdCard: idCard,
        FaceWithIdCard: idCardPic,
      });
      setStep(3);
    }
  };

  const back = () => {
    setUser({
      ...user,
      IdCard: idCard,
      FaceWithIdCard: idCardPic,
    });
    setStep(1);
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
                  2
                </Fab>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h4">Identity</Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  บัตรประจำตัวประชาชน
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

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
                value={idCard}
                onChange={(e) => setIdCard(e.target.value)}
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
              <Typography variant="body1">
                แนบรูปคู่บัตรประจำตัวประชาชน
              </Typography>
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
                  id="contained-button-file"
                  onChange={(e: any) => {
                    uploadFile(e);
                  }}
                  hidden
                />
                <label htmlFor="contained-button-file">
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
                {idCardPic !== undefined
                  ? " อัปโหลดสำเร็จ"
                  : " ยังไม่ได้อัปโหลดไฟล์"}
              </Typography>
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
                <NavigateBefore/>
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
                <NavigateNext/>
              </Grid>
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}

export default IdentifyForm;
