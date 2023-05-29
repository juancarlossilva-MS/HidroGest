export default function ajusteData(data){
    
    if(data == undefined) return;
    let dia = data.substr(8,2)
    let mes = data.substr(5,2)
    let ano = data.substr(0,4)
    return dia + "/"+mes+"/"+ano
}

