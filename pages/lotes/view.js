import React, { useState, Component, useEffect } from 'react';
import { withIronSession } from "next-iron-session";
import { useRouter } from 'next/router';
import { Modal,    Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper, Button, TextField ,Grid, Typography
	,Snackbar} from '@material-ui/core';
import { Input } from 'reactstrap';
import TablePagination from '@material-ui/core/TablePagination';

import MuiAlert from '@material-ui/lab/Alert';

import {DoneOutline ,DoneAll, Close, MonetizationOn,Delete } from '@material-ui/icons';
import Header from "../components/Header";
import AddLeitura from './leituras/add'
import EditLote from './edit'
import fire from '../../config/fire-config';

import MyBackDrop from '../components/MyBackDrop';
import ajusteData from '../components/ajusteData';
import lotesStyles from './Lotes.module.css'


import hmacSHA256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';
import Utf8 from 'crypto-js/enc-utf8'

const ViewLote = ({ user }) => {

const router = useRouter();

const [id,setId] = useState(router.query.id);

const [pdf,setPdf] = useState('');
  
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


  useEffect(() => {
    
    fire.database()
      .ref('leituras/'+id).orderByChild('dataLeitura')
      .on("value",(snap) => {
        setRows([]);
        snap.forEach(function(childSnapshot) {
              const data = childSnapshot.key;
              const leitura = childSnapshot.val();
              const res = createDataLeitura( ajusteData(leitura.dataLeitura),leitura.valorLeitura,ajusteData(leitura.vencimento),leitura.totalConsumido, leitura.valorPagar,leitura.jaPago,leitura.txid,leitura.guia);
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
      backgroundColor: "#fafafa",
      position: 'absolute',
      padding: '25px'
    };
  }
  


const [modalStyle] = React.useState(getModalStyle);

const [openmul, setOpenmul] = React.useState(true);

const [rows2, setRows] = useState([]);
const [original, setOriginal] = useState([]);

  

  
function createDataLeitura(dataLeitura,valorLeitura,vencimento,totalConsumido,valorPagar,jaPago,txid,guia) {

  return {
     dataLeitura,valorLeitura,vencimento,totalConsumido,valorPagar,jaPago,txid,guia
  };
}

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
 
function ConfirmarDelete(){

	fire.auth().signInWithEmailAndPassword(user.email, password)
	  .then(async(e) => {
			setRows([]);

			fire.database().ref('leituras/'+id+'/'+rowSel.txid).remove().then(function() {
						
					setOpenModal(false);
				  });
			
	  })
	  .catch((error) => {
      setOpen(false)
      setAlertar(true)
	  });
}
function CancelarDelete(){	setOpenModal(false);}


const [openModal, setOpenModal] = React.useState(false);
const [openModalAdd, setOpenModalAdd] = React.useState(false);
const [openModalEdit, setOpenModalEdit] = React.useState(false);

 let password = "";

class ModalAdd extends Component{
  render(){
    return(
      <div >
        <Modal open={openModalAdd}  >
           <div style={modalStyle}  className={lotesStyles.paperAdd}>
             <AddLeitura id={id}/>
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
           <div style={modalStyle}  className={lotesStyles.paperAdd}>
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
          <div style={{padding:10}}>
            <Modal
                  open={openModal}                     
                >
                 <div style={modalStyle}  className={lotesStyles.paper}>
                       <Typography variant="h6"> Insira sua senha para confirmar exclusão</Typography>                            
                        <TextField onChange={event => password = (event.target.value)} fullWidth type="password" name="password" id="examplePassword" placeholder="Insira sua senha" />
                        <br/><br/>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="primary"
                          onClick={ConfirmarDelete}
                          >
                          CONFIRMAR EXCLUSÃO
                          </Button><br/><br/>
                          <Button
                          fullWidth
                          variant="contained" style={{backgroundColor:"red",color:"#fafafa"}}
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


const gerarGuia = (row) =>{
   let historico = [];

   rows2.map(r => {
        if(r.dataLeitura < row.dataLeitura){
            r.guia = '';
            historico.push(r);
        }
        if(historico.length == 6) return;
    })
 
    var header = {
        'alg' : 'HS256',
        'typ' : 'JWT'
    }
    header = Base64.stringify(Utf8.parse(JSON.stringify(header)));

    var payload = {
        'iss' : 'localhost',
        'valor' : row.valorPagar,
        'name' : name,
        'cpf': cpf,
        'metodo':'criarCobranca',
        'vencimento':row.vencimento,
        'dataLeitura': row.dataLeitura,
        'numHidrante':numHidrante,
        'quadra':quadra,
        'lote':lote,
        'valorLeitura':row.valorLeitura,
        'consumo':row.totalConsumido,
        'txid':row.txid,
        'historico':JSON.stringify(historico)
    }

    payload = Base64.stringify(Utf8.parse(JSON.stringify(payload)));
    
    const signature = Base64.stringify(hmacSHA256(header+"."+payload, process.env.KEY_JWT));
   // console.log('token '+ header+"."+payload+"."+signature); return;
    var formData = new FormData();
    formData.append('token', header+"."+payload+"."+signature);

    fetch('https://btgnews.tv.br/hidrogest/', {     
        method: 'POST',
        headers: {
            'Accept': 'application/pdf',
            'Content-Type': 'application/pdf'
          },
        body:JSON.stringify({token:header+"."+payload+"."+signature})
    })
    .then(response => response.json())
    .then(json => {
        //console.log(json.guia)

        fire.database()
        .ref('leituras/'+id+'/'+row.txid).update({
          guia : json.guia
        });

        fire.database()
        .ref('transactions').update({
          [row.txid] : id
        });

        fetch('data:application/pdf;base64,'+json.guia)
        .then(res => res.blob())
        .then(blob => {
          console.log(blob)
          var fileURL = URL.createObjectURL(blob);
          window.open(fileURL, '_blank');
          setOpen(false);
        })
       
    })
    /*.then(response => response.blob())
    .then(blob => {
        console.log(blob)
        var fileURL = URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
        setOpen(false);
    })*/
    .catch(error => console.log('Authorization failed: ' + error.message));


}

const reimprimirGuia = (row) => {
    fetch('data:application/pdf;base64,'+row.guia)
    .then(res => res.blob())
    .then(blob => {
      console.log(blob)
      var fileURL = URL.createObjectURL(blob);
      window.open(fileURL, '_blank');
      setOpen(false);
    })
}



const [open, setOpen] = React.useState(false);

function Row(props) {
  const { row } = props;
  
	
  return (
    <React.Fragment>
      <TableRow >

       

        <TableCell align="center">{row.dataLeitura}</TableCell>
        <TableCell align="center">{row.vencimento}</TableCell>
        <TableCell align="center">{row.valorLeitura}</TableCell>
        <TableCell align="center">{row.totalConsumido}</TableCell>
        <TableCell align="center">R$ {row.valorPagar}</TableCell>
         <TableCell >
		<div >
            {row.jaPago ?
                <DoneOutline/>

            : 
              row.guia ?
                  <Grid container >                    
                    
                  <Grid item xs={12} sm={6}>
                      <Button  type="button" color="primary" variant="contained" onClick={() => {reimprimirGuia(row),setOpen(true)}} startIcon={<MonetizationOn/>}> Imprimir Guia</Button>
                  </Grid>
                  </Grid>
              :

                <Grid container >                    
                
                    <Grid item xs={12} sm={6}>
                        <Button  type="button" color="primary" variant="contained" onClick={() => {gerarGuia(row),setOpen(true)}} startIcon={<MonetizationOn/>}> Gerar Guia</Button>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                  <Button  type="button" color="secondary" variant="contained" onClick={() => {setOpenModal(true),setRowSel(row)}} startIcon={<Delete />} > Delete</Button>
                    </Grid>
                </Grid>
            }
		
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


function dataNasc(data){
	
	if(!data){
		return "";
	}else{
		return data[8]+data[9]+"/"+data[5]+data[6]+"/"+data[0]+data[1]+data[2]+data[3];
	}
}

function OpenCheckBox(){ setOpenmul(!openmul); }
function OpenAddLeitura(){ setOpenModalAdd(!openModalAdd)}
function OpenEditModal(){  setOpenModalEdit(!openModalEdit)}


function Procurar(e){


	var valor = e.target.value;
	 
	const filteredRows = original.filter((row) => {

		return (row.dataLeitura+row.vencimento+row.valorLeitura+row.totalConsumido+row.valorPagar).toLowerCase().includes(valor.toLowerCase());
  });
  setRows(filteredRows);
	
}

const [page, setPage] = React.useState(0);
const [rowsPerPage, setRowsPerPage] = React.useState(5);

const handleChangePage = (event, newPage) => {
    setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};

    return(
	<>
	 
  
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0, maximum-scale=1, minimum-scale=1"/>
     <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"></link>

	  
		<Header/>
        <div style={{margin:"1vw 0 0 5%"}}>
          <Grid container >  
              <Grid item xs={12} ></Grid>
                    
             
              <Grid item xs={12} sm={8}>
               <Typography variant="h5"> Lote {lote}, Quadra {quadra} de {name}</Typography>
              </Grid>
              <Grid item xs={12} sm={4}></Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2">Nº do Hidrante {numHidrante}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}></Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2">Data da 1ª Leitura {ajusteData(dataPrimLeitura)}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}></Grid>
              
        </Grid> 
        
        <Grid container style={{marginTop:'5vw'}}> 
             
           
              <Grid item xs={12}></Grid>

              <Grid item xs={12} sm={8}>
                <Typography variant="h6">Informações sobre as Leituras</Typography>
              </Grid>
              <Grid item xs={12} sm={2}>
                    <Button color="primary" onClick={OpenAddLeitura}>
                       <Typography variant="h6"> +Leitura</Typography>
                    </Button>
               </Grid>
              <Grid item xs={10} style={{maxWidth:"100%"}}>
                <TableContainer style={{backgroundColor:"unset"}} component={Paper}>
					<TextField label="Digite aqui para procurar pela data da leitura, vencimento, o valor, o total consumido e o valor a pagar"  onChange={(e)=>Procurar(e)} fullWidth/>
					  <Table aria-label="collapsible table">
						  
						<TableHead>
						  <TableRow>
							<TableCell>Data</TableCell>
							<TableCell align="right">Vencimento</TableCell>
							<TableCell align="right">Valor da Leitura</TableCell>
							<TableCell align="right">Total consumido</TableCell>
							<TableCell align="right">Valor a pagar</TableCell>
							<TableCell >Já pago?</TableCell>

						  </TableRow>
						</TableHead>
						<TableBody>
						  {rows2.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,index) => (
							<Row key={row.dataLeitura} row={row} />
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
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
						/>
              </Grid>



          </Grid>
		
          </div>
		  <AbrirModalChangeServer/>
            <ModalAdd />
            <ModalEdit />
            <object data={pdf} type="application/pdf">
                <div>No PDF viewer available</div>
            </object>

            {open &&
                <MyBackDrop />
            }
            <Snackbar open={alertar} autoHideDuration={6000} onClose={handleClose}>
              <div>

              <Alert onClose={handleClose} severity="error">
                Senha incorreta! tente novamente
              </Alert>
              </div>
            </Snackbar>
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

export default ViewLote;