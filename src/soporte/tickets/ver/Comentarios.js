import React from "react";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Loading from "soporte/common/Loading";
import Skeleton from '@material-ui/lab/Skeleton';


const useStyles = makeStyles(theme => ({
    root: {
        [theme.breakpoints.up('md')]: {
            minHeight: 350
        }
    },
    comentarios: {
        margin: 0,
        maxHeight: 300,
        overflow: 'auto'
    },
    item: {
        minHeight: 'auto'
    },
    itemOpuesto: {
        '&:before': {
            flex: 0,
            padding: 0
        }
    },
    conector: {
        backgroundColor: theme.palette.secondary.light
    },
    campoTexto: {
        width: '100%'
    },
    botonWrapper: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    boton: {
        marginTop: theme.spacing(2)
    },
}));

export default ({mostrar}) => {
    const classes = useStyles();
    const comentarios = [
        "El cliente se comunicó para informar de un problema encontrado en el sistema.",
        "El problema fue resuelto correctamente.",
        "El cliente se comunicó nuevamente para informar que el problema aún no fue resuelto, con lo cual se espera que el equipo de desarrollo lo solucione en los próximos días."
    ];

    return (
        <div className={classes.root}>
            <Typography variant='h6'>
                Comentarios:
            </Typography>
            <Loading mostrar={mostrar} esqueleto={<Skeleton variant="rect" height={350}/>}>
                <Timeline className={classes.comentarios}>
                    {comentarios.map((comentario, key) =>
                        <TimelineItem key={key} classes={{root: classes.item, missingOppositeContent: classes.itemOpuesto}}>
                            <TimelineSeparator>
                                <TimelineDot className={classes.conector}/>
                                {comentarios.length - 1 !== key &&
                                <TimelineConnector className={classes.conector}/>}
                            </TimelineSeparator>
                            <TimelineContent>
                                <Typography>{comentario}</Typography>
                            </TimelineContent>
                        </TimelineItem>
                    )}
                </Timeline>
                <TextField
                    multiline
                    rowsMax={4}
                    label="Nuevo comentario"
                    color="secondary"
                    className={classes.campoTexto}
                />
                <div className={classes.botonWrapper}>
                    <Button
                        color="secondary"
                        variant="outlined"
                        className={classes.boton}
                    >
                        Agregar comentario
                    </Button>
                </div>
            </Loading>
        </div>
    )
}
