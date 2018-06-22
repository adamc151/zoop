import React from 'react';
import './Accordian.css';

export default function AccordianItem(props){

    const { dateString, description, location, amount } = props.transaction;

    return (
      <div className="accordianItemWrapper">
        <div className="itemDate">{dateString}</div>
        <div className="itemLocation">{location}</div>
        <div className="itemAmount">£{amount}</div>
        <button className="itemButton" onClick={() => props.callback(props.index)}>X</button>
      </div>
    );

}
