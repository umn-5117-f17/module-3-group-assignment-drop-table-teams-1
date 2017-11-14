import React, { Component } from 'react';
import Dbpedia from '../Dbpedia';
import LanguageSelect from '../LanguageSelect';

class NewNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      words: "",
      imgURL: "",
      source_langs:"en",
      target_lang:"af",
      notes: []
    };
    this.setTargetLang = this.setTargetLang.bind(this);
    this.setNotes = this.setNotes.bind(this);
  }

  setTargetLang(language) {
    this.setState({target_lang:language});
  }

  setNotes(notes){
    this.setState({notes: notes});
  }

  render() {
    return (
      <div>
        <LanguageSelect setTargetLang={this.setTargetLang.bind(this)}  {...this.props} />
        <Dbpedia {...this.props} target_lang={this.state.target_lang} setNotes={this.setNotes}/>
      </div>
    );
  }
}

export default NewNote;
