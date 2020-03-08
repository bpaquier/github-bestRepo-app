import React from 'react';
import './favorites-gestion.css';

export default ({ listLenght }) => (
  <div className='favorites-count'>
    <div className='favorites-count__star' />
    <div className='favorites-count__number'>{listLenght}</div>
  </div>
);
