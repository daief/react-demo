import * as React from 'react';
import FilterLink from './container/FilterLink';

const Footer = () => (
  <p
    style={{
      border: '1px solid #ccc',
      height: 40,
      lineHeight: '40px',
    }}
  >
    Show:
    {' '}
    <FilterLink filter="SHOW_ALL">
      All
    </FilterLink>
    {', '}
    <FilterLink filter="SHOW_ACTIVE">
      Active
    </FilterLink>
    {', '}
    <FilterLink filter="SHOW_COMPLETED">
      Completed
    </FilterLink>
  </p>
);

export default Footer;
