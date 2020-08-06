import React, {Fragment} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Container from '@material-ui/core/Container';
import Logo from 'components/common/Logo';
import Drawer from 'components/header/Drawer';
import DesktopTabs from 'components/header/DesktopTabs';
import {Hidden} from '@material-ui/core';
import Title from "components/header/Title";
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {useHistory} from "react-router";


const useStyles = makeStyles(theme => ({
    appBar: {
        zIndex: 100
    },
    separator: {
        flexGrow: 1,
    },
    menuButton: {
        color: theme.palette.grey[50]
    },
    container: {
        display: 'flex',
        position: 'relative'
    },
    logo: {
        width: 50,
        margin: theme.spacing(2, 0)
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        left: '51%',
        transform: 'translateX(-50%)',
        height: '100%',
    }
}));

export default () => {
    const classes = useStyles();
    const history = useHistory();
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const openDrawer = () => setDrawerOpen(true),
        closeDrawer = () => setDrawerOpen(false);

    return (
        <Fragment>
            <AppBar position='static' className={classes.appBar}>
                <Container fixed className={classes.container}>
                    <Logo height={50}/>
                    <div className={classes.separator}/>
                    <Hidden smDown>
                        <DesktopTabs/>
                        <Button onClick={() => {history.push('/recursos/'+45487954) }}>
                            <AccountCircleIcon  style={{ fontSize: 40, color:'white'}}/>
                        </Button>
                    </Hidden>
                    <Hidden mdUp>
                        <div className={classes.title}>
                            <Title/>
                        </div>
                        <IconButton
                            className={classes.menuButton}
                            onClick={openDrawer}
                        >
                            <MenuIcon fontSize="large"/>
                        </IconButton>
                    </Hidden>
                    <div/>
                </Container>
            </AppBar>
            <Drawer
                open={drawerOpen}
                onOpen={openDrawer}
                onClose={closeDrawer}
            />
        </Fragment>
    );
}
