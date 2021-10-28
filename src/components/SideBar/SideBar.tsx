import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
// import AnnouncementIcon from "@material-ui/icons/Announcement";
// import DescriptionIcon from "@material-ui/icons/Description";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import EditIcon from "@material-ui/icons/Edit";
// import PersonIcon from "@material-ui/icons/Person";
import { useTheme } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import { useState } from "react";
import Submit from "../Submit/Submit";
import { useGoogleLogout } from "react-google-login";
import { Person, PersonPin, ReportProblem } from "@material-ui/icons";

interface IOpen {
  open: boolean;
  setOpen: any;
  classes: any;
  handleDrawerClose: any;
  setLogin: any
}

function SideBar({ open, classes, handleDrawerClose, setLogin }: IOpen) {
  const theme = useTheme();
  const history = useHistory();

  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);

  const logout = async () => {
    await localStorage.clear();
    setLogin(false)
    history.push("/");
    handleDrawerClose();
    setOpenConfirmDialog(false);
  };

  const { signOut } = useGoogleLogout({
    clientId:
      "907374215732-cj2ep14tclbc8aehn9svjkcnfn4ai8cl.apps.googleusercontent.com",
    onLogoutSuccess: logout,
  });

  const displayConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };

  return (
    <>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <Avatar src={`https://bn1305files.storage.live.com/y4m-VdmknM_pfPpiJERPIxlLWj2FpheMGzFF9YkvkMvoXUGDoa_GRUjjxP1JMUtB74zJzZp7BNR1038nmT8lQLMJzDaOQOBBFAl76hWq25RWFC3ml12RuYi3y-Je95YLiiaunBh8mBkWMnOy2mAlge6n5KGjIXJM0cXp6L8btV2YfaFzfPkBN6d8_D_hV9hhKG_?width=1080&height=1080&cropmode=none`} className={classes.big} />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link
            to="/dashboard"
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItem button>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>

          {/* <Link
            to="/announce"
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItem button>
              <ListItemIcon>
                <AnnouncementIcon />
              </ListItemIcon>
              <ListItemText primary="Announce" />
            </ListItem>
          </Link> */}

          <Link
            to={`/validate&=guide`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItem button>
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText primary="รายชื่อไกด์รอการอนุมัติ" />
            </ListItem>
          </Link>

          <Link
            to={`/customer`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItem button>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary="รายชื่อลูกค้า" />
            </ListItem>
          </Link>

          <Link
            to={`/guide`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItem button>
              <ListItemIcon>
                <PersonPin />
              </ListItemIcon>
              <ListItemText primary="รายชื่อไกด์" />
            </ListItem>
          </Link>

          <Link to="/report" style={{ textDecoration: "none", color: "black" }}>
            <ListItem button>
              <ListItemIcon>
                <ReportProblem />
              </ListItemIcon>
              <ListItemText primary="รายงานปัญหา" />
            </ListItem>
          </Link>

          <ListItem button onClick={displayConfirmDialog}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="ลงชื่อออก" />
          </ListItem>
        </List>

        <Divider />
      </Drawer>
      <Submit
        submit={openConfirmDialog}
        title="ลงชื่อออก"
        text="ต้องการลงชื่อออกจากระบบ?"
        denyText="ไม่"
        submitText="ใช่"
        denyAction={() => setOpenConfirmDialog(false)}
        submitAction={signOut}
      />
    </>
  );
}

export default SideBar;
