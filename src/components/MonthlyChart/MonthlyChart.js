import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './MonthlyChart.css';

class MonthlyChart extends React.Component {

  renderLineChart(){
    return (
        <div className="chartContainer" >
            <ResponsiveContainer width="100%" height="100%" >
                <BarChart className="myChart" width={1500} height={500} data={this.props.monthlyTransactions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis unit={" £"}/>
                <Tooltip isAnimationActive={false}/>
                {/* <Legend /> */}
                <Bar dataKey="net" fill="#ff751a" />
                </BarChart>
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
