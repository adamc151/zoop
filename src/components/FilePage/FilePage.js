import PropTypes from "prop-types";
import React from "react";
import FileDrop from "../FileDrop/FileDrop.js";

import FileSelector from "../FileSelector/FileSelector.js";
import { Grid, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./FilePage.css";
import santander from "./santanderJPG.jpg";
import demogif from "./zoopdemo2.gif";

export default class FilePage extends React.Component {
  constructor() {
    super();
    this.state = { showDemo: false };
  }

  render() {
    const {} = this.props;

    return (
      <div className="uploadPage">
        <Grid fluid={true}>
          <Row className="show-grid">
            <Col md={12} lg={12}>
              <div className="banksContainer">
                <p className="banksText">Supported Banks</p>
                <div className="emptyLogoContainer">
                  <div className="emptyLogo"></div>
                  <div className="bankName">Santander</div>
                </div>
                {/* <img className="santander_logo" src={santander} /> */}
              </div>
            </Col>
          </Row>

          <Row className="show-grid">
            <Col md={12} lg={12}>
              <FileDrop />
            </Col>
          </Row>

          <input
            type="button"
            name="file2"
            onClick={() => {
              this.setState({ showDemo: true });
            }}
            id="file2"
            className="inputfile"
          />
          <label for="file2" className="DemoLabel">
            <span>Demo</span>
          </label>

          {this.state.showDemo && (
            <div className="demoVid">
              <img className="demoGif" src={demogif} />
              <div
                className="closeDemo"
                onClick={() => {
                  this.setState({ showDemo: false });
                }}
              >
                x
              </div>
              <div className="demoPrompt">Demo...</div>
            </div>
          )}

          <div class="footer">
            <p>
              We NEVER store your financial data! <i class="em em---1"></i>
            </p>
          </div>
        </Grid>
      </div>
    );
  }
}
