import React from 'react';
import logo from './noimage.png'

import axios from 'axios';

export default class Card extends React.Component {
	constructor() {
		super();
		this.state = {
  		media: [],
  		searchText: ''
 	}
}
  componentDidMount() {
    axios.get('http://localhost:8080/tweets/details/INDvWI')
      .then(res => {
        const media = res.data.data.twitter;
        // console.log(media);
        this.setState({ media });
      });
  }

 /* let newData = media.map(function(item, index, array) {
  	return item;
  });*/

  onChangeText=(text)=>{
    this.setState({
    	searchText: text.target.value
    })
	}
	handleClick=()=>{
    axios.get('http://localhost:8080/tweets/details/'+this.state.searchText)
      .then(res => {
        const media = res.data.data.twitter;
        // console.log(media);
        this.setState({ media });
      });
	}


  _renderSearchBox=()=>{
  	return(
  		<div>
  		<br />
  		<label>
   			 HashTag : &nbsp; &nbsp;   			 
    	<input type="text" name="hastag"  onChange={this.onChangeText}/>
    	 &nbsp; &nbsp; 
    	<button onClick={this.handleClick}>Search</button>
    	<br /><br />
  		</label>
  		</div>
  		)
  }


  render() {
if(this.state.media.length>0){
    return (
      <div>
         {this._renderSearchBox()}
        <table id="customers">
        <tbody>
         <tr>
          <th style={   { width: 150}}>Screen Name</th>
          <th style={   { width: 600}}>Text</th>
          <th style={   { width: 350}}>Media</th>
         </tr>
         {

         	  	this.state.media.map( (val, key) => (
         <tr>
          <td>{(val['screenName'])}</td>
          <td>{val['text']}</td>
          <td>{(val['media'].length>0)?(<img src={val['media'][0]['mediaURL']} height='60' width='60'/>):(<img src={logo} alt="hello" height='60' width='60'/>)}</td>
         </tr>
         )
         	  	)
     }
     </tbody>
       </table>
      </div>
    )
}else{
return(null)
}
}
}
