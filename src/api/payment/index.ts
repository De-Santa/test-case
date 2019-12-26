import { beelineImg, megafonImg, mtsImg } from 'assets/payment/operators-img';
import { TMobileOperator } from 'types';

type successfulRefill = {
  phoneNumber: string,
  amount: string
}

const OPERATORS:Array<TMobileOperator> = [
  { name: 'Beeline', img: beelineImg },
  { name: 'Megafon', img: megafonImg },
  { name: 'MTS', img: mtsImg }
];

const sleep = (time:number = 2000):Promise<any> => new Promise(resolve => setTimeout(resolve, time));

export const getAllOperators = async ():Promise<Array<TMobileOperator>> => {
  await sleep();
  return OPERATORS
};

export const getOperatorByName = async (operatorName:string):Promise<TMobileOperator | undefined> => {
  await sleep(1500);
  return OPERATORS.find(({name}) => operatorName.toLowerCase() === name.toLowerCase() )
};

export const refillBalance = async (phoneNumber:string, amount:string):Promise<successfulRefill | Error> => {
  await sleep(1500);
  if (Math.round(Math.random())) return { phoneNumber, amount };
  throw new Error('Could not refill balance, please try again');
};
