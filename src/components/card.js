import React from 'react';

class Card extends React.Component {
  render() {
    return (
      <div className="card md-3">
        <div className="card-header">{this.props.tittle}</div>
        <div className="card-body">{this.props.children}</div>
      </div>
    );
  }
}

export default Card;
