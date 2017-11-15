import React, { Component } from 'react';
import Modal from 'react-modal';

class ModalContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      showModal: false,
      source_text: "",
      translation: "",
      image_url: ""
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount() {
    // console.log("did mount sanity check");
    // console.log(this.props);
    let tmp_note = this.props.note_content;
    const src_txt = this.props.source_text;
    const trans = this.props.translation;
    const img_src = this.props.imgage;

    // console.log(tmp_note);
    // console.log("did mount sanity check");
    // console.log(this.props);
    this.setState({source_text: src_txt});
    this.setState({translation: trans});
    this.setState({image_url: img_src});



  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }

  render() {
    return (
<<<<<<< HEAD
        <div>
          <a onClick={this.handleOpenModal}> {this.state.source_text}</a>
          <Modal isOpen={this.state.showModal} onClose={this.handleCloseModal}>
            <h1>{this.state.translation}</h1>
             <img src={this.state.image_url} alt="oops, we couldn't find it on wikipedia!" height="50%" width="50%"/>
             <br></br>
             <span>{this.state.source_text}</span>
            <p><button onClick={this.handleCloseModal}>Close</button></p>
          </Modal>
        </div>
=======
      <div>
       <a onClick={this.handleOpenModal}> {this.state.source_text}</a>
       <Modal isOpen={this.state.showModal} onClose={this.handleCloseModal}>
         <span className = "title" >{this.state.source_text}</span>
         <h1 className = "title" >{this.state.translation}</h1> <p><button className="button is-link" onClick={this.handleCloseModal}>Close</button></p>
          <img src={this.state.image_url} alt="oops, we couldn't find this image on wikipedia!"></img>
          <br></br>


       </Modal>
      </div>
>>>>>>> origin/aishwarya_new
      )
  }
}

export default ModalContainer;
