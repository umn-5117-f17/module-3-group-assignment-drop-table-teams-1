import React, { Component } from 'react';
import Modal from 'react-modal';

class ModalContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      showModal: false
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }

  render() {
    return (
        <div>
          <button onClick={this.handleOpenModal}>Open modal</button>
          <Modal isOpen={this.state.showModal} onClose={this.handleCloseModal}>
            <h1>Modal title</h1>
            <p>hello</p>
            <p><button onClick={this.handleCloseModal}>Close</button></p>
          </Modal>
        </div>
      )
  }
}

export default ModalContainer;
