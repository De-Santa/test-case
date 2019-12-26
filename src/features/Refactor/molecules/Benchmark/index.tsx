import React, { Fragment, useCallback, useState } from 'react';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

interface IBenchmark {
  args: Array<Array<string>>,
  method: Function
  timesToRun?: number
}

const benchTest = (method:Function, args:Array<Array<string>>):number => {
  const start = Date.now();
  for (let arg of args) {
    method(...arg);
  }
  return Date.now() - start
};

export const Benchmark: React.FC<IBenchmark> = (props) => {
  const { args, method, timesToRun = 10 } = props;
  const [benchResult, setBenchResult] = useState<Array<number>>([]);

  const handleStartClick = useCallback(
    () => {
      const result = [];
      for (let i = 1; i <= timesToRun; i++) {
        result.push(benchTest(method, args))
      }
      setBenchResult(result);
    },
    [args, method, timesToRun]
  );

  return (
    <div>
      <Button
        onClick={handleStartClick}
        variant="outlined"
        color="primary"
      >
        Run benchmark
      </Button>
      {benchResult.length > 0 && (
        <List>
          {benchResult.map((result, index) => (
            <Fragment key={index}>
              <ListItem key={index}>
                <ListItemText
                  primary={`Result ${index + 1} = ${result}ms`}
                />
              </ListItem>
              { index + 1 !== benchResult.length && (
                <Divider />
              )}
            </Fragment>
          ))}
        </List>
      )}
    </div>
  )
};
