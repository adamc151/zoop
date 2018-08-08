import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import close_icon from './close.png';
import './Accordian.css';


export default function AccordianItem(props){

    const { dateString, description, location, amount } = props.transaction;

    return (
      <div className="tab-contents-single accordianItemWrapper">
        <div className={ amount>0 ? 'greenClass' : 'redClass' }>£{amount}</div>
        <div className="itemLocation">{description}</div>
        <div className="itemDate">{dateString}</div>
        <div className="close-button" onClick={() => props.callback(props.index)}></div>
      </div>
    );

}
