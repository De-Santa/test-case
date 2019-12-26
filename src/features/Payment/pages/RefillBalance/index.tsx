import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { TMobileOperator } from 'types';
import { getOperatorByName, refillBalance } from 'api/payment';
import { PENDING, COMPLETE } from 'constants/fetch-statuses';
import { useApiCall } from 'hooks';
import { useFormik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import { MobileOperator, MaskedInput, NumberInput } from '../../atoms';

import { Loader } from 'ui/atoms';

const useStyles = makeStyles<Theme>(theme =>
  ({
    root: {
      position: 'relative',
      minHeight: theme.spacing(40)
    },
    content: {
      position: 'absolute',
      top: '0',
      left: '0',
      height: "100%",
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        position: 'relative',
        flexDirection: 'column'
      },
    },
    refillForm: {
      display: 'flex',
      flex: '1 1 auto',
      flexDirection: 'column',
      marginLeft: theme.spacing(3),
      '& > *:not(:nth-last-child(1))': {
        marginBottom: theme.spacing(3)
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        marginLeft: '0',
        marginTop: theme.spacing(5),
        '& > *:not(:nth-last-child(1))': {
          marginBottom: theme.spacing(5)
        },
      },
    }
  })
);

export const RefillBalance: React.FC = () => {
  const [operator, setOperator] = useState<TMobileOperator>();

  const { operatorName } = useParams();

  const history = useHistory();

  const classes = useStyles();


  const [refillStatus, sendRefill] = useApiCall(refillBalance);

  const [operatorFetchStatus, fetchOperator] = useApiCall(getOperatorByName);

  const formik = useFormik({
    initialValues: {
      amount: '',
      phoneNumber: ''
    },
    onSubmit: (values, { setSubmitting }) => {
      console.log('values', values);
      sendRefill(values.phoneNumber, values.amount)
        .then(({ amount, phoneNumber }:any) => {
          toast.success(`Successfully refilled ${phoneNumber} by ${amount} rubles.`);
          history.push('/payment');
        })
        .catch((e:any) => {
          toast.error(e.message);
          setSubmitting(false);
        });
    },
    validate: values => {
      const errors:any = {};
      if (!values.phoneNumber || values.phoneNumber.includes('_')) {
        errors.phoneNumber = 'Required';
      }
      if (!values.amount) {
        errors.amount = 'Required';
      }
      return errors;
    }
  });

  useEffect(
    () => {
      fetchOperator(operatorName).then((operator:TMobileOperator) => {
        if (!operator) history.push('/payment');
        setOperator(operator);
      })
    },
    [fetchOperator, operatorName, history]
  );

  return (
    <>
      <Button
        color="primary"
        onClick={() => history.push('/payment')}
      >
        Back to operators selection
      </Button>
      <Card className={classes.root}>
        {refillStatus === PENDING && <LinearProgress />}
        {operatorFetchStatus === PENDING && <Loader />}
        {operatorFetchStatus === COMPLETE && operator && (
        <CardContent className={classes.content}>
          <MobileOperator
            img={operator.img}
            name={operator.name}
          />
          <form
            className={classes.refillForm}
            onSubmit={formik.handleSubmit}
          >
            <MaskedInput
              error={!!formik.errors.phoneNumber}
              helperText={formik.errors.phoneNumber}
              label="Phone number"
              mask={['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
              name="phoneNumber"
              onChange={formik.handleChange}
              type="tel"
              value={formik.values.phoneNumber}
            />
            <NumberInput
              error={!!formik.errors.amount}
              helperText={formik.errors.amount
                ? formik.errors.amount
                : 'min 1, max 1000'
              }
              label="Amount"
              max={1000}
              min={1}
              name="amount"
              onChange={(e) => {
                const target = e.target as HTMLTextAreaElement;
                formik.setFieldValue('amount', target.value)
              }}
              prefix="₽"
              value={formik.values.amount}
            />
            <Button
              type="submit"
              disabled={formik.isSubmitting || !formik.isValid}
              color="primary"
              variant="contained"
            >
              {formik.isValid ? 'Refill balance' : 'Check errors'}
            </Button>
          </form>
        </CardContent>
        )}
      </Card>
    </>
  )
};
