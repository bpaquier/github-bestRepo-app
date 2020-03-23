import React from 'react';

class Token extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    };
  }

  handelChange(e) {
    this.setState({ content: e.target.value });
  }

  handelSubmit(e) {
    e.preventDefault();
    this.props.getToken(this.state.content);
    this.setState({ actualContent: this.state.content, isVisible: true });
    document.querySelector('.token__input').value = '';
  }

  render() {
    const { content } = this.state;
    const { previousToken, isTokenValid } = this.props;
    return (
      <div className='token'>
        <form className='token__form' onSubmit={this.handelSubmit.bind(this)}>
          <input
            className='token__input'
            type='text'
            placeholder='Entrez votre token'
            onChange={this.handelChange.bind(this)}
            required
          />
          <input
            className='token__submit'
            type='submit'
            value='Ok'
            disabled={content.length === 0}
          />
        </form>
        {isTokenValid && (
          <div className='token__choosen'>
            <p>Votre token: </p>
            <p>{previousToken}</p>
          </div>
        )}
        {!isTokenValid && (
          <div className='token__wrong'>
            <p>Entrez un token valide</p>
          </div>
        )}
      </div>
    );
  }
}

export default Token;
