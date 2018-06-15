import * as React from 'react';

interface LinkProps {
  active: boolean;
  children: any;
  onClick: any;
}

const Link = ({ active, children, onClick }: LinkProps) => {
  if (active) {
    return <span style={{ color: 'lightblue' }}>{children}</span>;
  }

  return (
    <a
      onClick={e => {
        e.preventDefault()
        onClick()
      }}
    >
      {children}
    </a>
  );
};

export default Link;
