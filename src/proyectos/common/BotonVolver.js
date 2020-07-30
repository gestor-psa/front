import React from 'react';
import ColoredButton from "soporte/common/ColoredButton";
import { useHistory } from "react-router";

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
    <ColoredButton onClick={volver} variant='outlined'color='warning'> Volver</ColoredButton>
  );
}
