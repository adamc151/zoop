import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/actions';
import React from 'react';
import './FileSelector.css';

class FileSelector extends React.Component {

   constructor(props) {
		super(props);
    this.list = React.createRef();
    this.handleFileSelect = this.handleFileSelect.bind(this);
	}

  handleFileSelect(evt) {

      var file = evt.target.files[0]; // FileList object
			var textType = /text.*/;

			if (file.type.match(textType)) {
				var reader = new FileReader();

				reader.onload = () => {
          console.log('file contents: ' + reader.result);
          this.props.actions.addTransactions(reader.result);
          this.props.actions.addMonthlyTransactions(reader.result);
				}

				reader.readAsText(file);
			} else {
        this.setState({ myoutput: "File not supported!" });
			}
  }


  render() {
    return (
      <div className="fileSelector" >
        <input type="file" name="file" onChange={this.handleFileSelect} id="file" className="inputfile"/>
        <label for="file">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17">
            <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/>
          </svg> <span>Choose a file&hellip;</span>
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
)(FileSelector);
