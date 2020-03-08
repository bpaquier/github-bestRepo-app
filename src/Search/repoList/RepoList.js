import React from 'react';

import './repo-list.css';

class RepoList extends React.Component {
  addToFavorites(e) {
    fetch(
      `https://api.github.com/user/starred/${e.target.innerHTML}?access_token=0c1b9b985b06e2834bea4768664e5ea8acaa9678`,
      {
        method: 'PUT'
      }
    ).then(() => this.props.updateFavoritesList());
  }

  render() {
    return (
      <ul
        className={`list-search-result ${
          this.props.isVisible ? '' : 'hidden'
        } ${this.props.error ? 'error' : ''}`}
      >
        <div className='close-list' onClick={() => this.props.closeList()} />
        {this.props.data.map((element, index) => (
          <li key={index}>
            <span onClick={this.addToFavorites.bind(this)}>
              {element.full_name}
            </span>
          </li>
        ))}
      </ul>
    );
  }
}
export default RepoList;
