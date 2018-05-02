import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/actions';
import React from 'react';
import Dropzone from 'react-dropzone'
import './FileDrop.css';

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
            console.log(event.target.result);
            this.props.actions.addTransactions(reader.result);
        };

        reader.readAsText(file);
            
    }
  
    render() {
      return (
        <section>
          <div className="dropzone">
            <Dropzone className="dropzoneBox" activeClassName="dropzoneActive" onDrop={this.onDrop.bind(this)}>
              <p>Drop a bank statement here!</p>
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