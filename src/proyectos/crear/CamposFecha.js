import React from "react";
import Fecha from "proyectos/common/Fecha.js"
import Grid from "@material-ui/core/Grid";
//import Moment from "react-moment"; todo


export default ({proyecto = {}, onChange = () => null, errors, register}) => {
    
    return (
        <Grid >
            <Fecha errors = {errors} register = {register} tag = "fechaInicio" name = "Fecha de Inicio" onChange = {onChange} defvalue = {proyecto.fechaInicio} />         
            <Fecha tag = "fechaFin" name = "Fecha de Fin" onChange = {onChange} defvalue = {proyecto.fechaFin} />
        </Grid>
    )
}