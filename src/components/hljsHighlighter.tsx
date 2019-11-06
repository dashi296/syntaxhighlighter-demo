import React, { FC } from 'react';

import SyntaxHighlighter from 'react-syntax-highlighter';
//import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export interface IhljsHighlighterProps{
  language: string;
  code: string;
  style: any;
}

const hljsHighlighter: FC<IhljsHighlighterProps> = ({
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

export default hljsHighlighter;
