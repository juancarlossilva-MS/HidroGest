import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AppBarCollapse from "./AppBarCollapse";
import  Link from 'next/link';

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  navigation: {},
  toggleDrawer: {},
  appTitle: {}
};

function Header(props) {
  const { classes } = props;
  return (
    <AppBar position="fixed" className={classes.navigation}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Menu"
          className={classes.toggleDrawer}
        >
          <MenuIcon />
        </IconButton>
        <Link href="/"><a style={{color:'white', textDecoration:"none"}}><Typography
          variant="h6"
          color="inherit"
          className={classes.appTitle}
        >
          HidroGest 
        </Typography></a></Link>
        <AppBarCollapse />
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
