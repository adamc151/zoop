import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/actions';
import React from 'react';
import Dropzone from 'react-dropzone'
import './FileDrop.css';
import down_arrow from './down-arrow.png';
import tick_icon from './checked.png';
import { Redirect } from 'react-router-dom';
import FileSelector from '../FileSelector/FileSelector.js';


class FileDrop extends React.Component {
    constructor() {
      super()
      this.state = { files: [] }
    }

    onDrop(files) {
        this.setState({
            files
        });

        var file = files[0]
        const reader = new FileReader();
        reader.onload = (event) => {
            this.props.actions.addTransactions(reader.result);
            this.props.actions.addMonthlyTransactions(reader.result);
            this.props.actions.addMonthlyBalanceTransactions(reader.result);

        };

        reader.readAsText(file);
    }

    redirectPage(){
      return <Redirect to="/Dashboard" />
    }

    render() {
      return (
        <section>
          <div className="dropzone">
            <Dropzone className="dropzoneBox" activeClassName="dropzoneActive" onDrop={this.onDrop.bind(this)}>
              <img className="down_arrow" src={this.state.files.length == 0 ? down_arrow : tick_icon} />

              <div>
              <p className="inner">{this.state.files.length == 0 ? "Drop a bank statement here!" : "Successful"}</p>
              {
                this.state.files.length != 0 ? this.redirectPage() : null
              }
              {/* <p className="inner">Drop a bank statement here! Or click to select...</p> */}
              <FileSelector disableFunctionality={true} />
              </div>
            </Dropzone>
          </div>
        </section>
      );
    }
}

function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(
    null,
    mapDispatchToProps
  )(FileDrop);
