import React from 'react';
import './InOutNet.css';

export default function InOutNet(props){
    return(<div className="inOutNetContainer">
      <div>IN: {props.income}</div>
      <div>OUT: {props.spending}</div>
      <div>NET: {props.net}</div>
    </div>);
}
