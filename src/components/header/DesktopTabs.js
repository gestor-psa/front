import React from 'react';
import {makeStyles} from '@material-ui/styles';
import Tabs from 'components/header/Tabs';

const useStyles = makeStyles(theme => ({
  tabItem: {
    textTransform: 'none',
    fontSize: 20,
    fontWeight: 600,
    color: 'white'
  },
  desktopTabs: {
    alignItems: 'flex-end',
    position: 'absolute',
    left: '51%',
    transform: 'translateX(-50%)',
    height: '100%'
  }
}));

export default () => {
  const classes = useStyles();

  return (
    <Tabs tabsProps={{className: classes.desktopTabs}} tabProps={{className: classes.tabItem}}/>
  )
}
