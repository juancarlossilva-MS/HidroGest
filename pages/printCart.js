import React, {useState, useEffect, Component, PropTypes} from "react";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import {Typography, CardContent, LinearProgress, ButtonBase, Paper, Box, Button, CardActionArea, Grid, Card, Avatar} from "@material-ui/core";
import fire from '../config/fire-config';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRouter } from 'next/router'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
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
 
}));


const theme = createMuiTheme();
theme.typography.body2 = {
  fontSize: '1.2rem'
}
	
	
function Carteira (){
	const router = useRouter();
	 console.log(query);
	
		let k = 0;
		function MoldeCarteira(arrayFili){

			let k =0;
			const row = [];
			for(k=0;k<arrayFili.length;k++){
				/*if(arrayFili[k+1] != null){
				row.push(
				<Grid container  >
											
								<Grid item xs={3}  >
									<Paper className={classes.paper} style={{maxHeight:"200px", maxWidth:"335px",minHeight:"200px", minWidth:"335px",height:"200px"}}>
										<Grid container spacing={0} style={{maxHeight:"97px",minHeight:"97px"}}>
										<Grid item>
											<ButtonBase className={classes.image}>
											<img className={classes.img} style={{ maxWidth: '62%',minWidth: '62%'}} alt="complex" src="logo.jpg" />
											</ButtonBase>
										</Grid>
										<Grid item xs={12} sm container style={{marginLeft:"-23%",marginRight:"-4%"}}>
											<Grid item xs container direction="column" spacing={0} style={{marginTop:"-6%"}}>
											<Grid item xs>
												<Typography align="center" style={{
													fontWeight: 'bold', fontFamily: '-webkit-body', letterSpacing: '-1px', fontSize: '33px'}}  variant="h5">
												S    I    N   D I F P M
												</Typography>
												<Typography style={{fontSize: "0.8rem", marginTop:"-5%"}} align="center" variant="h6"  >
													<Box lineHeight={1} m={1}>
													Sindicato dos Funcionários Públicos Municipais de Bataguassu - MS
													</Box>
												</Typography>
												
												<Typography align="center" variant="caption" color="" style={{    fontSize: "0.54rem"}}>
													<Box lineHeight={1} m={1} style={{marginRight:"2%",marginLeft:"-1%", marginTop:"-2%"}}>
													Reg. Min. Trabalho e Emprego 46.000.004428/01-11<br/>
													Rua Brasilândia, Nº 495 - Centro <br/>
													Fone: (67) 3541-1065
													</Box>
												</Typography>
											<Typography align="center" variant="body2" style={{fontSize: "0.68rem"}} color="">
												Carteira de Sócio Nº: 
												</Typography>
											</Grid>
											</Grid>
											
										</Grid>
										</Grid>
										<Grid container spacing={1}>
										<Grid item  style={{padding:"2px"}}>
											<Typography align="center" variant="body2" style={{fontSize: "0.68rem"}} color="">
													Nome: {arrayFili[k].nome + " "+arrayFili[k].sname}
											</Typography>
										</Grid>
										</Grid>
										<Grid container spacing={1}>
										<Grid item style={{padding:"2px"}}>
											<Typography align="center" variant="body2" style={{fontSize: "0.68rem"}} color="">
												Função: 
											</Typography>
										</Grid>
										</Grid>
										<Grid container spacing={1}>
										<Grid item xs={12} sm={6} style={{padding:"2px"}}>
											<Typography  variant="body2" style={{fontSize: "0.68rem"}} color="">
												Data de Admissão: 
											</Typography>
										</Grid>
										<Grid item xs={12} sm={6} style={{padding:"2px"}}>
											<Typography  variant="body2" style={{fontSize: "0.68rem"}} color="">
												Válida até: 
											</Typography>
										</Grid>
										</Grid>
										<Grid container spacing={2} >
										<Grid item xs={12} style={{padding:"6px"}}>
											<Typography align="right" style={{fontSize: "0.68rem"}} variant="body2" color="">
												Bataguassu 12 de Outubro de 2020
											</Typography>
										</Grid>
										</Grid>
										<Grid container spacing={7}>
										<Grid item xs={12} style={{padding:"22px"}}>
											<Typography align="center" style={{fontSize: "0.68rem"}} variant="body2" color="">
												____________________
												
											</Typography>
											<Typography align="center"  style={{fontSize: "0.68rem"}} variant="body2" color="">
												
												Presidente
											</Typography>
										</Grid>
										</Grid>
									</Paper>
									<Paper className={classes.paper} style={{maxHeight:"200px", maxWidth:"335px",minHeight:"200px", minWidth:"335px",height:"200px"}}>
									<Grid container spacing={0} style={{maxHeight:"97px"}}>
									
									
										<Grid item xs>
											<Typography align="center" style={{
												fontWeight: 'bold', fontFamily: '-webkit-body', letterSpacing: '-1px', fontSize: '33px'}}  variant="h5">
											FILIAÇÃO
											</Typography>
											
										</Grid>
									
									</Grid>
									<Grid container spacing={1}>
										<Grid item  style={{padding:"2px"}}>
											<Typography align="center" variant="body2" style={{fontSize: "1.2rem"}} color="">
													Pai: {arrayFili[k].nomePai}
											</Typography>
										</Grid>
										</Grid>
										<Grid container spacing={1}>
											<Grid item  style={{padding:"2px"}}>
												<Typography align="center" variant="body2" style={{fontSize: "1.2rem"}} color="">
														Mãe: {arrayFili[k].nomeMae}
												</Typography>
											</Grid>
										</Grid>
										<Grid container spacing={1}>
											<Grid item  style={{padding:"2px"}}>
												<Typography align="center" variant="body2" style={{fontSize: "1.2rem"}} color="">
														RG: {arrayFili[k].rg}
												</Typography>
											</Grid>
										</Grid>
										<Grid container spacing={1}>
											<Grid item  style={{padding:"2px"}}>
												<Typography align="center" variant="body2" style={{fontSize: "1.2rem"}} color="">
														Data de Nacimento: {dataNasc(arrayFili[k].dataNasc)}
												</Typography>
											</Grid>
										</Grid>
										<Grid container spacing={1}>

											<Grid item  style={{padding:"2px"}}>
												<Typography align="center" variant="body2" style={{fontSize: "1.2rem"}} color="">
														CPF: {arrayFili[k].cpf}
												</Typography>
											</Grid>
										</Grid>


									

								</Paper>
								</Grid>
							
								<Grid item xs={3}  >
									<Paper className={classes.paper} style={{maxHeight:"200px", maxWidth:"335px",minHeight:"200px", minWidth:"335px",height:"200px"}}>
										<Grid container spacing={0} style={{maxHeight:"97px",minHeight:"97px"}}>
										<Grid item>
											<ButtonBase className={classes.image}>
											<img className={classes.img} style={{ maxWidth: '62%',minWidth: '62%'}} alt="complex" src="logo.jpg" />
											</ButtonBase>
										</Grid>
										<Grid item xs={12} sm container style={{marginLeft:"-23%",marginRight:"-4%"}}>
											<Grid item xs container direction="column" spacing={0} style={{marginTop:"-6%"}}>
											<Grid item xs>
												<Typography align="center" style={{
													fontWeight: 'bold', fontFamily: '-webkit-body', letterSpacing: '-1px', fontSize: '33px'}}  variant="h5">
												S    I    N   D I F P M
												</Typography>
												<Typography style={{fontSize: "0.8rem", marginTop:"-5%"}} align="center" variant="h6"  >
													<Box lineHeight={1} m={1}>
													Sindicato dos Funcionários Públicos Municipais de Bataguassu - MS
													</Box>
												</Typography>
												
												<Typography align="center" variant="caption" color="" style={{    fontSize: "0.54rem"}}>
													<Box lineHeight={1} m={1} style={{marginRight:"2%",marginLeft:"-1%", marginTop:"-2%"}}>
													Reg. Min. Trabalho e Emprego 46.000.004428/01-11<br/>
													Rua Brasilândia, Nº 495 - Centro <br/>
													Fone: (67) 3541-1065
													</Box>
												</Typography>
											<Typography align="center" variant="body2" style={{fontSize: "0.68rem"}} color="">
												Carteira de Sócio Nº: 
												</Typography>
											</Grid>
											</Grid>
											
										</Grid>
										</Grid>
										<Grid container spacing={1}>
										<Grid item  style={{padding:"2px"}}>
											<Typography align="center" variant="body2" style={{fontSize: "0.68rem"}} color="">
													Nome: {arrayFili[k+1].nome + " "+arrayFili[k+1].sname}
											</Typography>
										</Grid>
										</Grid>
										<Grid container spacing={1}>
										<Grid item style={{padding:"2px"}}>
											<Typography align="center" variant="body2" style={{fontSize: "0.68rem"}} color="">
												Função: 
											</Typography>
										</Grid>
										</Grid>
										<Grid container spacing={1}>
										<Grid item xs={12} sm={6} style={{padding:"2px"}}>
											<Typography  variant="body2" style={{fontSize: "0.68rem"}} color="">
												Data de Admissão: 
											</Typography>
										</Grid>
										<Grid item xs={12} sm={6} style={{padding:"2px"}}>
											<Typography  variant="body2" style={{fontSize: "0.68rem"}} color="">
												Válida até: 
											</Typography>
										</Grid>
										</Grid>
										<Grid container spacing={2} >
										<Grid item xs={12} style={{padding:"6px"}}>
											<Typography align="right" style={{fontSize: "0.68rem"}} variant="body2" color="">
												Bataguassu 12 de Outubro de 2020
											</Typography>
										</Grid>
										</Grid>
										<Grid container spacing={7}>
										<Grid item xs={12} style={{padding:"22px"}}>
											<Typography align="center" style={{fontSize: "0.68rem"}} variant="body2" color="">
												____________________
												
											</Typography>
											<Typography align="center"  style={{fontSize: "0.68rem"}} variant="body2" color="">
												
												Presidente
											</Typography>
										</Grid>
										</Grid>
									</Paper>
									<Paper className={classes.paper} style={{maxHeight:"200px", maxWidth:"335px",minHeight:"200px", minWidth:"335px",height:"200px"}}>
									<Grid container spacing={0} style={{maxHeight:"97px"}}>
										<Grid item xs>
											<Typography align="center" style={{
												fontWeight: 'bold', fontFamily: '-webkit-body', letterSpacing: '-1px', fontSize: '33px'}}  variant="h5">
											FILIAÇÃO
											</Typography>
											
										</Grid>
									
									</Grid>
									<Grid container spacing={1}>
										<Grid item  style={{padding:"2px"}}>
											<Typography align="center" variant="body2" style={{fontSize: "1.2rem"}} color="">
													Pai: {arrayFili[k+1].nomePai}
											</Typography>
										</Grid>
										</Grid>
										<Grid container spacing={1}>
											<Grid item  style={{padding:"2px"}}>
												<Typography align="center" variant="body2" style={{fontSize: "1.2rem"}} color="">
														Mãe: {arrayFili[k+1].nomeMae}
												</Typography>
											</Grid>
										</Grid>
										<Grid container spacing={1}>
											<Grid item  style={{padding:"2px"}}>
												<Typography align="center" variant="body2" style={{fontSize: "1.2rem"}} color="">
														RG: {arrayFili[k+1].rg}
												</Typography>
											</Grid>
										</Grid>
										<Grid container spacing={1}>
											<Grid item  style={{padding:"2px"}}>
												<Typography align="center" variant="body2" style={{fontSize: "1.2rem"}} color="">
														Data de Nacimento: {dataNasc(arrayFili[k+1].dataNasc)}
												</Typography>
											</Grid>
										</Grid>
										<Grid container spacing={1}>

											<Grid item  style={{padding:"2px"}}>
												<Typography align="center" variant="body2" style={{fontSize: "1.2rem"}} color="">
														CPF: {arrayFili[k+1].cpf}
												</Typography>
											</Grid>
										</Grid>


									

								</Paper>
								</Grid>
								
					
					</Grid>);
				k++;
				row.push(<br/>);
				}else{*/
					row.push(
						<Grid container id={"divisor"+k} >
													
										<Grid item xs={3}  >
											<Paper className={classes.paper} style={{maxHeight:"200px", maxWidth:"335px",minHeight:"200px", minWidth:"335px",height:"200px"}}>
											<Grid container spacing={0} style={{maxHeight:"97px",minHeight:"97px"}}>
												<Grid item>
													<ButtonBase className={classes.image}>
													<img className={classes.img} style={{ maxWidth: '62%', minWidth: '62%'}} alt="complex" src="logo.jpg" />
													</ButtonBase>
												</Grid>
												<Grid item xs={12} sm container style={{marginLeft:"-23%",marginRight:"-4%"}}>
													<Grid item xs container direction="column" spacing={0} style={{marginTop:"-6%"}}>
													<Grid item xs>
														<Typography align="center" style={{
															fontWeight: 'bold', fontFamily: '-webkit-body', letterSpacing: '-1px', fontSize: '33px'}}  variant="h5">
														S    I    N   D I F P M
														</Typography>
														<Typography style={{fontSize: "0.8rem", marginTop:"-5%"}} align="center" variant="h6"  >
															<Box lineHeight={1} m={1}>
															Sindicato dos Funcionários Públicos Municipais de Bataguassu - MS
															</Box>
														</Typography>
														
														<Typography align="center" variant="caption" color="" style={{    fontSize: "0.54rem"}}>
															<Box lineHeight={1} m={1} style={{marginRight:"2%",marginLeft:"-1%", marginTop:"-2%"}}>
															Reg. Min. Trabalho e Emprego 46.000.004428/01-11<br/>
															Rua Brasilândia, Nº 495 - Centro <br/>
															Fone: (67) 3541-1065
															</Box>
														</Typography>
													<Typography align="center" variant="body2" style={{fontSize: "0.68rem"}} color="">
														Carteira de Sócio Nº: 
														</Typography>
													</Grid>
													</Grid>
													
												</Grid>
												</Grid>
												<Grid container spacing={1}>
												<Grid item  style={{padding:"2px"}}>
													<Typography align="center" variant="body2" style={{fontSize: "0.68rem"}} color="">
															Nome: {arrayFili[k].nome + " "+arrayFili[k].sname}
													</Typography>
												</Grid>
												</Grid>
												<Grid container spacing={1}>
												<Grid item style={{padding:"2px"}}>
													<Typography align="center" variant="body2" style={{fontSize: "0.68rem"}} color="">
														Função: 
													</Typography>
												</Grid>
												</Grid>
												<Grid container spacing={1}>
												<Grid item xs={12} sm={6} style={{padding:"2px"}}>
													<Typography  variant="body2" style={{fontSize: "0.68rem"}} color="">
														Data de Admissão: 
													</Typography>
												</Grid>
												<Grid item xs={12} sm={6} style={{padding:"2px"}}>
													<Typography  variant="body2" style={{fontSize: "0.68rem"}} color="">
														Válida até: 
													</Typography>
												</Grid>
												</Grid>
												<Grid container spacing={2} >
												<Grid item xs={12} style={{padding:"6px"}}>
													<Typography align="right" style={{fontSize: "0.68rem"}} variant="body2" color="">
														Bataguassu 12 de Outubro de 2020
													</Typography>
												</Grid>
												</Grid>
												<Grid container spacing={7}>
												<Grid item xs={12} style={{padding:"22px"}}>
													<Typography align="center" style={{fontSize: "0.68rem"}} variant="body2" color="">
														____________________
														
													</Typography>
													<Typography align="center"  style={{fontSize: "0.68rem"}} variant="body2" color="">
														
														Presidente
													</Typography>
												</Grid>
												</Grid>
											</Paper>
											<Paper className={classes.paper} style={{maxHeight:"200px", maxWidth:"335px",minHeight:"200px", minWidth:"335px",height:"200px"}}>
											<Grid container spacing={0} style={{maxHeight:"97px"}}>
									
									
											
											
												<Grid item xs>
													<Typography align="center" style={{
														fontWeight: 'bold', fontFamily: '-webkit-body', letterSpacing: '-1px', fontSize: '33px'}}  variant="h5">
													FILIAÇÃO
													</Typography>
													
												</Grid>
											
											</Grid>
											<Grid container spacing={1}>
												<Grid item  style={{padding:"2px"}}>
													<Typography align="center" variant="body2" style={{fontSize: "1.2rem"}} color="">
															Pai: {arrayFili[k].nomePai}
													</Typography>
												</Grid>
												</Grid>
												<Grid container spacing={1}>
													<Grid item  style={{padding:"2px"}}>
														<Typography align="center" variant="body2" style={{fontSize: "1.2rem"}} color="">
																Mãe: {arrayFili[k].nomeMae}
														</Typography>
													</Grid>
												</Grid>
												<Grid container spacing={1}>
													<Grid item  style={{padding:"2px"}}>
														<Typography align="center" variant="body2" style={{fontSize: "1.2rem"}} color="">
																RG: {arrayFili[k].rg}
														</Typography>
													</Grid>
												</Grid>
												<Grid container spacing={1}>
													<Grid item  style={{padding:"2px"}}>
														<Typography align="center" variant="body2" style={{fontSize: "1.2rem"}} color="">
																Data de Nacimento: {dataNasc(arrayFili[k].dataNasc)}
														</Typography>
													</Grid>
												</Grid>
												<Grid container spacing={1}>
		
													<Grid item  style={{padding:"2px"}}>
														<Typography align="center" variant="body2" style={{fontSize: "1.2rem"}} color="">
																CPF: {arrayFili[k].cpf}
														</Typography>
													</Grid>
												</Grid>
		
		
											
		
										</Paper>
										</Grid>
							</Grid>		
					);	
					row.push(<br/>);
				
			}
						
				
		
			return row;
		

		}
	

  const classes = useStyles();
	const [logo, setLogo] = useState("");

	/*const storageRef = fire.storage().ref();
	storageRef.child('logo.jpg').getDownloadURL().then(function(url) {
	  // `url` is the download URL for 'images/stars.jpg'

	  // This can be downloaded directly:
	  var xhr = new XMLHttpRequest();
	  xhr.responseType = 'blob';
	  xhr.onload = function(event) {
		var blob = xhr.response;
	  };
	  xhr.open('GET', url);
	  xhr.send();
		setLogo(url);
	}).catch(function(error) {
	  // Handle any errors
	});*/
	
	const ref = React.createRef();
	


		//var a = document.createElement('a');
        // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
      //  a.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      //  a.download = 'somefilename.png';
      //  a.click();
	/*var height = 1122.52;

	const totPage = (Math.ceil(canvas.height/height));
	//pdf.addImage(imgData, 'PNG', 0,0,424,123);
	for (var i = 1; i <= totPage; i++) {
		pdf.addPage();
		pdf.addImage(imgData, 'JPG', 0,0,424,123)
	}*/

function	printDocument() {
	console.log("inicio do salvamento");
	
	var pdf = new jsPDF("p", "mm", "a4");
	const data  = '';
	for(let s=0;s< filiSelect.length;s++){
		const input = document.getElementById('divisor'+s);
		setExibe(true);
		html2canvas(input,{scale:4,scrollY: -window.scrollY,windowWidth:1600,height:1400})
		.then((canvas) => {
			
			const imgData = canvas.toDataURL('image/jpeg',0.3);
			pdf.addImage(imgData, 'JPEG', 0,0,424,370);
			
			if((s+1) == filiSelect.length){
				let newDate = new Date()

				let date = newDate.getDate()+" "+newDate.getMonth()+" "+newDate.getFullYear();
				
				pdf.save(date+".pdf");
				console.log("fim do salvamento");
				setExibe(false);
			}else{
				pdf.addPage();
			}
		});
	}
	
}

function montaCarteira(arrayFili){

		MoldeCarteira(arrayFili);

	
}

function dataNasc(data){
	return data[8]+data[9]+"/"+data[5]+data[6]+"/"+data[0]+data[1]+data[2]+data[3];
}

function clear(){
	arrayFili.length = 0;
}

const filiSelect = JSON.parse(localStorage.getItem("filiSelected"));


function GeradorDeCarteira (){	
	
	return (<div>{MoldeCarteira(filiSelect)}</div>);


/*
let arrayFili = [];



let x = 0;

for(let i =0; i < filiSelect.length;i++){
	if(x == 4){ x = 0; }

	arrayFili.push(filiSelect[i]);
	
	x = x + 1;
	let arrayCopia = arrayFili;

	if(x == 4){	
	

		MoldeCarteira(arrayCopia);
		arrayFili = [];
	}
}
if(x != 0) MoldeCarteira(arrayFili);*/
}


   
const [exibe, setExibe] = useState(false); 
return(
   <div>
	   {exibe &&
		    <div style={{height:"100%"}}>
				<div style={{filter: "blur(5px)",width: "100%",height: "100%",backgroundColor: "#ccc"}}>
				</div>
				
				<LinearProgress style={{marginTop: "-51%",marginBottom: "45%"}} />
			</div>
	   }
	 <br/>
    <br/>  
	   <Button onClick={printDocument} variant="contained" color="primary">Imprimir Carteiras</Button>
    <br/>
    <br/>    
    <br/>
    <br/>
    <br/>
	<div ref={ref} id="divToPrint" className={classes.root}>
		<GeradorDeCarteira />
	</div>
	<br/>
	
	</div>
	  
);


};
	

export default Carteira;

Carteira.getInitialProps = ({ query }) => {
	
  return { query }
}






