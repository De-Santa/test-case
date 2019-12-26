import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getAllOperators } from 'api/payment';
import { PENDING, COMPLETE } from 'constants/fetch-statuses';
import { useApiCall } from 'hooks';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Loader } from 'ui/atoms';
import { MobileOperator } from '../../atoms'


const useStyles = makeStyles<Theme>(theme =>
  ({
    root: {
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gridGap: theme.spacing(3),
      minHeight: theme.spacing(40)
    }
  })
);

export const Operators: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const [operators, setOperators] = useState<Array<any>>([]);
  const [fetchStatus, fetchOperators] = useApiCall(getAllOperators);

  useEffect(
    () => {
      fetchOperators().then((res:Array<{img:string, name:string}>) => {
        console.log('res', res);
        setOperators(res);
      })
    },
    [fetchOperators]
  );

  return (
    <Card>
      <CardContent className={classes.root}>
        {fetchStatus === PENDING && <Loader />}
        {fetchStatus === COMPLETE && operators.map(({ img, name }) => (
          <MobileOperator
            key={name}
            img={img}
            name={name}
            onClick={() => history.push(`/payment/${name.toLowerCase()}`)}
          />
        ))}
      </CardContent>
    </Card>
  )
};
