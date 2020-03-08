import React from 'react';
import FavoritesCount from './FavoritesCount';
import FavoritesList from './FavoritesList';
import './favorites-gestion.css';

class FavoritesGestion extends React.Component {
  render() {
    const { listLenght } = this.props;
    return (
      <div className='favorite-gestion'>
        <FavoritesCount listLenght={listLenght} />
        <FavoritesList />
      </div>
    );
  }
}

export default FavoritesGestion;
