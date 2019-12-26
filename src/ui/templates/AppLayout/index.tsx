import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/ArrowBack';

interface ILayout {
  children: React.ReactNode
}

const useStyles = makeStyles<Theme>(theme =>
  ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    },
    appBar: {
      flex: '0 0 auto'
    },
    container: {
      flex: '1 1 auto',
      display: 'flex',
      alignItems: 'center',
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
      '& > *': {
        width: '100%'
      }
    },
  })
);

export const AppLayout: React.FC<ILayout> = (props) => {
  const { children } = props;
  const history = useHistory();
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <AppBar classes={{root: classes.appBar}} position="sticky">
        <Toolbar>
          <Tooltip title="Back to home page">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="back to home page"
              onClick={() => history.push('/')}
            >
              <BackIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Container
        maxWidth="lg"
        classes={{ root: classes.container }}
      >
        <div className={classes.content}>{children}</div>
      </Container>
    </main>
  )
};
