import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles<Theme>(theme =>
  ({
    root: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    loader: {
      marginBottom: theme.spacing()
    }
  })
);

export const Loader:React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress classes={{root: classes.loader}}/>
      <Typography variant="overline">Loading...</Typography>
    </div>
  )
};
