import React from 'react';
import Header from './header/Header';
import Token from './Search/Token';
import Search from './Search/Search';
import Favorites from './favorites/Favorites';
import '../scss/style.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteList: [],
      token: '00'
    };
  }

  getFavoritesList() {
    fetch(
      `https://api.github.com/user/starred?access_token=${this.state.token}&bust=`
    )
      .then(reponse => {
        return reponse.json();
      })
      .then(data => {
        console.log(data);
        this.setState({ favoriteList: data });
      });
  }

  getToken(tokenGiven) {
    this.setState({ token: tokenGiven }, () => {
      this.getFavoritesList();
    });
  }

  updateFavoritesList() {
    this.getFavoritesList();
  }

  render() {
    const { favoriteList, token } = this.state;
    return (
      <div>
        <Header />
        <div className='app'>
          <Token getToken={this.getToken.bind(this)} />
          <div className='app__repos'>
            <Search
              token={token}
              updateFavoritesList={this.updateFavoritesList.bind(this)}
            />
            <Favorites
              list={favoriteList}
              token={token}
              updateFavoritesList={this.updateFavoritesList.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
