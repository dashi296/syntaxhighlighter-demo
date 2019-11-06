import React, { FC, useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import HighlightedItem from './HighlightedItem';
import hljsStyles from './hljsStyles';
import prismStyles from './prismStyles';
import hljsLanguages from './hljsLanguages';
import prismLanguages from './prismLanguages';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {

    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
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
  }),
);

export interface IDisplayProps{

}

type highlighterType = "hljs" | "prism";
const defaultLanguage = "ruby";

const Display: FC<IDisplayProps> = ({

}) => {
  const classes = useStyles();
  const [highlighter, setHighlighter] = useState<highlighterType>('hljs');
  const [code, setCode] = useState('(num) => num + 1');
  const [language, setLanguage] = useState('ruby');

  const handleLanguage = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLanguage(event.target.value as string);
  };

  const handleHighlighter = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    const highlighter:highlighterType = event.target.value == "hljs" ? "hljs" : "prism";
    const languages: string[] = highlighter == "hljs" ? hljsLanguages : prismLanguages;
    const newLanguage:string = languages.includes(language) ? language : defaultLanguage;
    setHighlighter(highlighter);
    setLanguage(newLanguage);
  };

  let languages = highlighter == "hljs" ? hljsLanguages : prismLanguages;
  let styles = highlighter == "hljs" ? hljsStyles : prismStyles;

  useEffect(()=>{
    languages = highlighter == "hljs" ? hljsLanguages : prismLanguages;
    styles = highlighter == "hljs" ? hljsStyles : prismStyles;
  }, [highlighter])

  return (
    <div className={classes.root}>

      <TextField
        id="codeInput"
        label="Code"
        multiline
        rowsMax="10"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className={classes.textField}
        margin="normal"
        variant="filled"
      />

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Highlighter</FormLabel>
        <RadioGroup aria-label="gender" name="gender1" value={highlighter} onChange={handleHighlighter}>
          <FormControlLabel value={"hljs"} control={<Radio />} label="hljs" />
          <FormControlLabel value={"prism"} control={<Radio />} label="prism" />
        </RadioGroup>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel id="language-select-label">Language</InputLabel>
        <Select
          labelId="language-select-label"
          id="language-select"
          value={language}
          onChange={handleLanguage}
        >
          { languages.map(language => <MenuItem key={language} value={language}>{language}</MenuItem>) }
        </Select>
      </FormControl>

      <Grid container spacing={2} justify="flex-start">
      {Object.keys(styles).map(styleName => (
        <Grid item key={styleName} xs={12} sm={6} md={6} lg={4}>
          <HighlightedItem styleName={styleName} type={highlighter} language={language} style={styles[styleName]} code={code} />
        </Grid>))
      }
      </Grid>

    </div>


  )
}

export default Display;
