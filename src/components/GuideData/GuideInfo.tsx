import {
  Button,
  createStyles,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  Typography,
  withStyles,
} from "@material-ui/core";
import {
  AttachFile,
  Book,
  Close,
  ContactPhone,
  Language,
  Star,
  Work,
} from "@material-ui/icons";
import { useState } from "react";
import Guide from "../../models/Guide";
import Image from "material-ui-image";
import convertToThaiDate from "../../hooks/convertToThaiDate";
import WorkRow from "./WorkRow";
import LangRow from "./LangRow";
import ImageIcon from "@material-ui/icons/Image";
import moment from "moment";

interface GuideInfoProps {
  open: boolean;
  setOpen: any;
  guide: Guide;
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
    table_contianer: {
      width: "100%",
      paddingBottom: "1%",
    },
    thead: {
      background: "#8196D4",
    },
    tbody: {
      background: "white",
    },
    bord: {
      // border: "2px solid black",
      padding: "1%",
    },
    topBorder: {
      borderTop: "2px solid black",
      paddingTop: "1%",
    },
  })
);

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#6479D9",
    color: "white",
    textAlign: "center",
    padding: "1%",
  },
}))(TableCell);

function GuideInfo({ open, setOpen, guide }: GuideInfoProps) {
  const classes = useStyles();

  const [openId, setOpenId] = useState<boolean>(true);

  return (
    <Modal open={open} className={classes.modal}>
      <Paper className={classes.paper}>
        <Typography align="right">
          <IconButton onClick={() => setOpen(false)} style={{ padding: "0" }}>
            <Close />
          </IconButton>
        </Typography>
        <Grid xs={12} md={12} lg={12} className={classes.line}>
          <Typography variant="h1">ข้อมูลไกด์</Typography>
        </Grid>

        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <Grid item xs={12} md={12} lg={6} className={classes.divide}>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Grid xs={12} md={12} lg={12} className={classes.divide}>
                <Grid
                  container
                  alignItems="center"
                  justify="center"
                  className={classes.bord}
                >
                  <Grid item xs={12} md={5} lg={4} style={{ padding: "1%" }}>
                    <Image
                      src={
                        guide.Avatar === null
                          ? `data:${undefined};base64,${undefined}`
                          : `data:${guide.Avatar.mimetype};base64,${guide.Avatar.data}`
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
                          {guide.FirstName} {guide?.LastName}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="h6" align="right">
                          เพศ:
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography variant="h6">
                          {guide.Gender === "male"
                            ? "ชาย"
                            : guide.Gender === "female"
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
                          {convertToThaiDate(new Date(guide.DOB))} (
                          {moment().diff(guide.DOB, "years", false)} ปี)
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="h6" align="right">
                          ID card:
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        {guide.IdCard !== undefined && (
                          <Typography variant="h6">
                            {guide.IdCard[0]}-{guide.IdCard[1]}
                            {guide.IdCard[2]}
                            {guide.IdCard[3]}
                            {guide.IdCard[4]}-{guide.IdCard[5]}
                            {guide.IdCard[6]}
                            {guide.IdCard[7]}
                            {guide.IdCard[8]}
                            {guide.IdCard[9]}-{guide.IdCard[10]}
                            {guide.IdCard[11]}-{guide.IdCard[12]}
                          </Typography>
                        )}
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="h6" align="right">
                          ที่อยู่:
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography variant="h6">{guide.Address}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid xs={12} md={12} lg={12} className={classes.divide}>
                <Divider />
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justify="flex-start"
                  className={classes.bord}
                >
                  <Grid item xs={4}>
                    <Typography variant="body1">
                      วันที่ได้รับการอนุมัติ:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1">
                      {" "}
                      {convertToThaiDate(new Date(guide.VerifyDate))}
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Star style={{ color: "#FFC300" }} />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="body1">
                      {guide.Rating !== null && guide.Rating !== 0
                        ? guide.Rating
                        : "new guide"}
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1">
                      Tips: {guide.Tips} บาท/ชั่วโมง
                    </Typography>
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
                      <Book /> การศึกษา
                    </Typography>
                  </Grid>
                  <Grid item xs={3} md={3} lg={3}>
                    <Typography variant="h6" align="left">
                      ระดับการศึกษา:
                    </Typography>
                  </Grid>
                  <Grid item xs={8} md={8} lg={8}>
                    <Typography variant="h6">
                      {guide?.Education?.Degree}
                    </Typography>
                  </Grid>
                  <Grid item xs={3} md={3} lg={3}>
                    <Typography variant="h6" align="left">
                      สถาบันการศึกษา:
                    </Typography>
                  </Grid>
                  <Grid item xs={8} md={8} lg={8}>
                    <Typography variant="h6">
                      {guide?.Education?.Acadamy}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              {guide?.LangSkill?.length === 0 && (
                <Grid xs={12} md={12} lg={12} className={classes.divide}>
                  <Grid
                    container
                    direction="row"
                    alignItems="flex-start"
                    justify="space-between"
                    className={classes.bord}
                  >
                    <Grid item xs={12} md={12} lg={12}>
                      <Typography variant="h3" align="left">
                        <Language /> ทักษะด้านภาษา
                      </Typography>
                    </Grid>
                    <Grid xs={12} md={12} lg={12}>
                      {guide.LangSkill.length !== 0 && (
                        <>
                          <TableContainer className={classes.table_contianer}>
                            <Table>
                              <colgroup>
                                <col style={{ width: "50%" }} />
                                <col style={{ width: "50%" }} />
                              </colgroup>
                              <TableHead>
                                <TableRow className={classes.thead}>
                                  <StyledTableCell>ภาษา</StyledTableCell>
                                  <StyledTableCell>
                                    ระดับความชำนาญ
                                  </StyledTableCell>
                                </TableRow>
                              </TableHead>

                              <TableBody className={classes.tbody}>
                                {guide.LangSkill.map((w, k) => {
                                  return (
                                    <LangRow
                                      key={k}
                                      lang={w.Language}
                                      level={w.Level}
                                    />
                                  );
                                })}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12} md={12} lg={6} className={classes.divide}>
            <Grid container direction="row" justify="center">
              <Grid xs={12} md={12} lg={12} className={classes.divide}>
                <Grid
                  container
                  alignItems="center"
                  justify="center"
                  className={classes.bord}
                >
                  <Grid item xs={12} md={4} lg={4} style={{ padding: "1%" }}>
                    <Image
                      src={`data:${
                        openId
                          ? guide.FaceWithIdCard === null
                            ? undefined
                            : guide.FaceWithIdCard.mimetype
                          : guide?.Education?.Certificate === null
                          ? undefined
                          : guide?.Education?.Certificate.mimetype
                      };base64,${
                        openId
                          ? guide.FaceWithIdCard === null
                            ? undefined
                            : guide.FaceWithIdCard.data
                          : guide?.Education?.Certificate === null
                          ? undefined
                          : guide?.Education?.Certificate.data
                      }`}
                    />
                  </Grid>
                  <Grid item xs={12} md={8} lg={8} style={{ padding: "1%" }}>
                    <Grid
                      container
                      direction="row"
                      alignItems="flex-start"
                      justify="flex-start"
                    >
                      <Grid
                        item
                        xs={12}
                        md={12}
                        lg={12}
                        style={{ padding: "1%" }}
                      >
                        <Typography variant="h4">
                          หลักฐานการลงทะเบียน
                        </Typography>
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        md={12}
                        lg={12}
                        style={{ padding: "1%" }}
                      >
                        <Typography>
                          <Button
                            onClick={() => setOpenId(true)}
                            style={
                              openId
                                ? {
                                    backgroundColor: "#6479D9",
                                    color: "white",
                                  }
                                : {}
                            }
                            disabled={openId}
                          >
                            <Grid
                              container
                              direction="row"
                              spacing={1}
                              justify="center"
                              alignItems="center"
                            >
                              <ImageIcon />
                              <Typography variant="h6">
                                ตรวจสอบรูปคู่บัตรประชาชน
                              </Typography>
                            </Grid>
                          </Button>
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={12}
                        lg={12}
                        style={{ padding: "1%" }}
                      >
                        <Typography>
                          <Button
                            onClick={() => setOpenId(false)}
                            style={
                              !openId
                                ? {
                                    backgroundColor: "#6479D9",
                                    color: "white",
                                  }
                                : {}
                            }
                            disabled={!openId}
                          >
                            <Grid
                              container
                              direction="row"
                              spacing={1}
                              justify="center"
                              alignItems="center"
                            >
                              <AttachFile />
                              <Typography variant="h6">
                                ตรวจสอบหลักฐานการสำเร็จการศึกษา
                              </Typography>
                            </Grid>
                          </Button>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid xs={12} md={12} lg={12} className={classes.divide}>
                <Divider />
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justify="space-between"
                  className={classes.bord}
                >
                  <Grid item xs={12} md={12} lg={5}>
                    <Typography variant="h3" align="left">
                      <Work /> ประวัติการทำงาน
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={12} lg={7}>
                    <Typography
                      variant="h6"
                      align="center"
                      color="textSecondary"
                    >
                      {guide?.WorkExp?.length === 0 && "ไม่มีประวัติการทำงาน"}
                    </Typography>
                  </Grid>
                  <Grid xs={12} md={12} lg={12}>
                    {guide?.WorkExp?.length !== 0 && (
                      <>
                        <TableContainer className={classes.table_contianer}>
                          <Table>
                            <colgroup>
                              <col style={{ width: "50%" }} />
                              <col style={{ width: "50%" }} />
                            </colgroup>
                            <TableHead>
                              <TableRow className={classes.thead}>
                                <StyledTableCell>หน่วยงาน</StyledTableCell>
                                <StyledTableCell>ตำแหน่งงาน</StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody className={classes.tbody}>
                              {guide?.WorkExp?.map((w, k) => {
                                return (
                                  <WorkRow
                                    key={k}
                                    title={w.JobTitle}
                                    place={w.WorkPlace}
                                  />
                                );
                              })}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </>
                    )}
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
                      ที่อยู่ที่ติดต่อได้:
                    </Typography>
                  </Grid>
                  <Grid item xs={8} md={8} lg={8}>
                    <Typography variant="h6">{guide.ContactAddress}</Typography>
                  </Grid>
                  <Grid item xs={3} md={3} lg={3}>
                    <Typography variant="h6" align="left">
                      เบอร์โทรศัพท์:
                    </Typography>
                  </Grid>
                  <Grid item xs={8} md={8} lg={8}>
                    <Typography variant="h6">{guide.PhoneNumber}</Typography>
                  </Grid>
                  <Grid item xs={3} md={3} lg={3}>
                    <Typography variant="h6" align="left">
                      อีเมล์:
                    </Typography>
                  </Grid>
                  <Grid item xs={8} md={8} lg={8}>
                    <Typography variant="h6">{guide.Email}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
}

export default GuideInfo;
