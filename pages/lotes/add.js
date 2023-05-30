import React, { useRef } from 'react';
import { withIronSession } from "next-iron-session";
import {Button, TextField, Grid, Typography} from '@material-ui/core';

import { useRouter } from 'next/router';

import {Close, Save} from '@material-ui/icons';

import fire from '../../config/fire-config';



const AddLotes = () => {


  const router = useRouter();

  function salvarLote() {
    
    let cpfCerto = cpf.current.value.replace(/\D/g, '');
   
    if(cpfCerto == "" || cpfCerto == null){
		
      alert("VERIFIQUE O CPF DIGITADO!");
    }else{
              fire.database().ref('lotes' ).push({
                nomeResp:name.current.value,
                dataPrimLeitura:dataPrimLeitura.current.value,
                quadra:quadra.current.value,
                lote:lote.current.value,
                numHidrante:numHidrante.current.value,
                cpf:cpfCerto
            }); 
      
          router.push("/lotes");
    }
  }




  let name = useRef("");
  let dataPrimLeitura = useRef("");
  let quadra = useRef("");
  let lote = useRef("");
  let numHidrante = useRef("");
  let cpf = useRef("");


 const cancelar = () => {
   router.push('/lotes')
 }
  

    return(
  <div style={{overflow:"auto"}}>
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0, maximum-scale=1, minimum-scale=1"/>
     <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"></link>

   
          <div style={{margin:"5% 0 0 5%"}}>
          <Grid container  alignItems="flex-start" spacing={2}>  
        
          <Grid item xs={12}> <Typography variant="h5"> Adicionar Lote</Typography>
              </Grid>
            
              <Grid item  xs={12} sm={12}> 
              <TextField required  
              inputRef={name}
              style={{width:"90%" }} fullWidth  variant="standard" id="name" label="Nome do Responsável" defaultValue="" />
              
              </Grid>

              <Grid item xs={12}  sm={6}> 
              <TextField required id="cpf" style={{width:"90%" }} fullWidth variant="standard" label="CPF obs: Apenas Números"  
              inputRef={cpf} /></Grid>

              <Grid item xs={12} sm={6}> 
              <TextField
                variant="standard" 
                      id="date"
                      style={{width:"90%" }} fullWidth
                      label="Data da Primeira Leitura"
                      type="date"
                      defaultValue="2017-05-24"
                      inputRef={dataPrimLeitura}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
              </Grid>
            
              <Grid item xs={12}  sm={2}>
              <TextField required id="quadra" style={{width:"90%" }} fullWidth variant="standard"  label="Quadra" defaultValue="" 
              inputRef={quadra}
              /></Grid>
              
             
              <Grid item xs={12}  sm={2}>
                <TextField required id="lote" style={{width:"90%" }} fullWidth variant="standard"  label="Nº Lote" defaultValue="" 
                inputRef={lote}
                /></Grid>
              <Grid item xs={12}  sm={5}>
                
              <TextField required id="numHidrante" style={{width:"90%" }} fullWidth variant="standard" label="Nº do Hidrante" defaultValue=""
              inputRef={numHidrante}
              /></Grid>
              <Grid item xs={12} sm={3}  > </Grid> 

                <Grid item xs={12} sm={4}  >  
                    <Button onClick={salvarLote} style={{color:"green"}}>
                            <Save />
                            <Typography variant="h6"> salvar</Typography>
                      </Button>    
                </Grid>

                <Grid item xs={12} sm={4}  >  
                    <Button onClick={cancelar} style={{color:"red"}}>
                            <Close />
                            <Typography variant="h6"> cancelar</Typography>
                      </Button>    
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

export default AddLotes;