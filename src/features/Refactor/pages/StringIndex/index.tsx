import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { ExpansionPanel } from 'ui/atoms';
import { Benchmark, CodeBox, CodeTest } from '../../molecules';
import {
  funcString,
  funcRefactorString,
  func as taskFunc,
  funcRefactored,
  benchTests,
  tests
} from './data';

const useStyles = makeStyles<Theme>(theme =>
  ({
    panel: {
      marginBottom: theme.spacing(4)
    },
    panelContent: {
      display: 'block'
    },
    codeBrief: {
      marginBottom: theme.spacing(2)
    },
    utilsWrapper: {
      display: 'flex',
      '& > *:not(:nth-last-child(1))': {
        marginRight: theme.spacing(2)
      },
      [theme.breakpoints.down('sm')]: {
        display: 'block',
        '& > *:not(:nth-last-child(1))': {
          marginRight: '0',
          marginBottom: theme.spacing(2),
        },
      },
    }
  })
);

export const StringIndex: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <ExpansionPanel
        classes={{
          panel: classes.panel,
          content: classes.panelContent
        }}
        label="Initial task"
      >
        <Typography classes={{ root: classes.codeBrief }}>
          Task to review and improve existing code.
          What can be improved here? How would you re-write it?
          Please review the code below:
        </Typography>
        <CodeBox>
          {funcString}
        </CodeBox>
        <div className={classes.utilsWrapper}>
          <Benchmark args={benchTests} method={taskFunc} />
          <CodeTest method={taskFunc} tests={tests}/>
        </div>
      </ExpansionPanel>

      <Card>
        <CardContent>
          <Typography variant="h6">
            Solution
          </Typography>
          <Typography classes={{ root: classes.codeBrief }}>
            Two times faster solution
          </Typography>
          <CodeBox>
            {funcRefactorString}
          </CodeBox>
          <div className={classes.utilsWrapper}>
            <Benchmark args={benchTests} method={funcRefactored} />
            <CodeTest method={funcRefactored} tests={tests}/>
          </div>
        </CardContent>
      </Card>
    </>
  )
};
