import React from 'react';

class Token extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      actualContent: '',
      isVisible: false
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
    const { isVisible, actualContent, content } = this.state;
    return (
      <div className='token'>
        <form className='token__form' onSubmit={this.handelSubmit.bind(this)}>
          <input
            className='token__input'
            type='text'
            placeholder='Entrez votre token'
            onChange={this.handelChange.bind(this)}
          />
          <input
            className='token__submit'
            type='submit'
            value='Ok'
            disabled={content.length === 0}
          />
        </form>
        {isVisible && (
          <div className='token__choosen'>
            <p>Token saisi: </p>
            <p>{actualContent}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Token;
