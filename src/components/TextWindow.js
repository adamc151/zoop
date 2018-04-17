import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';


class TextWindow extends React.Component {

  renderData() {
    return (<div>{this.props.transations.map((transaction, i )=> {
        return <div key={i}><div>{transaction.dateString}</div><div>{transaction.amount}</div><div>{transaction.accumulative}</div><div /></div>
      })}</div>)
  }

  render() {
    return <div>{this.renderData()}</div>
  }

}

this.propTypes = {
  transations: PropTypes.array
};

function mapStateToProps(state) {
  return {
    transations: state.transactions
  };
}


export default connect(
  mapStateToProps,
  null
)(TextWindow);
