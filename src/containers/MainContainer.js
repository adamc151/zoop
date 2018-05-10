import {connect} from 'react-redux';
import {Grid, Row, Col} from 'react-bootstrap';
import React from 'react';
import FileSelector from '../components/FileSelector/FileSelector.js';
import Chart from '../components/Chart/Chart.js';
import Accordian from '../components/Accordian/Accordian.js';
import DateRangeSelector from '../components/DateRangeSelector/DateRangeSelector.js';
import InOutNet from '../components/InOutNet/InOutNet.js';
import MonthlyChart from '../components/MonthlyChart/MonthlyChart.js';
import MonthlyBalanceChart from '../components/MonthlyBalanceChart/MonthlyBalanceChart.js';
import FileDrop from '../components/FileDrop/FileDrop.js';
import FileClear from '../components/FileClear/FileClear.js';



//We Can Use MainContainer for now as a single point to access data in the store (mapStateToProps)
//We then just pass the data down to the individual components via props
//If a Component wants to change or add to the data in the store...they can connect to the actions (mapDispatchToProps)
//Then once the data changes...it will update here in MainComponent and the updated data will propogate down again.
class MainContainer extends React.Component {

  render(){

    const { allTransactions, transactions, monthlyTransactionsArray, monthlyBalanceTransactionsArray, income, spending, net } = this.props;

    let initialStartDate = null;
    let initialEndDate = null;

    if(allTransactions.length > 0){
      initialStartDate = allTransactions[0].date;
      initialEndDate = allTransactions[allTransactions.length - 1].date;
    }

    return (
      <div>
        <Grid fluid={true}>
          <Row className="show-grid">
            <Col md={12} lg={12}>
              <FileDrop />
            </Col>
          </Row>
          
          <Row className="show-grid">
            <Col md={6} lg={6}>
              <FileSelector />
            </Col>
            <Col md={6} lg={6}>
              <FileClear />
            </Col>
          </Row>

          <Row className="show-grid">
            <Col md={12} lg={5}>
              <DateRangeSelector initialStartDate={initialStartDate} initialEndDate={initialEndDate}/>
            </Col>
            <Col md={12} lg={7}>
              <InOutNet income={income} spending={spending} net={net} />
            </Col>
          </Row>

          <Row className="show-grid">
            <Col md={12} lg={12}>
              <Accordian transactions={transactions} />
            </Col>
          </Row>

          <Row className="show-grid">
            <Col md={12} lg={12}>
              <Chart transactions={transactions} />
            </Col>
          </Row>

          <Row className="show-grid">
            <Col md={12} lg={8}>
              <MonthlyChart monthlyTransactions={monthlyTransactionsArray}/>
            </Col>
            <Col md={12} lg={4}>
              <MonthlyBalanceChart monthlyBalanceTransactionsArray={monthlyBalanceTransactionsArray}/>
            </Col>
          </Row>
        </Grid>
        
        <br/>
        <br/>
      </div>);
  }
}



/***********************
The code below assigns attributes in the store to the props of this container.
So we can then access then via this.props.nameOfAttribute
************************/
function mapStateToProps(state) {
  return {
    allTransactions: state.allTransactions,
    transactions: state.transactionsInRange,
    monthlyTransactionsArray: state.monthlyTransactionsArray,
    monthlyBalanceTransactionsArray: state.monthlyBalanceTransactionsArray,
    income: state.income,
    spending: state.spending,
    net: state.net
  };
}


export default connect(
  mapStateToProps,
  null
)(MainContainer);
