import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/actions';
import React from 'react';
import AccordianItem from './AccordianItem';
import './Accordian.css';


class Accordian extends React.Component {

   constructor(props) {
		super(props);

    this.myCallback = this.myCallback.bind(this);
	}

  myCallback(index){
    console.log(index);
    this.props.actions.removeTransaction(index);
  }

  renderTransactions(){
    if (!this.props.transactions) return null;

    return this.props.transactions.map((transaction, i) => {
      return <AccordianItem key={i} index={i} transaction={transaction} callback={this.myCallback} />
    });
  }

  componentWillReceiveProps(nextProps) {
  }


  render() {
    return (
      <div className="accordionContainer">
        <div className="accordionTab">

            {this.props.collapsable ? (<input id="openTab" type="radio" name="tabs1" className="openTabRadio" /> ) : null }
            {this.props.collapsable ? (<input id="closeTab" type="radio" name="tabs1" className="closeTabRadio" /> ) : null }

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
    transactions: state.transactionsInRange,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Accordian);
