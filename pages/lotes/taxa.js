import React, { useState, Component, useRef, useEffect } from 'react';
import { withIronSession } from "next-iron-session";
import {Button, TextField, Grid, Typography} from '@material-ui/core';

import { useRouter } from 'next/router';

import {Close, Save} from '@material-ui/icons';

import fire from '../../config/fire-config';

import hmacSHA256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';
import Utf8 from 'crypto-js/enc-utf8'



const GerarTaxa = () => {
  
  var SHA256 = require("crypto-js/sha256");
  
  const router = useRouter();

  function addTaxa() {
 
        dataTaxa = dataTaxa.current.value;

        var dl = new Date(dataTaxa);
        if(dl == 'Invalid Date'){
            alert('Insira a data de referencia da Taxa!');
            cancelar();
            return;
        } 
            
        var vencimento = new Date();
        var mes = parseInt(dataTaxa.substr(5,2))
        vencimento.setMonth(dl.getMonth() + 1);
        mes = (mes < 10 ) ? "0"+(mes+1) : mes+1;

        vencimento = vencimento.getFullYear() + "-" + mes + "-10";
        valorTaxa = valorTaxa.current.value,
        valorTaxa = valorTaxa.replace(",", ".")

        var header = {
            'alg' : 'HS256',
            'typ' : 'JWT'
        }
        header = Base64.stringify(Utf8.parse(JSON.stringify(header)));
    
        var payload = {
            'iss' : 'localhost',
            'valor' : valorTaxa,
            'metodo':'criarTaxa',
            'vencimento':vencimento,
            'dataTaxa': dataTaxa
        }
    
        payload = Base64.stringify(Utf8.parse(JSON.stringify(payload)));
        
        const signature = Base64.stringify(hmacSHA256(header+"."+payload, process.env.KEY_JWT));
       // console.log('token '+ header+"."+payload+"."+signature); return;
        var formData = new FormData();
        formData.append('token', header+"."+payload+"."+signature);
    
        fetch('https://btgnews.tv.br/hidrogest/gerarTaxa.php', {     
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({token:header+"."+payload+"."+signature})
        })

        fire.database().ref('processamentos/taxas/'+dataTaxa ).set({
            processado:false
        });
        
        cancelar();

  }

  let valorTaxa = useRef("20,00");
  let dataTaxa = useRef("");


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
        
          <Grid item xs={12}> <Typography variant="h5"> Adicionar Leitura</Typography>
              </Grid>
            
              <Grid item  xs={12} sm={12}> 
              <TextField required  
              inputRef={valorTaxa}
              style={{width:"90%" }} fullWidth  variant="standard" id="valorTaxa" label="Valor da Taxa" defaultValue="20,00" />
              
              </Grid>


              <Grid item xs={12} sm={6}> 
              <TextField
                variant="standard" 
                      id="date"
                      style={{width:"90%" }} fullWidth
                      label="Mês de Referencia"
                      type="date"
                      defaultValue=""
                      inputRef={dataTaxa}
                      
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
              </Grid>
            
             <Grid item xs={12} sm={6} >  </Grid>
             

                <Grid item xs={12} sm={4}  >  
                    <Button onClick={addTaxa} style={{color:"green"}}>
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

export default GerarTaxa;
