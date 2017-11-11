import React, { Component } from 'react';
import Dbpedia from '../Dbpedia';
import Buttons from '../Button';
import LanguageSelect from '../LanguageSelect'

class NewNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      words: "",
      imgURL: "",
      source_langs:"en",
      target_lang:"af"
    };
    this.setTargetLang = this.setTargetLang.bind(this);
  }

  setTargetLang(language) {
    this.setState({target_lang:language});
    // console.log(JSON.stringify(this.state));
  }

  render() {
    return (
      <div>
        <LanguageSelect setTargetLang={this.setTargetLang.bind(this)}  {...this.props} />
        <Dbpedia target_lang={this.state.target_lang}/>
        <Buttons />
      </div>
    );
  }
}

export default NewNote;
