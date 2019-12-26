import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { SectionLink } from '../../atoms';
import { paymentImg, refactorImg } from 'assets/home/sections-img';
import { Theme } from '@material-ui/core';

type sectionLink = {
  bgImage: string,
  label: string,
  link: string,
}

const SECTION_LINKS:Array<sectionLink> = [
  {
    bgImage: refactorImg,
    label: 'Task 1 (Refactor)',
    link: '/refactor'
  },
  {
    bgImage: paymentImg,
    label: 'Task 2 (Terminal)',
    link: '/payment'
  }
];

const useStyles = makeStyles<Theme>(theme =>
  ({
    root: {
      width: '100vw',
      height: '100vh',
      display: 'flex',
      backgroundColor: '#333',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column'
      },
    },
    link: {
      flex: '1 1 auto',
      transition: 'flex .5s linear',
      '&:hover': {
        flex: '2 1 auto'
      }
    }
  })
);

export const HomePage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <main className={classes.root}>
      {SECTION_LINKS.map(({ bgImage, label, link }) => (
        <SectionLink
          key={link}
          bgImage={bgImage}
          classes={{ root: classes.link }}
          onClick={() => history.push(link)}
        >
          {label}
        </SectionLink>
      ))}
    </main>
  )
};
