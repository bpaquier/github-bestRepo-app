import React from 'react';
import FavoritesGestion from './favorite-gestion/FavoritesGestion';

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starsNumber: ''
    };
  }
  render() {
    const { listLenght } = this.props;
    return (
      <div>
        <FavoritesGestion listLenght={listLenght}></FavoritesGestion>
      </div>
    );
  }
}
export default Favorites;
