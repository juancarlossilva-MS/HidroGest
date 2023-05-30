

import fire from '../config/fire-config';
import { useRouter } from 'next/router';

import React, {useState} from 'react';
import { Button, CssBaseline, TextField,Link ,Grid,Box, Typography,Container,Snackbar} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withIronSession } from "next-iron-session";
import MuiAlert from '@material-ui/lab/Alert';

import MyBackDrop from './components/MyBackDrop';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});


function Login(props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const [open, setOpen] = useState(false);
const [alertar, setAlertar] = useState(false);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setAlertar(false);
};


const handlerSubmit = async (e) => {
  e.preventDefault();
  await setOpen(true);
  fire.auth().signInWithEmailAndPassword(email, password)
  .then(async(userCredential) => {
    
        const response = await fetch("/api/sessions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password})
        });
       
        if (response.ok) {
          return router.push("/");
        }else{
          setOpen(false);
        } 

  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    setOpen(false)
    setAlertar(true)
    // ..
  });
  
}


const onChangeHandler = event => {
  const { name, value } = event.currentTarget;
  if (name === "email") {
    setEmail(value);
  } else if (name === "password") {
    setPassword(value);
  } 
};

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={styles.paper}>
        <img className={styles.img} style={{ maxWidth: '62%', minWidth: '62%',    marginLeft: '8%'}} alt="complex" src="logo assoc.png" />
        
        <form className={styles.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Insira aqui seu E-Mail"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={event => onChangeHandler(event)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Insira aqui sua senha"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={event => onChangeHandler(event)}
          />
         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={styles.submit}
            onClick={handlerSubmit}
          >
            Entrar
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Esqueceu a Senha?
              </Link>
            </Grid>
            
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      {open &&
            <MyBackDrop />
      }
      <Snackbar open={alertar} autoHideDuration={6000} onClose={handleClose}>
        <div>

        <Alert onClose={handleClose} severity="error">
          Email ou senha incorretos! tente novamente
        </Alert>
        </div>
      </Snackbar>
    </Container>
    
  );
}

export default Login;


export const getServerSideProps = withIronSession(
  async ({ req, res }) => {
    const user = req.session.get("user");
    if(user){
      res.setHeader("location", "/");
      res.statusCode = 302;
      res.end();
      return { props: {} };
    }else{
      return { props: {} };
    } 
    
   
  },
  {
    cookieName: "MYSITECOOKIE",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false
    },
    password: process.env.APPLICATION_SECRET
  }
);