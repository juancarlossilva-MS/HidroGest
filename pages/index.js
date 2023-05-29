import React, { useState, Component, useEffect } from 'react';
import { withIronSession } from "next-iron-session";
import { useRouter } from 'next/router';
import {Avatar, makeStyles, Modal, FormControl, FormLabel, Radio, RadioGroup,InputLabel,List, ListItem,ListItemText,Divider,Paper,
    AppBar,Toolbar,IconButton,Icon, Button, CssBaseline, TextField, FormControlLabel, Checkbox ,Grid,Box, Typography} from '@material-ui/core';

import {Print, ViewModule} from '@material-ui/icons/';
import  Link from 'next/link';
import Header from "./components/Header";

import fire from '../config/fire-config';

const PrivatePage = ({ user }) => {


    return(
   

  <div>
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0, maximum-scale=1, minimum-scale=1"/>

     <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"></link>

<Header/>
<div style={{margin:"10vw 0 0 30vw"}}>
          <Grid container spacing={3}>  
             
              <Grid item xs={12} lg={3}>
                <Link href="/lotes">
                 
                  <Button  style={{padding:"0"}} variant="contained" color="primary">
                       <ViewModule style={{padding:"0" ,fontSize:"8vw"}}/>
                  </Button>
                </Link>
                <Link href="/lotes">
                  <Typography align="left" color="primary" variant="h4" component="h2">
                      Lotes
                    </Typography>
                  </Link>
                 
              </Grid>
              <Grid item xs={12} lg={3}>
                <Link href="/relatorios">
                  <>
                  <Button  style={{padding:"0"}} variant="contained" color="primary">
                       <Print style={{fontSize:"8vw"}}/>
                       
                  </Button>
                    <Typography align="left" color="primary" variant="h4" component="h2">
                        Relatórios
                      </Typography> 
                  </>
                  </Link>
              </Grid>
             



          </Grid>
</div>
          
  </div>);
};



export const getServerSideProps = withIronSession(

  
  async ({ req, res }) => {
    const user = req.session.get("user");
    if (!user) {
      res.setHeader("location", "/login");
      res.statusCode = 302;
      res.end();
      return { props: {} };
    }

    return {
      props: { user }
    };
  },
  {
    cookieName: "MYSITECOOKIE",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false
    },
    password: process.env.APPLICATION_SECRET
  }
);

export default PrivatePage;