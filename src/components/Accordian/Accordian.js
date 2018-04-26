import {connect} from 'react-redux';
import React from 'react';
import AccordianItem from './AccordianItem';

class Accordian extends React.Component {

   constructor(props) {
		super(props);
	}

  renderTransactions(){
    if (!this.props.transactions) return null;

    return this.props.transactions.map((transaction, i) => {
      return <AccordianItem key={i} transaction={transaction} />
    });
  }

  render() {

    return (
      <div className="half">
        <div className="tab blue">

            <input id="openTab" type="radio" name="tabs1" className="openTabRadio" />
            <input id="closeTab" type="radio" name="tabs1" className="closeTabRadio" />

            <label htmlFor="openTab" className="openTabLabel">Transactions</label>
            <label htmlFor="closeTab" className="closeTabLabel">Transactions</label>

            <div className="tab-content">
              {this.renderTransactions()}
            </div>
        </div>

  </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    transactions: state.transactions.transactionsArray
  };
}


export default connect(
  mapStateToProps,
  null
)(Accordian);
