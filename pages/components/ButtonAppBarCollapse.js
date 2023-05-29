import React from "react";
import { withStyles } from "@mui/material/styles";
import { Menu } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";

import { styled } from '@mui/system';


const styles = (theme) => ({
  buttonCollapse: {
    [theme.breakpoints.up("sm")]: {
      display: "none"
    },
    margin: "10px",
    boxShadow: "none"
  }
});

class ButtonAppBarCollapse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
    this.handleMenu = this.handleMenu.bind(this);
  }
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  render() {
  //  const { styles } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      
          <div sx={styles.buttonCollapse}>
            <IconButton onClick={this.handleMenu}>
              <HomeIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={open}
              onClose={this.handleClose}
            >
              {this.props.children}
            </Menu>
          </div>
      
    );
  }
}
export default (ButtonAppBarCollapse);
