import React from "react";
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

export default ({children, open, onConfirmar, onCancelar, eliminarEnProceso}) => {
    const classes = useStyles();

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
            open={open}
            disableFocusListener
            title={
                <Alert severity="warning">
                    <AlertTitle>¿Eliminar ticket?</AlertTitle>
                    <ProgressButton
                        color='warning'
                        onClick={onConfirmar}
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
