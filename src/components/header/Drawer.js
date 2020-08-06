import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import {makeStyles} from '@material-ui/styles';
import MobileTabs from 'components/header/MobileTabs';
import {useHistory} from "react-router";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';



const useStyles = makeStyles(theme => ({
  drawerPaper: {
    background: theme.palette.primary.main,
    minWidth: 200,
    paddingTop: theme.spacing(4)
  }
}));

export default ({open, onClose, onOpen}) => {
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const classes = useStyles();
  const history = useHistory();
  
  function handleCLick(){
    history.push('/recursos/'+45487954);
    onClose(); 
  }

  return (
    <SwipeableDrawer
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      anchor='right'
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      classes={{paper: classes.drawerPaper}}
    >
      
    <AccountCircleIcon  onClick={() => handleCLick()} style={{ fontSize: 40, color:'white',marginLeft:'30px', cursor:"pointer"}}/>
     
      <MobileTabs onTabClick={onClose}/>
    </SwipeableDrawer>
  )
}
