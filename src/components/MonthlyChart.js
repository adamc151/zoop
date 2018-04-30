import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class MonthlyChart extends React.Component {

  renderLineChart(){
    return (
    <BarChart className="myChart" width={1500} height={500} data={this.props.monthlyTransactions}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis unit={" £"}/>
      <Tooltip isAnimationActive={false}/>
      <Legend />
      <Bar dataKey="net" fill="#ff751a" />
    </BarChart>)
  }

  render() {
    return this.props.monthlyTransactions.length > 0 ? (<div>{this.renderLineChart()}</div>) : null;
  }

}

this.propTypes = {
  monthlyTransations: PropTypes.array
};

function mapStateToProps(state) {
  return {
    monthlyTransactions: state.monthlyTransactions.monthlyTransactionsArray
  };
}


export default connect(
  mapStateToProps,
  null
)(MonthlyChart);
