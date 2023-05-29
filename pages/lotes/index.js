import React, { useState, Component, useEffect } from 'react';
import { withIronSession } from "next-iron-session";
import { useRouter } from 'next/router';
import {Backdrop, makeStyles, Modal, FormControl, FormLabel, Radio, RadioGroup,InputLabel,Collapse,
    AppBar,Toolbar,    Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,
    IconButton,Icon, Button, CssBaseline, TextField, FormControlLabel, Checkbox ,Grid,Box, Typography,
	CardContent, CircularProgress, ButtonBase, CardActionArea, Card
	} from '@material-ui/core';
import {Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TablePagination from '@material-ui/core/TablePagination';
import lotesStyles from './Lotes.module.css'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import {Facebook ,DoneAll, Close, ViewModule, Edit, Save,YouTube,AssignmentInd, Delete, People,KeyboardArrowDown,KeyboardArrowUp,
Print, Input as InputButton
} from '@material-ui/icons/';
import MenuIcon from '@material-ui/icons/Menu';
import Header from "../components/Header";
import AddLotes from './add'
import EditLote from './edit'
import fire from '../../config/fire-config';
import  Link from 'next/link';

import ajusteData from '../components/ajusteData';

const PrivatePage = ({ user }) => {
 
  
useEffect(() => {
    fire.database()
      .ref('lotes').orderByChild("lote")
      .on("value",(snap) => {
        
		 snap.forEach(function(childSnapshot) {
          
          const id = childSnapshot.key;
          const lote = childSnapshot.val();
          const res = createDataLote( lote.nomeResp,lote.lote,lote.quadra,lote.numHidrante,ajusteData(lote.dataPrimLeitura), lote.cpf, id);
          setRows(prev=>[res,...prev]);
          setOriginal(prev=>[res,...prev]);

		  });
	     
      });
  }, []);

  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 ;
    const left = 50 ;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
	  backgroundColor: "#fafafa"
    };
  }
  

  const useStyles2 = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
	 
    },
    paperAdd:{
      position: 'absolute',
      width: 700,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    }
  }));
  const classes2 = useStyles2();
  const [modalStyle] = React.useState(getModalStyle);

  const [openmul, setOpenmul] = React.useState(true);

const [rows2, setRows] = useState([]);
const [original, setOriginal] = useState([]);

  

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
  
  const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'groove',
	  maxWidth: "100%"
    },
	
  },
  
});
  
function createDataLote(nomeResp,lote,quadra,numHidrante,dataPrimLeitura,cpf,id) {

  return {
     nomeResp,
    lote,
    quadra,
    numHidrante,
    dataPrimLeitura,
    cpf,
    id
  };
}

const router = useRouter();


 
 
function ConfirmarDelete(){

	fire.auth().signInWithEmailAndPassword(user.email, password)
	  .then(async(e) => {
			setRows([]);
			fire.database().ref('lotes/'+rowSel.id).remove().then(function() {
          fire.database().ref('leituras/'+rowSel.id).remove().then(function() {
              setOpenModal(false);
          });
      });
			
	  })
	  .catch((error) => {
		var errorCode = error.code;
		var errorMessage = error.message;
		// ..
	  });
}
function CancelarDelete(){	setOpenModal(false);}


const [openModal, setOpenModal] = React.useState(false);
const [openModalAdd, setOpenModalAdd] = React.useState(false);
const [openModalEdit, setOpenModalEdit] = React.useState(false);

const [numHidrante, setNumHidranteToDel] = React.useState();
let password = "";

class ModalAdd extends Component{
  render(){
    return(
      <div >
        <Modal open={openModalAdd}  >
           <div style={modalStyle}  className={classes2.paperAdd}>
             <AddLotes/>
            </div>
          </Modal>
      </div>
    )

  }
}

class ModalEdit extends Component{
  render(){

    return(
      <div >
        <Modal open={openModalEdit}  >
           <div style={modalStyle}  className={classes2.paperAdd}>
             <EditLote id={rowSel.id}/>
            </div>
          </Modal>
      </div>
    )

  }
}
  
  class AbrirModalChangeServer extends Component {
      render(){

          return(
              <div >
                <Modal
                      open={openModal}                     
                    >
                     <div style={modalStyle}  className={classes2.paper}>
                            <h2 id="simple-modal-title">Insira sua senha para confirmar exclusão</h2>
                            
							<Input onChange={event => password = (event.target.value)} type="password" name="password" id="examplePassword" placeholder="Insira sua senha" />
							<br/><br/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
								onClick={ConfirmarDelete}
							  >
								CONFIRMAR EXCLUSÃO
							  </Button><br/><br/>
							  <Button
								fullWidth
								variant="contained" style={{backgroundColor:"red",color:"#fafafa"}}
								className={classes.submit}
								onClick={CancelarDelete}
							  >
								Cancelar
							  </Button>
						  </div>
                    </Modal>
              </div>

          )

      }

  }

const [rowSel, setRowSel] = React.useState([]);




function Row(props) {
  const { row,index } = props;
  const [open, setOpen] = React.useState(false);
  const classesR = useRowStyles();
	
  return (
    <React.Fragment>
      <TableRow >

       

        <TableCell align="center">{row.quadra}</TableCell>
        <TableCell align="center">{row.lote}</TableCell>
        <TableCell align="center">{row.numHidrante}</TableCell>
        <TableCell align="center">{row.dataPrimLeitura}</TableCell>
        <TableCell align="center">{row.nomeResp}</TableCell>
         <TableCell >
		<div >
			<Button className={lotesStyles.icons} type="button" onClick={() => {router.push({pathname:"/lotes/view", query:{id:row.id}})}}><InputButton/></Button>
			<Button className={lotesStyles.icons} type="button" onClick={() => {setOpenModal(true),setRowSel(row)}}><Delete/></Button>
			<Button className={lotesStyles.icons} type="button" onClick={() => {OpenEditModal(),setRowSel(row)}}><Edit/></Button>
		</div>
		</TableCell>
       </TableRow>
    
    </React.Fragment>
  );
}
  
