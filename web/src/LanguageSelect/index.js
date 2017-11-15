import React, { Component } from 'react';

class LanguageSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      target_lang :"af"
    };
    this.doSetNoteTargetLang = this.doSetNoteTargetLang.bind(this);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.doSetNoteTargetLang = this.doSetNoteTargetLang.bind(this);
    //this.setTargetLang = this.props.setTargetLang.bind(this);
  }


  doSetNoteTargetLang(){
    this.props.setTargetLang(this.state.target_lang);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

    this.doSetNoteTargetLang();

  }




  render() {
    return (

      <div>
        <div className="field">
          <label className="label">Select Language</label>
        </div>
        <div className="field">
          <form>
            <select className="select" name="target_lang" onClick={this.doSetNoteTargetLang} onChange={this.handleInputChange} value={this.state.target_lang} >
              <option value="af">Afrikaans</option>
              <option value="sq">Albanian</option>
              <option value="am">Amharic</option>
              <option value="ar">Arabic</option>
              <option value="da">Danish</option>
              <option value="nl">Dutch</option>
              <option value="fi">Finnish</option>
              <option value="zh-CN">Chinese-Simplified</option>
              <option value="da">Danish</option>
              <option value="nl">Dutch</option>
              <option value="fi">Finnish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="el">Greek</option>
              <option value="haw">Hawaiian</option>
              <option value="iw">Hebrew</option>
              <option value="hi">Hindi</option>
              <option value="it">Italian</option>
              <option value="ja">Japanese</option>
              <option value="ko">Korean</option>
              <option value="ru">Russian</option>
              <option value="so">Somali</option>
              <option value="es">Spanish</option>
              <option value="sv">Swedish</option>
              <option value="tr">Turkish</option>
              <option value="vi">Vietnamese</option>
              <option value="yi">Yiddish</option>
              <option value="zu">Zulu</option>
            </select>
          </form>
        </div>
      </div>

    );
  }
}

export default LanguageSelect;
