import React, { FC } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import SyntaxHighlighter, {
  Prism as PrismHighlighter,
} from 'react-syntax-highlighter';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      margin: theme.spacing(2),
      padding: theme.spacing(1),
    },
  }),
);

export interface HighlightedItemProps {
  type: 'hljs' | 'prism';
  styleName: string;
  language: string;
  code: string;
  style: any;
}

const HighlightedItem: FC<HighlightedItemProps> = ({
  type,
  styleName,
  language,
  code,
  style,
}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      {styleName}
      {type === 'hljs' ? (
        <SyntaxHighlighter language={language} style={style}>
          {code}
        </SyntaxHighlighter>
      ) : (
        <PrismHighlighter language={language} style={style}>
          {code}
        </PrismHighlighter>
      )}
    </Paper>
  );
};

export default HighlightedItem;
