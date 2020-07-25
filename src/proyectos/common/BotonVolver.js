import React from 'react';
import ColoredButton from "soporte/common/ColoredButton";
import { useHistory } from "react-router";

export default () => {
  const history = useHistory();
  const volver = () => (history.goBack());
  return (
    <ColoredButton onClick={volver} variant='outlined'color='warning'> Volver</ColoredButton>
  );
}
