import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import {makeStyles} from '@material-ui/styles';
import MobileTabs from 'components/header/MobileTabs';

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
      <MobileTabs onTabClick={onClose}/>
    </SwipeableDrawer>
  )
}
