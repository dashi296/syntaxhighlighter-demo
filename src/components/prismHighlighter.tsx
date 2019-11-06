import React, { FC } from 'react';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
//import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';


export interface IhljsHighlighterProps{
  language: string;
  code: string;
  style: any;
}

const prismHighlighter: FC<IhljsHighlighterProps> = ({
  language,
  code,
  style,
}) => {

  return (
    <SyntaxHighlighter language={language} style={style}>
      {code}
    </SyntaxHighlighter>
  );
};

export default prismHighlighter;
