import React from 'react';


import axios from 'axios';

export default class Card extends React.Component {
	constructor() {
		super();
		this.state = {
  		media: []
 	}
}
  componentDidMount() {
    axios.get(`http://localhost:8080/tweets/details/INDvWI`)
      .then(res => {
        const media = res.data.data.twitter;
        // console.log(media);
        this.setState({ media });
      })
  }

 /* let newData = media.map(function(item, index, array) {
  	return item;
  });*/


  render() {
if(this.state.media.length>0){
	console.log('t',this.state.media)
    return (
      <div>
        <table id="customers">
        <tbody>
         <tr>
          <th>Screen Name</th>
          <th>Text</th>
          <th>Media</th>
         </tr>
         {

         	  	this.state.media.map( (val, key) => (
         <tr>
          <td>{(val['screenName'])}</td>
          <td>{val['text']}</td>
          <td>{(val['media'].length>0)?(<img src={val['media'][0]['mediaURL']} alt='Smiley face' height='42' width='42'/>):('no image')}</td>
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
