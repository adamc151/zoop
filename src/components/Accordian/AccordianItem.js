import React from 'react';

export default function AccordianItem(props){

    const { dateString, description, location, amount } = props.transaction;

    return (
      <div>
      <div>{dateString}</div>
      <div>{location}</div>
      <div>{amount}</div>
      </div>
    );

}
