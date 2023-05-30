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

function Header(props) {
  
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
    txtD:{
      textDecoration:'none'
    },
    appTitle: {
      color:'#fff'
    }
  };
  
  return (
    <AppBar position="relative" >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Menu"
          
        >
          <MenuIcon />
        </IconButton>
        <Link href="/" style={styles.txtD}><Typography
          variant="h6"
          color="inherit"
          sx={styles.appTitle}
        >
          HidroGest 
        </Typography></Link>
        <AppBarCollapse />
      </Toolbar>
    </AppBar>
  );
}

export default (Header);
