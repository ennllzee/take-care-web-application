import { useQuery } from "@apollo/client";
import { CircularProgress, Container, createStyles, Divider, Grid, makeStyles, Theme, Typography } from "@material-ui/core";
import { useState, useEffect } from "react";
import useAdminApi from "../../hooks/adminhooks";
import Guide from "../../models/Guide";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      padding: '5%',
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      backgroundColor: "#508F7F"
    },
    line: {
      padding: "3%",
    },

  })
);

function GuideBox () {
  const { GET_ALLGUIDE } = useAdminApi();

  const classes = useStyles()

  const { loading, error, data } = useQuery(GET_ALLGUIDE, {
    pollInterval: 60000,
  });

  const [guides, setGuides] = useState<Guide[]>(
    data !== undefined ? data.getAllGuide : []
  );

  useEffect(() => {
    if (!loading && data) {
      setGuides(data.getAllGuide);
    }
    if (error) console.log(error.graphQLErrors);
  }, [loading, data, error]);

  return (
    <Container className={classes.box} >
      {!loading ? (
        <>
            
          <Typography variant="h4" align="center">จำนวนไกด์</Typography>
          <Typography variant="h2" align="center" className={classes.line}>{guides.filter(e => e.IsVerified).length} คน</Typography>
          <Divider  style={{backgroundColor: "white"}}/>
          <Grid container className={classes.line}>
              
              <Grid item xs={4}>
              <Typography variant="h6" align="center">ชาย: {guides.filter(e => e.Gender === "male" && e.IsVerified).length}</Typography>
              </Grid>
              <Grid item xs={4}>
              <Typography variant="h6" align="center">หญิง: {guides.filter(e => e.Gender === "female" && e.IsVerified).length}</Typography>
              </Grid>
              <Grid item xs={4}>
              <Typography variant="h6" align="center">อื่น ๆ : {guides.filter(e => e.Gender === "other" && e.IsVerified).length}</Typography>
              </Grid>
          </Grid>
        </>
      ) : (
        <Typography variant="h4" align="center"><CircularProgress disableShrink style={{color: "white"}}/></Typography>
        
      )}
    </Container>
  );
}

export default GuideBox ;
