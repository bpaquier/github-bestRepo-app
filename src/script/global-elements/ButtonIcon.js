import React from 'react';

export default ({ listVisible }) => (
  <div className={`icon ${listVisible ? 'rotate' : ''}`} />
);
