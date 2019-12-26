import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

interface IMobileOperator {
  img: string,
  name: string,
  onClick?: (event: React.MouseEvent) => void
}

const useStyles = makeStyles<Theme, IMobileOperator>(theme =>
  ({
    root: props => ({
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: props.onClick ? 'pointer' : 'default'
    }),
    img: {
      marginBottom: theme.spacing(2)
    }
  })
);

export const MobileOperator: React.FC<IMobileOperator> = (props) => {
  const { img, name, onClick } = props;
  const classes = useStyles(props);

  return (
    <Tooltip title={name}>
      <div onClick={onClick} className={classes.root}>
        <img className={classes.img} src={img} alt={name} />
        <Typography variant="subtitle2">{name}</Typography>
      </div>
    </Tooltip>
  )
};