const [arrayCarts, setArrayCarts] = React.useState([]);
const [cartsCheck, setCartsCheck] = React.useState([]);
const [imgsLoaded, setImgsLoaded] = React.useState('');
function addArrayCarts(event){
   
  let fs = JSON.parse(event.target.value);
  if(cartsCheck[fs.cpf]){
    cartsCheck[fs.cpf] = false;
    
    setArrayCarts(arrayCarts.filter(item => item.cpf !== fs.cpf));
  }else{
     cartsCheck[fs.cpf] = true;
     setArrayCarts(prev=>[...prev,fs]);
  }

  //  let cpf = fs.cpf;
   // setCartsCheck(prev=>[cpf,true])
  

}


const [selAll, setSelAll] = React.useState(true);
	const ref = React.createRef();
	const refBC = React.createRef();

function SelAll(){
  rows2.map((row) => {

    cartsCheck[row.cpf] = true;     
     setArrayCarts(prev=>[...prev,row]); 
    
  });
  setSelAll(!selAll);

}
function DesAll(){
  rows2.map((row) => {  
     cartsCheck[row.cpf] = false;
     setArrayCarts([]);
    
  });
  setSelAll(!selAll);
}

function SelecionaTodas(){

    if(selAll){
      return(
      <Button color="primary" onClick={SelAll}>
        <DoneAll /><Typography variant="h6">Selecionar Todas</Typography>
      </Button>);
    }else{
        return(
        <Button color="primary" onClick={DesAll}>
        <Close /><Typography variant="h6">Desmarcar Todas</Typography>
      </Button>);
    }
  
}

const useStylesCarts = makeStyles((theme) => ({
 
  paper: {
    maxWidth: 525,
	border: "groove",
    borderWidth: "7px",
    borderColor: "black",
	padding: "5px"
  },
  image: {
    width: 194,
    height: 194,
	marginTop: "-31%",
    marginLeft: "-20%"
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '62%',
    maxHeight: '75%',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
 
}));
const classes = useStylesCarts();

function dataNasc(data){
	
	if(!data){
		return "";
	}else{
		return data[8]+data[9]+"/"+data[5]+data[6]+"/"+data[0]+data[1]+data[2]+data[3];
	}
}

function OpenCheckBox(){ setOpenmul(!openmul); }
function OpenAddModal(){ setOpenModalAdd(!openModalAdd)}
function OpenEditModal(){  setOpenModalEdit(!openModalEdit)}



const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
	  
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

function Procurar(e){
	var valor = e.target.value;
	const filteredRows = original.filter((row) => {

		return (row.nomeResp+row.numHidrante+row.lote+row.quadra+row.dataPrimLeitura).toLowerCase().includes(valor.toLowerCase());
	  });
	  setRows(filteredRows);
	
}

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const classesP = useStylesCarts();

    return(
	<>
	 
  
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0, maximum-scale=1, minimum-scale=1"/>
     <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"></link>

	  
		<Header/>
        <div style={{margin:"8vw 0 0 5%"}}>
          <Grid container >  
              <Grid item xs={12} ></Grid>
                    
              <Grid item xs={12} sm={2}></Grid>
              <Grid item xs={12} sm={3}>
               <Typography variant="h5"> Informações sobre os Lotes</Typography>
              </Grid>
              <Grid item xs={12} sm={1}></Grid>
              <Grid item xs={12} sm={2}></Grid>
              <Grid item xs={12} sm={2}></Grid>
              
              <Grid item xs={12} sm={2}>
                    <Button color="primary" onClick={OpenAddModal}>
                       <Typography variant="h6"> +Lotes</Typography>
                       <ViewModule />
                    </Button>
               </Grid>
             
              
           
              <Grid item xs={12}></Grid>


              <Grid item xs={8} style={{maxWidth:"100%"}}>
                <TableContainer style={{backgroundColor:"unset"}} component={Paper}>
					<TextField label="Digite aqui para procurar pelo Nome do Responsável,quadra, lote ou numero do hidrante"  onChange={(e)=>Procurar(e)} fullWidth/>
					  <Table aria-label="collapsible table">
						  
						<TableHead>
						  <TableRow>
							<TableCell>Quadra</TableCell>
							<TableCell align="right">Lote</TableCell>
							<TableCell align="right">Nº do Hidrante</TableCell>
							<TableCell align="right">Data da 1ª Leitura</TableCell>
							<TableCell align="right">Nome do Responsável</TableCell>
							<TableCell >Ações</TableCell>

						  </TableRow>
						</TableHead>
						<TableBody>
						  {rows2.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,index) => (
							<Row key={row.cpf} row={row} />
						  ))}
						</TableBody>
					  </Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[5, 10, 25]}
						component="div"
						count={rows2.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onChangePage={handleChangePage}
						onChangeRowsPerPage={handleChangeRowsPerPage}
						/>
              </Grid>



          </Grid>
		
          </div>
		  <AbrirModalChangeServer/>
      <ModalAdd />
      <ModalEdit />
		 
		  </>);
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