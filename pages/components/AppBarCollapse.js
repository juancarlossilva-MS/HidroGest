/**
 * Code from the below medium post, only updated for latest material UI, using a
 * Menu for the popup and with breakpoints that work.
 *
 * https://medium.com/@habibmahbub/create-appbar-material-ui-responsive-like-bootstrap-1a65e8286d6f
 */
import React,{useEffect,useState} from "react";
import { Button, MenuItem } from "@material-ui/core";
import ButtonAppBarCollapse from "./ButtonAppBarCollapse";
import { useRouter } from 'next/router';


function AppBarCollapse(props){
  
  const styles = {
    root: {
      position: "absolute",
      right: 0
    },
    buttonBar: {
      
      margin: "10px",
      paddingLeft: "16px",
      right: 0,
      position: "relative",
      width: "100%",
      background: "transparent"
    }
  };
  
  


 // window.addEventListener('resize', updateDimensions)
  const router = useRouter();

  const logout = async () => {
     const response = await fetch("/api/sessions", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
      console.log(response);
  
      if (response.ok) {
        return router.push("/login");
      }
  
  };

  const [width, setWindowWidth] = useState(0);

  useEffect(()=>{
    setWindowWidth(window.innerWidth);
  },[])

  
  return(
    

      <div style={styles.root} >
       {
          width < 737 ?
                
                    <ButtonAppBarCollapse>
                      <MenuItem></MenuItem>
                      <MenuItem onClick={logout}>Sair</MenuItem>
                  </ButtonAppBarCollapse>
               

          :
            <div style={styles.buttonBar} id="appbar-collapse">
              <Button color="inherit"></Button>
              <Button onClick={logout} color="inherit">Sair</Button>
            </div>
          
       }
              
        
        
          
      </div>
)}

export default (AppBarCollapse);
