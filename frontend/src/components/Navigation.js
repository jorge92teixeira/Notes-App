import React from 'react';
import LabelContainer from './LabelContainer';

const Navigation = () => (
  <p>
    Show:
    {' '}
    <LabelContainer filter="all">
      All
    </LabelContainer>
    {', '}
    <LabelContainer filter="active">
      Active
    </LabelContainer>
    {', '}
    <LabelContainer filter="completed">
      Completed
    </LabelContainer>
  </p>
);

export default Navigation;
