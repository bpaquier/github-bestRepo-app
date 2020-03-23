import React from 'react';
import Header from './header/Header';
import Token from './Search/Token';
import Search from './Search/Search';
import Favorites from './favorites/Favorites';
import '../scss/style.scss';

const setLocalStorageToken = token => {
  localStorage.setItem('token', token);
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteList: [],
      token: localStorage.getItem('token'),
      isTokenValid: true
    };
  }

  getFavoritesList() {
    fetch(
      `https://api.github.com/user/starred?access_token=${this.state.token}&bust=`
    )
      .then(reponse => {
        console.log(reponse.status);
        if (reponse.status > 400) {
          this.setState({ isTokenValid: false });
          return reponse.json();
        } else {
          this.setState({ isTokenValid: true });
          return reponse.json();
        }
      })
      .then(data => {
        this.setState({ favoriteList: data });
      });
  }

  getToken(tokenGiven) {
    setLocalStorageToken(tokenGiven);
    this.setState({ token: localStorage.getItem('token') }, () => {
      this.getFavoritesList();
    });
  }

  updateFavoritesList() {
    this.getFavoritesList();
  }

  componentWillMount() {
    this.getFavoritesList();
  }

  render() {
    const { favoriteList, token, isTokenValid } = this.state;
    return (
      <div>
        <Header />
        <div className='app'>
          <Token
            getToken={this.getToken.bind(this)}
            previousToken={token}
            isTokenValid={isTokenValid}
          />
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
