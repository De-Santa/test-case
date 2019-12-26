import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import darcula from 'react-syntax-highlighter/dist/esm/styles/hljs/darcula';

interface ICodeBox {
  children: React.ReactNode,
}

export const CodeBox: React.FC<ICodeBox> = (props) => {
  const { children } = props;

  return (
    <SyntaxHighlighter
      language="javascript"
      style={darcula}
      showLineNumbers
    >
      {children}
    </SyntaxHighlighter>
  )
};
