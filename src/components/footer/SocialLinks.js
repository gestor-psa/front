import React from 'react';
import {makeStyles} from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGithub, faLinkedinIn} from '@fortawesome/free-brands-svg-icons';
import {faEnvelope, faHome} from '@fortawesome/free-solid-svg-icons';


const useStyles = makeStyles(theme => ({
    socialItem: {
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'center'
    },
    iconWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        borderRadius: '100%',
        border: `2px solid ${theme.palette.primary.lighter(90)}`,
        color: theme.palette.primary.lighter(90),
        transition: 'background .2s ease-in-out, color .2s ease-in-out',
        '&:hover': {
            color: theme.palette.primary.main,
            background: theme.palette.primary.lighter(80),
            border: `2px solid ${theme.palette.primary.lighter(80)}`,
        }
    }
}));

const mediaLinks = [
    {
        link: '//github.com/gestor-psa/',
        icon: faGithub
    }, {
        link: '//www.linkedin.com/',
        icon: faLinkedinIn
    }, {
        link: '',
        icon: faEnvelope
    }
];

export default () => {
    const classes = useStyles();

    return (
        <Grid container spacing={2}>
            {mediaLinks.map(({link, icon}) =>
                <Grid item xs={3} md={2} className={classes.socialItem} key={link}>
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={classes.iconWrapper}
                    >
                        <FontAwesomeIcon icon={icon} size='2x'/>
                    </a>
                </Grid>
            )}
            <Grid item xs={3} md={2} className={classes.socialItem}>
                <a href='/' className={classes.iconWrapper}>
                    <FontAwesomeIcon icon={faHome} size='2x'/>
                </a>
            </Grid>
        </Grid>
    )
}