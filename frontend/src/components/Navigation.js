import React from 'react';
import LinkContainer from './LinkContainer';

const Navigation = () => (
  <p>
    Show:
    {' '}
    <LinkContainer filter="SHOW_ALL">
      ALL
    </LinkContainer>
    {', '}
    <LinkContainer filter="SHOW_ACTIVE">
      Active
    </LinkContainer>
    {', '}
    <LinkContainer filter="SHOW_COMPLETED">
      Completed
    </LinkContainer>
  </p>
);

export default Navigation;
