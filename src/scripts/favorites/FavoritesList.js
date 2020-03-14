import React from 'react';

class FavoritesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputsChecked: 0
    };
  }

  handelChange(e) {
    let number = this.state.inputsChecked;
    e.target.checked ? number++ : number--;
    this.setState({ inputsChecked: number }, () => {
      this.props.elementChecked(this.state.inputsChecked);
    });
  }

  render() {
    return (
      this.props.list.length > 0 && (
        <div className='favorites__list'>
          {this.props.list.map(element => (
            <div className='favorites__list--item' key={element.full_name}>
              <input
                id={element.full_name}
                type='checkbox'
                onChange={this.handelChange.bind(this)}
              />
              <a href={element.html_url} target='blank' title='Open the repo'>
                {element.full_name}
              </a>
            </div>
          ))}
        </div>
      )
    );
  }
}
export default FavoritesList;
