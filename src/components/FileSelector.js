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
          this.props.fileReadActions.addTransactions(reader.result);
          this.props.fileReadActions.addMonthlyTransactions(reader.result);
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



        // 
        // <div className="tab blue">
        //   <input id="tab-five" type="radio" name="tabs1" />
        //   <label for="tab-five">Label Two</label>
        //   <div className="tab-content">
        //     <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, architecto, explicabo perferendis nostrum, maxime impedit atque odit sunt pariatur illo obcaecati soluta molestias iure facere dolorum adipisci eum? Saepe, itaque.</p>
        //   </div>
        // </div>
        //
        // <div className="tab blue">
        //   <input id="tab-six" type="radio" name="tabs1" />
        //   <label for="tab-six">Label Three</label>
        //   <div className="tab-content">
        //     <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, architecto, explicabo perferendis nostrum, maxime impedit atque odit sunt pariatur illo obcaecati soluta molestias iure facere dolorum adipisci eum? Saepe, itaque.</p>
        //   </div>
        // </div>
