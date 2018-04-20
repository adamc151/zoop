import React from 'react';

export default function AccordianItem(props){

    const { dateString, description, amount } = props.transaction;

    return (
      <div>
      <div>{dateString}</div>
      <div>{description}</div>
      <div>{amount}</div>
      </div>
    );

}
