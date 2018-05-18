import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/actions';
import React from 'react';
import AccordianItem from './AccordianItem';
import './Accordian.css';


class Accordian extends React.Component {

   constructor(props) {
		super(props);
	}

  renderTransactions(){
    if (!this.props.transactions) return null;

    console.log('proppy: ' + this.props.transactions);

    return this.props.transactions.map((transaction, i) => {
      return <AccordianItem key={i} transaction={transaction} onRemove={this.handleRemove.bind(this,i)} />
    });
  }

  handleRemove(index){
    alert('remove' + index);
  }


  render() {
    if(this.props.transactions.length!=0){
      return (
        <div className="accordionContainer">
          <div className="accordionTab">

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
    }else{
      return null;
    }
  }

}

function mapStateToProps(state) {
  return {
    transactions: state.transactionsInRange,
  };
}

export default connect(
  mapStateToProps,
  null
)(Accordian);
