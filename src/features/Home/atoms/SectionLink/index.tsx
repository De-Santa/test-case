import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

export interface ISectionLink {
  bgImage: string,
  children: React.ReactNode,
  classes: object,
  onClick: (event: React.MouseEvent) => void
}

const useStyles = makeStyles<Theme, ISectionLink>(theme => ({
  root: props => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `url(${props.bgImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    color: theme.palette.primary.contrastText,
    fontSize: '40px',
    textDecoration: 'none',
    cursor: 'pointer',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,.5)'
    },
    '& p': {
      position: 'relative'
    }
  }),
}));

export const SectionLink: React.FC<ISectionLink> = (props) => {
  const { children, onClick } = props;
  const classes = useStyles(props);

  return (
    <div
      className={classes.root}
      onClick={onClick}
      role="button"
    >
      <p>{ children }</p>
    </div>
  )
};
