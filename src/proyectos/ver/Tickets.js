import Typography from "@material-ui/core/Typography";
import React from "react";
import Tarea from "proyectos/ver/Ticket";
import {makeStyles} from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Loading from "soporte/common/Loading";
import Skeleton from "@material-ui/lab/Skeleton";
import {withWidth} from "@material-ui/core";
import {useHistory} from "react-router";
import axios from "axios";


const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(4)
    },
    titulo: {
        marginBottom: theme.spacing(2)
    }
}));


export default withWidth()(({tickets, mostrar, width}) => {
    const classes = useStyles();

    const sizes = {xs: 12, sm: 6, md: 4, lg: 3}
    const skeletonQuantity = {xs: 1, sm: 2, md: 3, lg: 4}
    const history = useHistory()
    const [tix, setTix] = React.useState({});

    const onTareaClick = (tareaId) => {
        history.push(`/soporte/tickets/${tareaId}`)
    }

    React.useEffect(() => {
        if (tickets && tickets.length > 0){
            axios.get(process.env.REACT_APP_URL_SOPORTE +"/tickets/")
                .then(res => {
                    const result = res.data.filter(x => tickets.includes(x.id || x.codigo));
                    setTix(result);
                })
                .catch(error => {
                    // TODO.
                })
        }
            
    }, [tickets, tix, setTix]);

    return (
        <div className={classes.root}>
            <Typography variant='h5' className={classes.titulo}>Tickets asociados</Typography>
            <Loading mostrar={mostrar} esqueleto={
                <Grid container spacing={3}>
                    {Array(skeletonQuantity[width]).fill(null).map((n, key) =>
                        <Grid item key={key} {...sizes}>
                            <Skeleton variant="rect" height={95}/>
                        </Grid>
                    )}
                </Grid>
            }>
                <Grid container spacing={3}>
                    {mostrar && (tix.length > 0 ? tix.map((ticket, key) =>
                                <Grid key={key} item {...sizes}>
                                    <Tarea
                                        tarea={ticket}
                                        onClick={() => onTareaClick(ticket.id)}
                                    />
                                </Grid>
                            ) :
                            <Grid item xs={10}>
                                <Typography>Esta tarea no posee tickets asociados.</Typography>
                            </Grid>
                    )}
                </Grid>
            </Loading>
        </div>
    )
})
