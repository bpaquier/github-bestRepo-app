import React from 'react';
import ButtonIcon from '../global-elements/ButtonIcon';



export default ({ showList, listVisible }) => (
  <div
    className='favorites__button'
    onClick={() => {
      showList();
    }}
  >
    <div>Favoris</div>
    <ButtonIcon listVisible={listVisible} />
  </div>
);
