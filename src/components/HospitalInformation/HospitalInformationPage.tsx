import { makeStyles, Theme, createStyles, Grid } from "@material-ui/core"
import { useEffect } from "react"
import { history } from "../../helper/history"
import BottomBar from "../BottomBar/BottomBar"
import TopBar from "../TopBar/TopBar"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minHeight: '100vh'
        },
        sub: {
            minHeight: '15vh'
        },
        main: {
            minHeight: '70vh',
            paddingRight: '5%',
            paddingLeft: '5%',
            minWidth: '80vw',
            maxWidth: '100vw'
        },
        form: {
            paddingTop: '5%',
        },
        margin: {
            margin: theme.spacing(1),
        },
    })
)

function HospitalInformationPage() {

    const classes = useStyles()
    const accessToken = localStorage.getItem("accessToken")
    
    useEffect(() => {
        if(accessToken === null){
            history.push("/")
        }
    }, [accessToken])
    
    return (
        <Grid>
            <TopBar page="ข้อมูลโรงพยาบาล"/>
            <Grid container direction="column" alignItems="center" justify="space-between" className={classes.root}>
                <Grid item className={classes.sub}>

                </Grid>
                <Grid item className={classes.main}>
                    <Grid container direction="row" alignItems="center" justify="center">
                        <Grid item xs={12} md={10} lg={8}>
                            
                        </Grid>
                        <Grid item xs={12} md={10} lg={8}>
                            
                        </Grid>
                    </Grid>
                </Grid>
                
                <Grid item className={classes.sub}>

                </Grid>
            </Grid>
            <BottomBar page="Hospital Information"/>
        </Grid>

    )
}
export default HospitalInformationPage