import { useQuery } from "@apollo/client";
import { CircularProgress, Container, createStyles, Divider, Grid, makeStyles, Theme, Typography } from "@material-ui/core";
import { useState, useEffect } from "react";
import useAdminApi from "../../hooks/adminhooks";
import Customer from "../../models/Customer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      padding: '5%',
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      backgroundColor: "#7C5D92"
    },
    line: {
      padding: "3%",
    },

  })
);

function CustomerBox() {
  const { GET_ALLCUSTOMER } = useAdminApi();

  const classes = useStyles()

  const { loading, error, data } = useQuery(GET_ALLCUSTOMER, {
    pollInterval: 60000,
  });

  const [customers, setCustomers] = useState<Customer[]>(
    data !== undefined ? data.getAllCustomer : []
  );

  useEffect(() => {
    if (!loading && data) {
      setCustomers(data.getAllCustomer);
    }
    if (error) console.log(error.graphQLErrors);
  }, [loading, data, error]);

  return (
    <Container className={classes.box} >
      {!loading ? (
        <>
            
          <Typography variant="h4" align="center">จำนวนลูกค้า</Typography>
          <Typography variant="h2" align="center" className={classes.line}>{customers.length} คน</Typography>
          <Divider  style={{backgroundColor: "white"}}/>
          <Grid container className={classes.line}>
              
              <Grid item xs={4}>
              <Typography variant="h6" align="center">ชาย: {customers.filter(e => e.Gender === "male").length}</Typography>
              </Grid>
              <Grid item xs={4}>
              <Typography variant="h6" align="center">หญิง: {customers.filter(e => e.Gender === "female").length}</Typography>
              </Grid>
              <Grid item xs={4}>
              <Typography variant="h6" align="center">อื่น ๆ : {customers.filter(e => e.Gender === "other").length}</Typography>
              </Grid>
          </Grid>
        </>
      ) : (
        <Typography variant="h4" align="center"><CircularProgress disableShrink style={{color: "white"}}/></Typography>
        
      )}
    </Container>
  );
}

export default CustomerBox;
