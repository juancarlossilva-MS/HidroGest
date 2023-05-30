import React, { useState, Component, useRef, useEffect } from 'react';
import { withIronSession } from "next-iron-session";
import {Button, TextField, Grid, Typography} from '@material-ui/core';

import { useRouter } from 'next/router';

import {Close, Save} from '@material-ui/icons';

import fire from '../../../config/fire-config';

import Base64 from 'crypto-js/enc-base64';



const AddLeitura = ({id}) => {
  
  var SHA256 = require("crypto-js/sha256");
  
  const router = useRouter();

  function salvarLeitura() {
 
        dataLeitura = dataLeitura.current.value;

        var dl = new Date(dataLeitura);
        if(dl == 'Invalid Date'){
            alert('Insira a data da leitura!');
            cancelar();
            return;
        } 
            
        var vencimento = new Date();
        var ano = dataLeitura.substr(0,4)
        var mes = parseInt(dataLeitura.substr(5,2))
        vencimento.setMonth(dl.getMonth() + 1);
        mes = (mes < 10 ) ? "0"+(mes+1) : mes+1;
        vencimento = vencimento.getFullYear() + "-" + mes + "-10";

        let totalConsumido = 0;
        let valorPagar = 0;
        valorLeitura = valorLeitura.current.value,

        valorLeitura = valorLeitura.replace(",", ".")
        fire.database()
            .ref('leituras/'+id).orderByChild('dataLeitura').limitToLast(1)
            .once("value",(snap) => {
                if(snap.val()){
                    let data = snap.val();
                    let key = Object.keys(data)[0]
                    console.log(key);
                    console.log(parseFloat(data[key].valorLeitura));
                    totalConsumido = parseFloat(valorLeitura) - parseFloat(data[key].valorLeitura)
                    
                }else{
                    totalConsumido = valorLeitura
                }
                if(totalConsumido <= 5) valorPagar = 25;
                else valorPagar = totalConsumido * 5;
                let txt =  Math.random().toString()+Math.random().toString()+Math.random().toString();
                let txid = (SHA256(txt).toString());

                txid = txid.substr(0,30);
                fire.database().ref('leituras/'+id+'/'+txid ).set({
                    valorLeitura:valorLeitura,
                    dataLeitura:dataLeitura,
                    vencimento:vencimento,
                    totalConsumido:Number(totalConsumido).toFixed(4),
                    valorPagar:valorPagar.toFixed(2),
                    jaPago: false,
                    txid:txid
                }); 
                cancelar();

            });
  }

  let valorLeitura = useRef("");
  let dataLeitura = useRef("");


 const cancelar = () => {
   router.push('/lotes/view?id='+id)
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
              inputRef={valorLeitura}
              style={{width:"90%" }} fullWidth  variant="standard" id="valorLeitura" label="Valor da Leitura" defaultValue="" />
              
              </Grid>


              <Grid item xs={12} sm={6}> 
              <TextField
                variant="standard" 
                      id="date"
                      style={{width:"90%" }} fullWidth
                      label="Data da Leitura"
                      type="date"
                      defaultValue=""
                      inputRef={dataLeitura}
                      
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
              </Grid>
            
             <Grid item xs={12} sm={6} >  </Grid>
             

                <Grid item xs={12} sm={4}  >  
                    <Button onClick={salvarLeitura} style={{color:"green"}}>
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

export default AddLeitura;