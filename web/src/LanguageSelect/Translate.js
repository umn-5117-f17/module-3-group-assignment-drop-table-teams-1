import React, { Component } from 'react';



class Translate extends Component {

  constructor(props) {
    super(props);
    this.base_url = 'https://translation.googleapis.com/language/translate/v2';

    //this.language = this.props.language.bind(this);
    this.source = this.props.login.bind(this);
    this.result = this.props.logout.bind(this);
    this.state = {"q": "",
                   "target": "" ,
                   "format": "",
                   "source": "",
                   "result": "",
                   "model": "NMT",
                   };
    this.clickTranslate = this.clickTranslate.bind(this);

  }

   clickTranslate(e) {
    e.preventDefault();
    console.log(encodeURI(this.refs.TextInput.value));
    const google_url =this.base_url +"?q="+ encodeURI(this.refs.TextInput.value)+"&target=zh-CN&source=en&key=AIzaSyAllxK-KhFvNMtTqkA59tfUkQCGAYNHi5I";
   // const google_url =this.base_url +"?q="+ encodeURI(this.refs.TextInput.value)+"&target=zh-CN&source=en&key=" + String(process.env.GCP_KEY);
    fetch(google_url, {
          method:"POST"})

      .then(res => res.json())
      .then(json => {

        console.log(json);
        //this.setState({result: json.TranslateTextResponseList});  /*this will cause an invoke of the render() function again */
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {

    return(
      <div> 
      <form>
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