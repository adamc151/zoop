import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import close_icon from './close.png';
import './Accordian.css';


export default function AccordianItem(props){

    const { dateString, description, location, amount } = props.transaction;

    return (

      <div className="tab-contents-single accordianItemWrapper">
      <Grid fluid={true}>
        <Row className="show-grid">
          <Col md={2} lg={2}>
            <div className={ amount>0 ? 'greenClass' : 'redClass' }>£{amount}</div>
          </Col>
          <Col md={7} lg={7}>
            <div className="">{description}</div>
          </Col>
          <Col md={2} lg={2}>
            <div>{dateString}</div>
          </Col>
          <Col md={1} lg={1}>
            {/* <div className="close-button" onClick={() => props.callback(props.index)}></div> */}
            <img className="close_icon" src={close_icon} onClick={() => props.callback(props.index)}/>
          </Col>
        </Row>
      </Grid>

      </div>
    );

}
