import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Tooltip from "@material-ui/core/Tooltip";
import ColoredButton from "soporte/common/ColoredButton";
import ProgressButton from "soporte/common/ProgressButton";


const useStyles = makeStyles(theme => ({
    tooltip: {
        backgroundColor: 'rgb(255, 244, 229)',
        borderStyle: 'solid',
        borderColor: theme.palette.warning.main,
        borderWidth: 'thin',
        minWidth: 260
    },
    tooltipArrow: {
        color: theme.palette.warning.main
    },
    botones: {
        margin: theme.spacing(0, 1),
        marginTop: theme.spacing(1)
    }
}));

export default ({mensaje, children, open, onConfirmar, onCancelar}) => {
    const classes = useStyles();
    const [eliminarEnProceso, setEliminarEnProceso] = useState(false);

    const onConfirmarInterno = () => {
        setEliminarEnProceso(true);
        onConfirmar();
    }

    return (
        <Tooltip
            classes={{
                tooltip: classes.tooltip,
                arrow: classes.tooltipArrow,
            }}
            PopperProps={{disablePortal: true}}
            placement="top"
            interactive
            leaveDelay={500}
            arrow
            onClose={onCancelar}
            open={open || eliminarEnProceso}
            disableFocusListener
            disableTouchListener
            title={
                <Alert severity="warning">
                    <AlertTitle>{mensaje}</AlertTitle>
                    <ProgressButton
                        color='warning'
                        onClick={onConfirmarInterno}
                        variant='contained'
                        className={classes.botones}
                        inProgress={eliminarEnProceso}
                    >
                        Sí
                    </ProgressButton>
                    <ColoredButton
                        variant='outlined'
                        color='warning'
                        onClick={onCancelar}
                        className={classes.botones}
                    >
                        No
                    </ColoredButton>
                </Alert>
            }
        >
            <div>{children}</div>
        </Tooltip>
    )
}
