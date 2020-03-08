import React from 'react';
import RepoList from './repoList/RepoList';
import './search.css';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      isLoading: false,
      listVisible: false,
      result: [],
      dataNotFound: false
    };
  }

  handelChange(e) {
    this.setState({ search: e.target.value });
  }

  ajaxCall(e) {
    e.preventDefault();
    this.setState({ isLoading: true });
    fetch(
      `https://api.github.com/search/repositories?access_token=0c1b9b985b06e2834bea4768664e5ea8acaa9678&q=${this.state.search}`
    )
      .then(reponse => reponse.json())
      .then(data => {
        if (data.items.length > 0) {
          this.setState({
            result: data.items,
            listVisible: true,
            isLoading: false,
            dataNotFound: false
          });
        } else {
          this.setState({
            result: [{ full_name: 'no repo found' }],
            listVisible: true,
            isLoading: false,
            dataNotFound: true
          });
        }
      });
  }

  closeList() {
    this.setState({ listVisible: false });
  }

  updateFavoritesList() {
    this.props.updateFavoritesListe();
  }

  render() {
    const { search, listVisible, result, dataNotFound, isLoading } = this.state;

    return (
      <div className='search'>
        <form className='search__form' onSubmit={this.ajaxCall.bind(this)}>
          <div className='search__input-section'>
            <input
              type='text'
              className='search__input'
              placeholder='search a repository'
              onChange={this.handelChange.bind(this)}
            />
            {isLoading && <div className='loadind-icon'></div>}
          </div>
          <input
            type='submit'
            className='search__submit'
            value='SEARCH'
            disabled={search.length === 0}
          />
        </form>
        <RepoList
          data={result}
          isVisible={listVisible}
          closeList={this.closeList.bind(this)}
          error={dataNotFound}
          updateFavoritesList={this.updateFavoritesList.bind(this)}
        />
      </div>
    );
  }
}

export default Search;
