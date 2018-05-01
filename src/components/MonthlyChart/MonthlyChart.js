import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { ComposedChart, Bar, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import './MonthlyChart.css';

class MonthlyChart extends React.Component {

  renderLineChart(){
    return (
        <div className="chartContainer" >
          <ResponsiveContainer width="100%" height="100%" >
            <ComposedChart className="myChart" data={this.props.monthlyTransactions} margin={{top: 30, right: 30, bottom: 30, left: 30}} >
              <XAxis dataKey="date" />
              <YAxis unit={" £"}/>
              <Tooltip />
              <Legend />
              <Bar dataKey="net" fill="#ff751a" />
              <Area type="monotone" dataKey="diff" fill="#8884d8" stroke="#8884d8" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        )
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
    monthlyTransactions: state.monthlyTransactionsArray
  };
}


export default connect(
  mapStateToProps,
  null
)(MonthlyChart);
