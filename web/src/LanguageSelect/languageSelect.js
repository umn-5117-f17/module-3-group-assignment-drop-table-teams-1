import React, { Component } from 'react';



class TextInput extends Component {

  constructor(props) {
    super(props);
    //this.language = this.props.language.bind(this);
    //this.source = this.props.login.bind(this);
    //this.result = this.props.logout.bind(this);
    this.state = {"language": ""};

    this.handleInputChange = this.handleInputChange.bind(this);

  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }


  render() {

    return(
      <div>
      <label> Slelect Language</label>
      <form>
      <select name="languageInput" onClick={this.handleInputChange} value={this.state.language} >
        <option value="tr">Turkish</option>
        <option value="ru">Russian</option>
        <option value="pt">Russian</option>
        <option value="it">Russian</option>
        <option value="nl">Russian</option>
        <option value="hu">Russian</option>
        <option value="fr">Russian</option>
        <option value="es">Russian</option>
        <option value="en">Russian</option>
        <input type="text"
         placeholder="Translate"
         ref="TextInput"/>
         <button  onClick={this.clickTranslate}>/Translate</button>
          </form>
          </div>



      );

   }
 }

export default Translate;
