import {connect} from 'react-redux';
import React from 'react';
import FileSelector from '../components/FileSelector/FileSelector.js';
import Chart from '../components/Chart/Chart.js';
import Accordian from '../components/Accordian/Accordian.js';
import DateRangeSelector from '../components/DateRangeSelector/DateRangeSelector.js';
import InOutNet from '../components/InOutNet/InOutNet.js';


//We Can Use MainContainer for now as a single point to access data in the store (mapStateToProps)
//We then just pass the data down to the individual components via props
//If a Component wants to change or add to the data in the store...they can connect to the actions (mapDispatchToProps)
//Then once the data changes...it will update here in MainComponent and the updated data will propogate down again.
class MainContainer extends React.Component {

  render(){
    const { allTransactions, transactions, income, spending, net } = this.props;

    let initialStartDate = null;
    let initialEndDate = null;

    if(allTransactions.length > 0){
      initialStartDate = allTransactions[0].date;
      initialEndDate = allTransactions[allTransactions.length - 1].date;
    }

    return (
      <div>
      <FileSelector />
      <DateRangeSelector initialStartDate={initialStartDate} initialEndDate={initialEndDate}/>
      <Chart transactions={transactions} />
      <InOutNet income={income} spending={spending} net={net} />
      <Accordian transactions={transactions} />
      </div>);
  }

}


function mapStateToProps(state) {
  return {
    allTransactions: state.allTransactions,
    transactions: state.transactionsInRange,
    income: state.income,
    spending: state.spending,
    net: state.net
  };
}


export default connect(
  mapStateToProps,
  null
)(MainContainer);
