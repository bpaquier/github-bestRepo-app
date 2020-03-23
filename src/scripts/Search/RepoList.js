import React from 'react';

class RepoList extends React.Component {
  addToFavorites(e) {
    console.log(this.props.token);
    fetch(
      `https://api.github.com/user/starred/${e.target.innerHTML}?access_token=${this.props.token}`,
      {
        method: 'PUT'
      }
    )
      .then(reponse => console.log(reponse.status))
      .then(() => this.props.updateFavoritesList());
  }

  render() {
    return (
      <ul
        className={`list-search-result ${
          this.props.isVisible ? '' : 'hidden'
        } ${this.props.error ? 'error' : ''}`}
      >
        {this.props.data.map((element, index) => (
          <li key={index}>
            <span
              onClick={this.addToFavorites.bind(this)}
              title='Ajoutez aux favoris'
            >
              {element.full_name}
            </span>
          </li>
        ))}
      </ul>
    );
  }
}
export default RepoList;
