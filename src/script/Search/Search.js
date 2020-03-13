import React from 'react';
import RepoList from './RepoList';
import ButtonIcon from '../global-elements/ButtonIcon';

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
      `https://api.github.com/search/repositories?access_token=${this.props.token}&q=${this.state.search}`
    )
      .then(reponse => reponse.json())
      .then(data => {
        if (data.items && data.items.length > 0) {
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
    this.props.updateFavoritesList();
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
              placeholder='Recherchez un repo'
              onChange={this.handelChange.bind(this)}
            />
            <div
              className={`loadind-icon ${isLoading ? 'is-loading' : ''}`}
            ></div>
          </div>

          <input
            className='search__submit'
            type='submit'
            value='SEARCH'
            disabled={search.length === 0}
          />
          <div
            className={`search__icon ${search.length === 0 ? 'disabled' : ''}`}
            onClick={this.closeList.bind(this)}
          >
            <ButtonIcon listVisible={listVisible} />
          </div>
        </form>
        <RepoList
          token={this.props.token}
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
