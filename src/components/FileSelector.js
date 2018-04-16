import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as fileReadActions from '../actions/fileReadActions';
import React from 'react';


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
          this.props.fileReadActions.parseFile(reader.result);
				}

				reader.readAsText(file);
			} else {
        this.setState({ myoutput: "File not supported!" });
			}
  }


  render() {
    return (
      <div>
        <input type="file" onChange={this.handleFileSelect}/>
      </div>
    );
  }
}



function mapDispatchToProps(dispatch) {
  return {
    fileReadActions: bindActionCreators(fileReadActions, dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps
)(FileSelector);
