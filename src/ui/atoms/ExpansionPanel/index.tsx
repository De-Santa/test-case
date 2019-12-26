import React, { useState } from 'react';
import ExpansionPanelMaterial from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Tooltip from '@material-ui/core/Tooltip';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

interface IExpansionPanel {
  children: React.ReactNode,
  classes?: {
    panel: string,
    content: string
  },
  label: string
}

export const ExpansionPanel: React.FC<IExpansionPanel> = (props) => {
  const { children, classes, label } = props;
  const [expanded, setExpanded] = useState(false);

  return (
    <ExpansionPanelMaterial
      classes={{ root: classes && classes.panel}}
      onChange={(e, expanded) => setExpanded(expanded)}
      TransitionProps={{ unmountOnExit: true }}
    >
      <ExpansionPanelSummary
        expandIcon={<Tooltip title={`${expanded ? 'Shrink' : 'Expand'} panel`}><ExpandMoreIcon /></Tooltip>}
      >
        <Typography variant="h6">{label}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails
        classes={{ root: classes && classes.content }}
      >
        {children}
      </ExpansionPanelDetails>
    </ExpansionPanelMaterial>
  )
};
