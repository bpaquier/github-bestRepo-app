import React from 'react';

export default ({ listLenght }) => (
  <div className='favorites__count count'>
    <div className='count__star' />
    <div className='count__number'>{listLenght}</div>
  </div>
);
