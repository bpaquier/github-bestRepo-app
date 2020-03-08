import React from 'react';
import RepoList from './repoList/RepoList';
import './search.css';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      listVisible: false,
      result: [],
      dataNotFound: false
    };
  }

  ajaxCall(e) {
    if (e.key === 'Enter' && e.target.value.length > 0) {
      this.setState({ isLoading: true });
      fetch(
        `https://api.github.com/search/repositories?access_token=fe4eba558159f9674b9008a0cd8b57150674a9db&q=${e.target.value}`
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
  }

  closeList() {
    this.setState({ listVisible: false });
  }

  render() {
    console.log(this.state.result);

    return (
      <div>
        <div className='input__container'>
          <input
            type='text'
            className='search'
            placeholder='search a repository'
            onKeyPress={this.ajaxCall.bind(this)}
          />
          {this.state.isLoading && <div className='loadind-icon'></div>}
        </div>

        <RepoList
          data={this.state.result}
          isVisible={this.state.listVisible}
          closeList={this.closeList.bind(this)}
          error={this.state.dataNotFound}
        />
      </div>
    );
  }
}

export default Search;
