import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/actions';
import React from 'react';
import './FileClear.css';

class FileClear extends React.Component {

    constructor(props) {
        super(props);
        this.handleFileClear = this.handleFileClear.bind(this);
    }

    handleFileClear(evt) {
        this.props.actions.clearStore();
    }


    render() {
        return (
        <div className="fileClear" >
            <button id="clear" name="clear" onClick={this.handleFileClear} className="clearButton">CLEAR</button>
            <label for="clear">
            <span>Clear File</span>
            </label>
        </div>
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
)(FileClear);
