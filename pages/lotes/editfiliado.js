import React, { useState, Component, useEffect } from 'react';
import { withIronSession } from "next-iron-session";
import { useRouter } from 'next/router';
import {Avatar, makeStyles, Modal, FormControl, FormLabel, Radio, RadioGroup,InputLabel,Fade,Zoom,Collapse,
    AppBar,Toolbar,    Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Menu, MenuItem,
    IconButton,Icon, Button, CssBaseline, TextField, FormControlLabel, Checkbox ,Grid,Box, Typography} from '@material-ui/core';


import Header from "../components/Header";
import {Facebook ,MoreVert,GroupAdd, Save,YouTube,AssignmentInd,Cancel, People,Delete} from '@material-ui/icons/';

import MenuIcon from '@material-ui/icons/Menu';

import fire from '../../config/fire-config';
import  Link from 'next/link';

const PrivatePage = ({ user }) => {
  const [blogs, setBlogs] = useState([]);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const router = useRouter();

const [cpfQuery,setCpfQuery] = useState(router.query.cpf);

useEffect(() => {
    console.log(cpfQuery);
    fire.database()
      .ref('filiados/'+cpfQuery)
      .once("value").then((snap) => {
        
        /*const blogs = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));*/
       
        var res = (snap.val())       
         setName(res.nome);       
        setSname(res.sname);
        setDataNasc(res.dataNasc);
        setDataAdm(res.dataAdm);
        setFuncao(res.funcao);
        setDataValid(res.dataValid);
        setNomePai(res.nomePai);
        setNomeMae(res.nomeMae);
        setRg(res.rg);
        setCpf(res.cpf);
        setNumCart(res.numCart);

         snap.forEach(function(childSnapshot) {
			 //console.log(childSnapshot);
			  // key will be "ada" the first time and "alan" the second time
			  var key = childSnapshot.key;
			  if(key == "dependentes"){
				  childSnapshot.forEach(function(deps) {
								let dep = deps.val();
						console.log(dep)
						let parentesco = dep.parentesco;
						let dataNascDep = dep.dataNasc;
						let rgDep = dep.rg;
						let cpfDep = dep.cpf;
						let nomeComp = dep.nomeComp;
						
						
						var newDep = {nomeComp,parentesco, dataNascDep, rgDep, cpfDep};
						setRows(prev => [...prev, newDep]);
				  });
			  }
			});  
        
      });
     
  }, []);

  


const handleRemoveItem = (selectedRow) => {
   // const name = selectedRow;
    setRows(rows.filter(item => item !== selectedRow));
  };
  
  class TabelaDependentes extends Component {
    render(){
      return(
            <div  style={{maxWidth:"90%"}}>
            <TableContainer component={Paper}>
                  <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow >
                        
                        <TableCell>Nome Completo</TableCell>
                        <TableCell align="right">Parentesco º</TableCell>
                        <TableCell align="right">Data de Nasc.</TableCell>
                        <TableCell align="right">RG</TableCell>
                        <TableCell align="right">CPF</TableCell>
                        <TableCell align="right">Ações</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => ( 
                        <TableRow key={row.nomeComp}  >
                          <TableCell component="th" scope="row">
                            {row.nomeComp}
                          </TableCell>
                          <TableCell align="right">{row.parentesco}</TableCell>
                          <TableCell align="right">{row.dataNascDep}</TableCell>
                          <TableCell align="right">{row.rgDep}</TableCell>
                          <TableCell align="right">{row.cpfDep}</TableCell>
                          <TableCell align="right"><Button color="secondary" onClick={() => handleRemoveItem(row)}><Delete/></Button></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
            </div>

        )

    }

}

class HeadDep extends Component {
  render(){
    if(open){
      return(
        

        <Grid container  alignItems="center" spacing={2}>  

          <Grid item xs={12} sm={4} >
           <Typography variant="h5"> Adicionar Dependentes</Typography>
          </Grid>
          <Grid item xs={12} sm={1} >
            
               <Button onClick={handleChange} color="primary">
                   <Cancel />
                   <Typography variant="h6"> cancelar</Typography>
                </Button>
             
          </Grid> 
          
        </Grid>

      );
    }else{
      return(
      

          <Grid container  alignItems="center" spacing={2}>  

            <Grid item xs={12} sm={4} >
            <Typography variant="h5"> Dependentes</Typography>
            </Grid>
            <Grid item xs={12} sm={1} >
              
                <Button onClick={handleChange} color="primary">
                    <GroupAdd />
                    <Typography variant="h6"> dependente</Typography>
                  </Button>
              
            </Grid> 
            
          </Grid>
      
      
        );



    }

  }


}

function atualizaTabelaDep(){

    var newDep = {nomeComp,parentesco, dataNascDep, rgDep, cpfDep};
    setRows(prev => [...prev, newDep]);
    console.log(newDep);
    
    console.log(rows);

}


let parentesco = "";
let dataNascDep = "";
let rgDep = "";
let cpfDep = "";
const [rows, setRows] = useState([]);

let nomeComp = "";

// const onChangeNomeComp = (event) => nome


const FormAddDep = () => (
	<Zoom in={open}>
          
        <Grid container  alignItems="center" spacing={4}>  
                  
            <Grid item xs={12} sm={4}> 
            <TextField required style={{width:"90%" }} fullWidth type="text"  variant="standard" id="nomeComp" label="Nome Completo"  
             onChange={e => nomeComp = e.target.value}
			 autoFocus
			 defaultValue={nomeComp}
            /></Grid>
            <Grid item xs={12} sm={4}> 
            <TextField required style={{width:"90%" }} fullWidth variant="standard"  id="parentesco" label="Grau de Parentesco"  
            onChange={e => parentesco = e.target.value}
            /></Grid>

            <Grid item xs={12} sm={4}> 
            <TextField
              variant="standard" 
                    id="date"
                    style={{width:"90%" }} fullWidth
                    label="Data de Nascimento"
                    type="date"
                    defaultValue="2017-05-24"
                    onChange={e => dataNascDep = e.target.value}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
            </Grid>
          
            <Grid item xs={12}  sm={4}> 
            <TextField required id="rg" style={{width:"90%" }} fullWidth  variant="standard"  label="RG obs: apenas numeros"
              onChange={(event) =>  rgDep = (event.target.value).replace(/\D/g, '')}

            /></Grid>
            <Grid item xs={12}  sm={4}> 
            <TextField required id="cpf" style={{width:"90%" }} fullWidth variant="standard" label="CPF obs: apenas numeros" 
            
            onChange={(event) =>  cpfDep = (event.target.value).replace(/\D/g, '')}
            /></Grid>
            <Grid item xs={12}  sm={4}> 
                <Button onClick={atualizaTabelaDep} style={{color:"green"}}>
                            <Save />
                            <Typography variant="h6"> confirmar</Typography>
                  </Button>          
            </Grid>
          
            </Grid>
    
      </Zoom> 
);
	


class AddDependentes extends Component {
	
    render(){
		
		
      if(open){
      return(
			<FormAddDep/>
        

      );
    }else{
      return(<div></div>);
    }
  }
}


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

  const handleChange = () => {
    setOpen((prev)=>!prev);
  };
  const handleChange2 = (event) => {
    setValue(event.target.value);
  };

  function salvarFiliado() {

    if(cpf == "" || cpf == null){
      alert("VERIFIQUE O CPF DIGITADO!");
    }else{
		console.log(cpf);
		console.log(cpfQuery);
        if(cpf != cpfQuery && cpfQuery != null) { fire.database().ref('filiados/'+cpfQuery).remove();}
            fire.database().ref('filiados/'+cpf ).set({
            nome:name,
            sname:sname,
            dataNasc:dataNasc,
            dataAdm:dataAdm,
            funcao:funcao,
            dataValid:dataValid,
            nomePai:nomePai,
            nomeMae:nomeMae,
            rg:rg,
            cpf:cpf,
            numCart:numCart
            }); 
          if(rows.length > 0){
            rows.map((row) => {
              fire.database().ref('filiados/'+cpf+"/dependentes/"+row.nomeComp).set({
                nomeComp:row.nomeComp,
                dataNasc:row.dataNascDep,
                parentesco:row.parentesco,
                rg:row.rgDep,
                cpf:row.cpfDep
              });
            });
          }
          router.push("/filiados");
    }
  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAnchor = () => {
    setAnchorEl(null);
  };

  
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


  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [name, setName] = useState("");
  const [sname, setSname] = useState("");
  const [dataNasc, setDataNasc] = useState("");
  const [dataAdm, setDataAdm] = useState("");
  const [funcao, setFuncao] = useState("");
  const [dataValid, setDataValid] = useState("");
  const [nomePai, setNomePai] = useState("");
  const [nomeMae, setNomeMae] = useState("");
  const [rg, setRg] = useState("");
  const [cpf, setCpf] = useState("");
  const [numCart, setNumCart] = useState("");

  
 const classes = useStyles();

    return(
  <div style={{overflow:"auto"}}>
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0, maximum-scale=1, minimum-scale=1"/>
     <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"></link>


   <Header/>   
   
       <form >
          <div style={{margin:"5% 0 0 5%"}}>
          <Grid container  alignItems="flex-start" spacing={2}>  
        
          <Grid item xs={12}> <Typography variant="h5"> Editar Filiado {name +" "+sname}</Typography>
              </Grid>
            
              <Grid item  xs={12} sm={8}> 
              <TextField required  
              onChange={e => setName(e.target.value)}
              style={{width:"90%" }} fullWidth  variant="standard" id="nome" label="Nome" value={name} />
              
              </Grid>
              <Grid item xs={12} sm={8}> 
              <TextField required style={{width:"90%" }} fullWidth variant="standard"  id="sobrenome" label="Sobrenome" value={sname} 
              onChange={e => setSname(e.target.value)}
              /></Grid>

              <Grid item xs={12} sm={6}> 
              <TextField
                variant="standard" 
                      id="date"
                      style={{width:"90%" }} fullWidth
                      label="Data de Nascimento"
                      type="date"
                      onChange={e => setDataNasc(e.target.value)}
                      value={dataNasc}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
              </Grid>
             <Grid item xs={12}  sm={6}> 
              <TextField
                      id="admissao"
                      style={{width:"90%" }} fullWidth
                      label="Data de Admissão"
                      variant="standard" 
                      type="date"
                      onChange={e => setDataAdm(e.target.value)}
                      value={dataAdm}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
              </Grid>
              <Grid item xs={12}  sm={4}>
              <TextField required id="funcao" style={{width:"90%" }} fullWidth variant="standard"  label="Função"  
              onChange={e => setFuncao(e.target.value)} value={funcao}
              /></Grid>
              
              <Grid item xs={12}  sm={4}> 
              <TextField
                      id="validade"
                      label="Validade da Carteira"
                      type="date"
                      style={{width:"90%" }} fullWidth
                      variant="standard" 
                      
                      onChange={e => setDataValid(e.target.value)}
                      value={dataValid}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
              </Grid>
             
              <Grid item xs={12}  sm={4}>
                <TextField required id="nomePai" style={{width:"90%" }} fullWidth variant="standard"  label="Nome do Pai"  
                onChange={e => setNomePai(e.target.value)} value={nomePai}
                /></Grid>
              <Grid item xs={12}  sm={4}>
                
              <TextField required id="nomeMar" style={{width:"90%" }} fullWidth variant="standard" label="Nome da Mãe" 
              onChange={e => setNomeMae(e.target.value)} value={nomeMae}
              /></Grid>
              <Grid item xs={12}  sm={4}> 
              <TextField required id="rg" style={{width:"90%" }} fullWidth variant="standard" label="RG obs: Apenas Números"  value={rg}
              onChange={(event) => {  setRg((event.target.value).replace(/\D/g, ''))}}
              /></Grid>
            
              <Grid item xs={12}  sm={4}> 
              <TextField required id="cpf" style={{width:"90%" }} fullWidth variant="standard" label="CPF obs: Apenas Números"  value={cpf}
              onChange={(event) => {  setCpf((event.target.value).replace(/\D/g, ''))}}
              /></Grid>
              <Grid item xs={12}  sm={2}> 
              <TextField required id="numSocio"  variant="standard" label="Carteira Nº"  
              onChange={e => setNumCart(e.target.value)} value={numCart}
              /></Grid>
             
            </Grid>
                      
              <HeadDep/>
              <AddDependentes/> 
          
              <Grid item xs={12}   style={{marginTop:"5%"}}>   <TabelaDependentes/></Grid>
              
           
              <Grid item xs={12} sm={4}  >  
              <Button onClick={salvarFiliado} style={{color:"green"}}>
                       <Save />
                       <Typography variant="h6"> salvar</Typography>
                </Button>    
                      


                </Grid>


              </div>

        </form>

          
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