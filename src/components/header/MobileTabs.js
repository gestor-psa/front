import React from 'react';
import {makeStyles} from '@material-ui/styles';
import Tabs from 'components/header/Tabs';

const useStyles = makeStyles(theme => ({
  tabItem: {
    textTransform: 'none',
    fontSize: 20,
    fontWeight: 600,
    color: 'white',
    maxWidth: 'none'
  },
  indicator: {
    left: 0
  },
  tabWrapper: {
    alignItems: 'baseline'
  }
}));

export default ({onTabClick}) => {
  const classes = useStyles();

  return (
    <Tabs
        tabsProps={{
          orientation: 'vertical',
          classes: {
            indicator: classes.indicator
          }
        }}

        tabProps={{
          className: classes.tabItem,
          classes: {
            wrapper: classes.tabWrapper
          },
          onClick: onTabClick
        }}
    />
  );
}
