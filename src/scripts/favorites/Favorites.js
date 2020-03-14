import React from 'react';
import FavoritesCount from './FavoritesCount';
import FavoritesButton from './FavoritesButton';
import FavoritesList from './FavoritesList';
import DeleteFavorites from './DeleteFavorites';

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starsNumber: '',
      listVisible: false,
      canDelete: false
    };
  }

  showList() {
    this.state.listVisible
      ? this.setState({ listVisible: false })
      : this.setState({ listVisible: true });
  }

  showDeleteButton(checkedInputsLength) {
    checkedInputsLength > 0
      ? this.setState({ canDelete: true })
      : this.setState({ canDelete: false });
  }

  updateFavoritesList() {
    this.props.updateFavoritesList();
  }

  render() {
    const { list } = this.props;
    const { listVisible, canDelete } = this.state;
    return (
      <div className='favorites'>
        <div className='favorites__selection'>
          <FavoritesCount listLenght={list.length} />
          <FavoritesButton
            showList={this.showList.bind(this)}
            listVisible={listVisible}
          />
          <DeleteFavorites
            canDelete={canDelete}
            token={this.props.token}
            updateFavoritesList={this.updateFavoritesList.bind(this)}
          />
        </div>
        {listVisible && (
          <FavoritesList
            list={list}
            elementChecked={this.showDeleteButton.bind(this)}
          />
        )}
      </div>
    );
  }
}
export default Favorites;
