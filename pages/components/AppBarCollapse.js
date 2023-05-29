/**
 * Code from the below medium post, only updated for latest material UI, using a
 * Menu for the popup and with breakpoints that work.
 *
 * https://medium.com/@habibmahbub/create-appbar-material-ui-responsive-like-bootstrap-1a65e8286d6f
 */
import React from "react";
import { Button, MenuItem } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ButtonAppBarCollapse from "./ButtonAppBarCollapse";
import { useRouter } from 'next/router';

const styles = theme => ({
  root: {
    position: "absolute",
    right: 0
  },
  buttonBar: {
    [theme.breakpoints.down("xs")]: {
      display: "none"
    },
    margin: "10px",
    paddingLeft: "16px",
    right: 0,
    position: "relative",
    width: "100%",
    background: "transparent"
  }
});



function AppBarCollapse(props){
      const router = useRouter();

  const logout = async () => {
     const response = await fetch("/api/sessions", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
      console.log(response);
  
      if (response.ok) {
        return router.push("/login");
      }
  
    };
  
  return(
  <div className={props.classes.root}>
    <ButtonAppBarCollapse>
      <MenuItem></MenuItem>
      <MenuItem onClick={logout}>Sair</MenuItem>
    </ButtonAppBarCollapse>
    <div className={props.classes.buttonBar} id="appbar-collapse">
      <Button color="inherit"></Button>
      <Button onClick={logout} color="inherit">Sair</Button>
    </div>
  </div>
)}

export default withStyles(styles)(AppBarCollapse);
