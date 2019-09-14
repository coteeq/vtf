import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core';
import VTB from '../images/vtb.svg';

const useStyles = makeStyles(theme => ({
  appbar: {
    marginBottom: theme.spacing(4),
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'center',
  }
}));

function LogoBar() {
  const classes = useStyles();

  return (
    <AppBar className={ classes.appbar } position="sticky">
      <Toolbar className={ classes.toolbar }>
        <img src={ VTB } alt="VTB" />
      </Toolbar>
    </AppBar>
  );
}

export default LogoBar;