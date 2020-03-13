import React from 'react';

class DeleteFavorites extends React.Component {
  deleteFavorites(e) {
    document
      .querySelectorAll('.favorites__list--item input:checked')
      .forEach(element => {
        console.log(element);
        fetch(
          `https://api.github.com/user/starred/${element.id}?access_token=${this.props.token}`,
          {
            method: 'DELETE'
          }
        ).then(() => {
          this.props.updateFavoritesList();
        });
      });
  }

  render() {
    return (
      <button
        className='favorites__delete'
        disabled={!this.props.canDelete}
        onClick={this.deleteFavorites.bind(this)}
      >
        Delete
      </button>
    );
  }
}

export default DeleteFavorites;
