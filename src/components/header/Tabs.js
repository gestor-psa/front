import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import {Link, useLocation} from 'react-router-dom';
import Tab from '@material-ui/core/Tab';
import {content} from 'sections/Content'


export default ({tabsProps, tabProps}) => {
  const location = useLocation();
  const tab = location.pathname.split('/')[1];
  const currentTab = content.find(e => e.route === `/${tab}`) || false;

  return (
    <Tabs
      value={currentTab && currentTab.route}
      {...tabsProps}
    >
      {content.map(({label, route}, key) =>
        <Tab
          key={key}
          to={route}
          label={label}
          value={route}
          component={Link}
          {...tabProps}
        />
      )}
    </Tabs>
  )
}
