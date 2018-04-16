import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { LineChart, Line, XAxis, YAxis } from 'recharts';

class Chart extends React.Component {

  render() {
    let data = [];
    console.log(this.props.transactions);
    var reversed = this.props.transactions.slice();
    console.log(reversed.reverse());

    return (<LineChart className="myChart" width={1000} height={400} data={reversed}>
      <XAxis dataKey="dateString"/>
      <YAxis />
      <Line type="monotone" dataKey="amount" stroke="#8884d8" />
    </LineChart>)
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
