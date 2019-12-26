import React, { Fragment, useCallback, useState } from 'react';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CheckIcon from '@material-ui/icons/Check';
import ErrorIcon from '@material-ui/icons/Clear';

type test = {
  args: Array<string>,
  expected: number
}

type testResult = {
  description: string,
  passed: boolean,
  result: any
}

interface ICodeTest {
  method: Function
  tests: Array<test>
}

export const CodeTest: React.FC<ICodeTest> = (props) => {
  const { method, tests } = props;
  const [
    testResults, setTestResults
  ] = useState<Array<testResult>>([]);

  const handleStartClick = useCallback(
    () => {
      const results = [];
      for (let { args, expected } of tests) {
        const result = method(...args);
        const quotedArgs = args.map(arg => `'${arg}'`);
        results.push({
          description: `Expect ${method.name}(${quotedArgs.join(', ')}) to be ${expected}`,
          passed: String(result) === String(expected),
          result
        })
      }
      setTestResults(results);
    },
    [method, tests]
  );

  return (
    <div>
      <Button
        disabled={testResults.length > 0}
        onClick={handleStartClick}
        variant="outlined"
        color="primary"
      >
        Run tests
      </Button>
      {testResults.length > 0 && (
        <List>
          {testResults.map(({ description, passed, result }, index) => (
            <Fragment key={index}>
              <ListItem key={index}>
                <ListItemIcon>
                  {passed ? <CheckIcon color="primary" /> : <ErrorIcon color="error" />}
                </ListItemIcon>
                <ListItemText
                  primary={description}
                  secondary={`Result= ${result}`}
                />
              </ListItem>
              { index + 1 !== testResults.length && (
                <Divider />
              )}
            </Fragment>
          ))}
        </List>
      )}
    </div>
  )
};
