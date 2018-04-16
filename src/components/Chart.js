import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { LineChart, Line, XAxis, YAxis } from 'recharts';

class Chart extends React.Component {

  renderLineChart(){
    return (
      <LineChart className="myChart" width={1000} height={400} data={this.props.transactions}>
      <XAxis dataKey="dateString"/>
      <YAxis />
      <Line type="monotone" dataKey="amount" stroke="#8884d8" />
      <Line type="monotone" dataKey="accumulative" stroke="#8884d8" />
    </LineChart>)
  }

  render() {
    return this.props.transactions.length > 0 ? (<div>{this.renderLineChart()}</div>) : null;
  }

}

this.propTypes = {
  transations: PropTypes.array
};

function mapStateToProps(state) {
  return {
    transactions: state.transactions
  };
}


export default connect(
  mapStateToProps,
  null
)(Chart);
