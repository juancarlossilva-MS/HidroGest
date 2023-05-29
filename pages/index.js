import React from 'react';
import { withIronSession } from "next-iron-session";
import { Button,Grid, Typography} from '@mui/material';
import {Print, ViewModule} from '@mui/icons-material';
import  Link from 'next/link';
import Header from "./components/Header";

const PrivatePage = ({ user }) => {

  const style = {
    txtD:{
      textDecoration:'none'
    }
  };

    return(
   

  <div>
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0, maximum-scale=1, minimum-scale=1"/>

     <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"></link>

<Header/>
<div >
          <Grid container spacing={3}> 

              <Grid item xs={12} ></Grid>
              <Grid item xs={12} ></Grid>
              <Grid item xs={1} sm={1}></Grid>
             
              <Grid item xs={4} sm={4}>
                <Link href="/lotes">
                 
                  <Button  style={{padding:"0"}} variant="contained" color="primary">
                       <ViewModule style={{padding:"0" ,fontSize:"8vw"}}/>
                  </Button>
                </Link>
                <Link href="/lotes" style={style.txtD}>
                  <Typography align="left" color="primary" variant="h4" component="h2">
                      Lotes
                    </Typography>
                  </Link>
                 
              </Grid>
              <Grid item xs={3} sm={3}>
                  
                <Link href="/relatorios" style={style.txtD}>
                  <Button  style={{padding:"0"}} variant="contained" color="primary">
                       <Print style={{fontSize:"8vw"}}/>
                       
                  </Button>
                </Link>
                <Link href="/relatorios" style={style.txtD}>
                    <Typography align="left" color="primary" variant="h4" component="h2">
                        Relatórios
                      </Typography> 
                
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