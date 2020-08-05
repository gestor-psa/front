import React from 'react';
import { useHistory } from "react-router";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default ({url}) => {
  const history = useHistory();
  const volver = () => {
    if (!url) {
      history.goBack();
    } else {
      history.push(url);
    }
    
  };

  return (
    <ArrowBackIcon style={{color:"1fc71f", cursor:"pointer"}} fontSize="large" onClick={volver}/>
  );
}
