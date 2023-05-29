import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
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
