import React, { useState,  useEffect } from 'react';
import { withIronSession } from "next-iron-session";
import {Button, TextField, Grid, Typography} from '@material-ui/core';

import { useRouter } from 'next/router';

import {Close, Save} from '@material-ui/icons';

import fire from '../../config/fire-config';



const EditLote = ({id}) => {


const router = useRouter();
 
//const [id,setId] = useState(router.query.id);

useEffect(() => {
     
    fire.database()
      .ref('lotes/'+id)
      .once("value").then((snap) => {
        
       
        var res = (snap.val())       
        setName(res.nomeResp);       
        setDataPrimLeitura(res.dataPrimLeitura);
        setQuadra(res.quadra);
        setLote(res.lote);
        setNumHidrante(res.numHidrante);
        setCpf(res.cpf);

       
        
      });
     
  }, []);

  const [name, setName] = useState("");
  const [dataPrimLeitura, setDataPrimLeitura] = useState("");
  const [quadra, setQuadra] = useState("");
  const [lote, setLote] = useState("");
  const [numHidrante, setNumHidrante] = useState("");
  const [cpf, setCpf] = useState("");

  function salvarLote() {
    
    let cpfCerto = cpf.replace(/\D/g, '');
   
    if(cpfCerto == "" || cpfCerto == null){
		
      alert("VERIFIQUE O CPF DIGITADO!");
    }else{
              fire.database().ref('lotes/'+id ).set({
                nomeResp:name,
                dataPrimLeitura:dataPrimLeitura,
                quadra:quadra,
                lote:lote,
                numHidrante:numHidrante,
                cpf:cpfCerto
            }); 
      
          router.push("/lotes");
    }
  }


  




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
              value={name}
              style={{width:"90%" }} fullWidth onChange={e => setName(e.target.value)} variant="standard" id="name" label="Nome do Responsável" defaultValue="" />
              
              </Grid>

              <Grid item xs={12}  sm={6}> 
              <TextField required id="cpf" style={{width:"90%" }} onChange={e => setCpf(e.target.value)} fullWidth variant="standard" label="CPF obs: Apenas Números"  
              value={cpf} /></Grid>

              <Grid item xs={12} sm={6}> 
              <TextField
                variant="standard" 
                      id="date"
                      style={{width:"90%" }} fullWidth
                      label="Data da Primeira Leitura"
                      type="date"
                      defaultValue="2017-05-24"
                      value={dataPrimLeitura}
                      onChange={e => setDataPrimLeitura(e.target.value)}
                      
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
              </Grid>
            
              <Grid item xs={12}  sm={2}>
              <TextField required id="quadra" onChange={e => setQuadra(e.target.value)} style={{width:"90%" }} fullWidth variant="standard"  label="Quadra" defaultValue="" 
              value={quadra}
              /></Grid>
              
             
              <Grid item xs={12}  sm={2}>
                <TextField required id="lote" onChange={e => setLote(e.target.value)} style={{width:"90%" }} fullWidth variant="standard"  label="Nº Lote" defaultValue="" 
                value={lote}
                /></Grid>
              <Grid item xs={12}  sm={5}>
                
              <TextField required id="numHidrante" onChange={e => setNumHidrante(e.target.value)} style={{width:"90%" }} fullWidth variant="standard" label="Nº do Hidrante" defaultValue=""
              value={numHidrante}
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

export default EditLote;