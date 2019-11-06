import React, { FC, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

import Grid from '@material-ui/core/Grid';
import prismLanguages from './prismLanguages';
import hljsLanguages from './hljsLanguages';
import prismStyles from './prismStyles';
import hljsStyles from './hljsStyles';
import HighlightedItem from './HighlightedItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      width: '95%',
      margin: theme.spacing(1),
      // marginRight: theme.spacing(1),
    },
    dense: {
      marginTop: theme.spacing(2),
    },
    menu: {
      width: 200,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    separater: {
      padding: 0,
      margin: 20,
      borderTop: '1px solid #CCCCCC',
    },
  }),
);

type highlighterType = 'hljs' | 'prism';
const DEFAULT_LANGUAGE = 'ruby';

const Display: FC = () => {
  const classes = useStyles();
  const [highlighter, setHighlighter] = useState<highlighterType>('hljs');
  const [code, setCode] = useState(`def add(num)
  num += 1
end`);
  const [selectedLanguage, setLanguage] = useState('ruby');

  let languages = highlighter === 'hljs' ? hljsLanguages : prismLanguages;
  let styles = highlighter === 'hljs' ? hljsStyles : prismStyles;

  const handleLanguage = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLanguage(event.target.value as string);
  };

  const handleHighlighter = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    const newHighlighter: highlighterType =
      event.target.value === 'hljs' ? 'hljs' : 'prism';
    languages = newHighlighter === 'hljs' ? hljsLanguages : prismLanguages;
    styles = newHighlighter === 'hljs' ? hljsStyles : prismStyles;
    const newLanguage = languages.includes(selectedLanguage)
      ? selectedLanguage
      : DEFAULT_LANGUAGE;
    setHighlighter(newHighlighter);
    setLanguage(newLanguage);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2} justify="flex-start">
        <Grid item xs={12} sm={3}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Highlighter</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={highlighter}
              onChange={handleHighlighter}
            >
              <FormControlLabel value="hljs" control={<Radio />} label="hljs" />
              <FormControlLabel
                value="prism"
                control={<Radio />}
                label="prism"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={3}>
          <FormControl className={classes.formControl}>
            <InputLabel id="language-select-label">Language</InputLabel>
            <Select
              labelId="language-select-label"
              id="language-select"
              value={selectedLanguage}
              onChange={handleLanguage}
            >
              {languages.map(language => (
                <MenuItem key={language} value={language}>
                  {language}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <div>
            <TextField
              id="codeInput"
              label="code"
              multiline
              rows={10}
              rowsMax={10}
              value={code}
              onChange={e => setCode(e.target.value)}
              className={classes.textField}
              variant="outlined"
            />
          </div>
        </Grid>
      </Grid>

      <div className={classes.separater} />

      <Grid container justify="flex-start">
        {Object.keys(styles).map(styleName => (
          <Grid item key={styleName} xs={12} sm={6} md={6} lg={4}>
            <HighlightedItem
              styleName={styleName}
              type={highlighter}
              language={selectedLanguage}
              style={styles[styleName]}
              code={code}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Display;
