import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';


const useStyles = makeStyles({
    table: {
        minWidth: '100%',
    },
    skeleton: {
        top: 0,
        left: 0,
        width: '100%',
        '& td': {
            width: '100%'
        },
        '& tr': {
            display: 'flex'
        }
    }
});

export default ({rows, columns}) => {
    const classes = useStyles();

    return (
        <TableContainer component={Paper} className={classes.skeleton}>
            <Table className={classes.table}>
                <TableBody>
                    {Array(rows).fill(null).map((n, keyN) => (
                        <TableRow key={keyN}>
                            {Array(columns).fill(null).map((m, keyM) => (
                                <TableCell key={keyM}><Skeleton/></TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
