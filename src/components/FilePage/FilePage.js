import PropTypes from 'prop-types';
import React from 'react';
import FileDrop from '../FileDrop/FileDrop.js';

import FileSelector from '../FileSelector/FileSelector.js';
import {Grid, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class FilePage extends React.Component {

  
  render() {

    const { } = this.props;

    return (
    <div>
      <Grid fluid={true}>

        <Row className="show-grid">
          <Col md={12} lg={12}>
            <FileDrop />
          </Col>
        </Row>
        
        <Row className="show-grid">
          <Col md={12} lg={12}>
            <FileSelector />
          </Col>
        </Row>

        


      </Grid>
      
    </div>);
  }

}
