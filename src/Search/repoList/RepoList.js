import React from 'react';

import './repo-list.css';

export default ({ data, isVisible, closeList, error }) => {
  return (
    <ul
      className={`list-search-result ${isVisible ? '' : 'hidden'} ${
        error ? 'error' : ''
      }`}
    >
      <i className='close-list' onClick={() => closeList()}></i>
      {data.map((element, index) => (
        <li key={index}>{element.full_name}</li>
      ))}
    </ul>
  );
};
