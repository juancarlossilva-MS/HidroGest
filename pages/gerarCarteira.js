import React, { useState, Component, useEffect } from 'react';
import { withIronSession } from "next-iron-session";
import { useRouter } from 'next/router';
import {Avatar, makeStyles, Modal, FormControl, FormLabel, Radio, RadioGroup,InputLabel,
    AppBar,Toolbar,    Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,
    IconButton,Icon, Button, CssBaseline, TextField, FormControlLabel, Checkbox,Grid,Box, Typography} from '@material-ui/core';


import  Link from 'next/link';
import Header from "./components/Header";

import {Facebook ,GroupAdd, Save,YouTube,AssignmentInd, People} from '@material-ui/icons/';
import MenuIcon from '@material-ui/icons/Menu';

import fire from '../config/fire-config';

const PrivatePage = ({props}) => {
  const [blogs, setBlogs] = useState([]);
  const [urlAtual, setUrlAtual] = useState("");
  const [canal, setCanal] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
	const router = useRouter();
	console.log(JSON.parse(props.router.query.data));

  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  

  const useStyles2 = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  const classes2 = useStyles2();
  const [modalStyle] = React.useState(getModalStyle);

  const [value, setValue] = React.useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const salvarNovasInfos = () => {

    
  }

  class AbrirModalChangeServer extends Component {
      render(){

          return(
              <div>
                <Modal
                      open={open}
                      onClose={handleClose}
                     
                    >
                     <div style={modalStyle}  className={classes2.paper}>
                            <h2 id="simple-modal-title">Selecione a Plataforma</h2>
                            <FormControl component="fieldset">
                              <FormLabel component="legend">Plataforma</FormLabel>
                              <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                                <FormControlLabel value="youtube" control={<Radio />} label={<YouTubeIcon/>} />
                                <FormControlLabel value="facebook" control={<Radio />} label={<FacebookIcon/>} />
                              
                              </RadioGroup>
                              <TextField id="outlined-basic" label="URL" variant="outlined" />
                              <Button variant="contained" onClick={salvarNovasInfos} color="primary" size="small" className={classes.button} startIcon={<SaveIcon />}>
                                  Save
                                </Button>
                            </FormControl>
                          </div>
                    </Modal>
              </div>

          )

      }

  }

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

  const classes = useStyles();

    return(
  <div style={{overflow:"auto"}}>
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0, maximum-scale=1, minimum-scale=1"/>
     <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"></link>

		<Header/>
        
          

          
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