import React from 'react';
import logo from './noimage.png'
import anzlogo from './anz_logo.png'

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
    axios.get('http://ghci.us-east-2.elasticbeanstalk.com/tweets/details/GHCI')
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
    axios.get('http://ghci.us-east-2.elasticbeanstalk.com/tweets/details/'+this.state.searchText)
      .then(res => {
        const media = res.data.data.twitter;
        // console.log(media);
        this.setState({ media });
      });
	}


  _renderSearchBox=()=>{
  	return(
  		<div>
      <img src={anzlogo} alt="hello" height='60' width='150' />
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
      <div id="load_tweets">
         {this._renderSearchBox()}
        <table id="customers">
        <tbody>
         <tr>
          <th style={   { width: '15%'}}>User</th>
          <th style={   { width: '35%'}}>Tweet</th>
          <th style={   { width: '50%'}}>Media</th>
         </tr>
         {

         	  	this.state.media.map( (val, key) => (
         <tr>
          <td>{(val['screenName'])}<br></br>{(val['createdDt'])}<br></br>{(val['city'])}<br></br>{(val['country'])}</td>
          <td>{val['text']}</td>
          <td>{(val['media'].length>0)?(<img src={val['media'][0]['mediaURL']} alt="N/A" height='50%' width='50%'/>):(<img src={logo} alt="hello" height='60' width='60'/>)}</td>
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
