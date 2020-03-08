import React from 'react';
import Search from './Search/Search';
import Favorites from './favorites/Favorites';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteList: [],
      favoriteListLength: ''
    };
  }

  getFavoritesList() {
    fetch(
      'https://api.github.com/user/starred?access_token=0c1b9b985b06e2834bea4768664e5ea8acaa9678&bust='
    )
      .then(reponse => {
        return reponse.json();
      })
      .then(data => {
        this.setState({ favoriteList: data, favoriteListLength: data.length });
      });
  }

  updateFavoritesList() {
    this.getFavoritesList();
  }

  componentWillMount() {
    this.getFavoritesList();
  }

  render() {
    const { favoriteListLength, favoriteList } = this.state;
    return (
      <div className='app'>
        <Search
          updateFavoritesListe={this.updateFavoritesList.bind(this)}
        ></Search>
        <Favorites
          listLenght={favoriteListLength}
          list={favoriteList}
        ></Favorites>
      </div>
    );
  }
}

export default App;
