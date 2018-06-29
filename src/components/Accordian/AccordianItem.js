import React from 'react';
import './Accordian.css';

export default function AccordianItem(props){

    const { dateString, description, location, amount } = props.transaction;

    return (

      <div className="accordianItemWrapper">
        <div className="itemDate">{dateString}</div>
        <div className="itemLocation">{location}</div>
        <div className="itemAmount">£{amount}</div>
        <div className="close-button" onClick={() => props.callback(props.index)}></div>
      </div>
    );

}
