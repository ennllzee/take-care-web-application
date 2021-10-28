import "./NavBar.css";

import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

interface IOpen {
  open: boolean;
  setOpen: any;
  classes: any;
  handleDrawerOpen: any;
  login: boolean;
}

function NavBar({ open, classes, handleDrawerOpen, login }: IOpen) {
  return (
    <div>
      <AppBar
        position="fixed"
        className={clsx(
          classes.appBar,
          {
            [classes.appBarShift]: open,
          },
          classes.colorAppBar
        )}
      >
        <Toolbar>
          {login && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Avatar
            src={`https://bn1305files.storage.live.com/y4m-VdmknM_pfPpiJERPIxlLWj2FpheMGzFF9YkvkMvoXUGDoa_GRUjjxP1JMUtB74zJzZp7BNR1038nmT8lQLMJzDaOQOBBFAl76hWq25RWFC3ml12RuYi3y-Je95YLiiaunBh8mBkWMnOy2mAlge6n5KGjIXJM0cXp6L8btV2YfaFzfPkBN6d8_D_hV9hhKG_?width=1080&height=1080&cropmode=none`}
            className={clsx(classes.large, open && classes.hide)}
          />
          <Typography variant="h4" noWrap>
            Take Care For Admin
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
