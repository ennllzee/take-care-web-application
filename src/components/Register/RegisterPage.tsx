import { Backdrop, CircularProgress, createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useGoogleLogout } from "react-google-login";
import { history } from "../../helper/history";
import CustomerForm from "../../models/CustomerForm";
import Alert from "../Alert/Alert";
import Submit from "../Submit/Submit";
import TopBar from "../TopBar/TopBar";
import ContactForm from "./ContactForm";
import ProfileForm from "./ProfileForm";
import RegisterSubmit from "./RegisterSubmit";
import { useMutation } from "@apollo/client";
import useCustomerApi from "../../hooks/customerhooks";
import MedicalForm from "./MedicalForm";

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
    },
    margin: {
      margin: theme.spacing(1),
    },
    box: {
      padding: "5%",
      marginBottom: "5%",
    },
    img: {
      height: "20vh",
      weight: "80%",
      border: "2px solid #000",
    },
    card: {
      padding: "2%",
    },
  })
);

function RegisterPage() {
  const classes = useStyles();

  const accessToken = localStorage.getItem("accessToken");
  const gmail = localStorage.getItem("gmail");
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("_id");

  const [alert, setAlert] = useState<boolean>(false);

  const logout = () => {
    history.push("/");
  };

  const { signOut } = useGoogleLogout({
    clientId:
      "907374215732-b5mgla300uqrmlvkq4gstaq0de9osef7.apps.googleusercontent.com",
    onLogoutSuccess: logout,
  });

  useEffect(() => {
    if (accessToken !== null && id !== null) {
      history.push(`/appointment&=${accessToken}`);
    }
    if (gmail === null) {
      history.push("/");
    }
  }, [accessToken, gmail, id]);

  const [submit, setSubmit] = useState<boolean>(false);

  const [step, setStep] = useState<number>(1);
  const [user, setUser] = useState<CustomerForm>({
    Token: token,
  });
  const [displayImg, setdisplayImg] = useState<any | undefined>("");

  const { SIGNUP_CUSTOMER, UPLOAD_PROFILE } = useCustomerApi();

  const [setUploadFile, { loading: mutationFileLoading, error: mutationFileError }] = useMutation(UPLOAD_PROFILE, {
    onCompleted: (data) => console.log(data),
  });

  const [failed, setFailed] = useState<boolean>(false);

  const [createCustomer, { loading: mutationLoading, error: mutationError }] =
    useMutation(SIGNUP_CUSTOMER, {
      onCompleted: (data) => {
        console.log(data);
        setUploadFile({ 
          variables: {
            addCustomerProfileFile: user.Avatar,
            addCustomerProfileCustomerId: data.createdCustomer._id,
          },
        });
      },
    });

  //NEEDED BACKEND
  const onSubmit = async () => {
    setSubmit(false)
    await createCustomer({
      variables: { createdCustomerInput: { ...user, Avatar: null } },
    });
    while(mutationLoading || mutationFileLoading){

    }
    if(mutationError || mutationFileError){
      if(mutationFileError) console.log(mutationFileError.graphQLErrors)
        if(mutationError) console.log(mutationError.graphQLErrors)
      setFailed(true)
    }else{
      setAlert(true);
    }
  };

  return (
    <Grid>
      <TopBar page="ลงทะเบียน" />
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="flex-start"
      >
        <Grid item className={classes.main}>
          <Grid
            container
            direction="row"
            alignItems="flex-start"
            justify="center"
          >
            <Grid item xs={12} md={12} lg={12}>
              {step === 1 && (
                <ProfileForm
                  user={user}
                  setUser={setUser}
                  setStep={setStep}
                  displayImg={displayImg}
                  setdisplayImg={setdisplayImg}
                />
              )}
              {step === 2 && (
                <MedicalForm user={user} setUser={setUser} setStep={setStep} />
              )}
              {step === 3 && (
                <ContactForm user={user} setUser={setUser} setStep={setStep} />
              )}
              {step === 4 && (
                <RegisterSubmit
                  user={user}
                  setStep={setStep}
                  setSubmit={setSubmit}
                  displayImg={displayImg}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
        <Alert
          closeAlert={() => {
            setAlert(false);
            signOut();
          }}
          alert={alert}
          title="สำเร็จ"
          text="ลงทะเบียนสำเร็จ กรุณาลงชื่อเข้าระบเพื่อเริ่มใช้งาน"
          buttonText="ตกลง"
        />
        <Submit
          submit={submit}
          title="ยืนยันการลงทะเบียน"
          text="กรุณาตรวจสอบความถูกต้องก่อนกดยืนยัน"
          denyText="ยกเลิก"
          submitText="ยืนยัน"
          denyAction={() => setSubmit(false)}
          submitAction={onSubmit}
        />
        <Backdrop open={mutationLoading || mutationFileLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Alert
          closeAlert={() => setFailed(false)}
          alert={failed}
          title="ผิดพลาด"
          text="กรุณาลองใหม่อีกครั้ง"
          buttonText="ปิด"
        />
      </Grid>
    </Grid>
  );
}
export default RegisterPage;
