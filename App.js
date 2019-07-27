import React, { Component } from 'react'
import './bootstrap.min.css'
import './zain.css'
import _ from 'lodash'
import Firebase from './components/Firebase';
export default class App extends Component {
  
  componentDidMount = async() => {

   await this.getImage()
  };
  
  state={
    text:'',
    id:'',
    data:'',
    get:{} 
  }
  btn(){
    Firebase.database().ref('/products').push({
      text:this.state.text
    });
  }
  fetch(){
    
            var ref = Firebase.database().ref("/products"); //Here assuming 'Users' as main table of contents   

    ref.once('value').then(snapshot => {
      console.log(snapshot.val());
      var key = Object.keys(snapshot.val());
      console.log(key)
      this.setState({get:snapshot.val()}) 
  })

}

delete(id){
  Firebase.database().ref("/products").child(id).remove();  
  
}
update(id){
  Firebase.database().ref("/products").child(id).update({
    productName:'zain'
  });  

}
upload(){
  Firebase.storage().ref('images').child('filename').getDownloadURL.then(url => this.setState({avatarURL: url}));
 
}

async getImage(){
  Firebase.storage()
  .ref("/pics")
  .child("9a183298-348f-4c00-bea3-121bd691d773").getDownloadURL().then(url=>{
    console.log(url)
    this.setState({data:url})
  })

}
renderNotes(){
  return _.map(this.state.get , (cat,key)=>{
    return(
      <div key={key}>
          <h2>{cat.category}</h2>
          <h2>{key}</h2>
      </div>
    )
})
}

  render() {
    return (
      <div>
         <input onChange={(event)=>this.setState({text:event.target.value})} />
         <input onChange={(event)=>this.setState({id:event.target.value})} />

         <button onClick={()=>{this.btn()}}>Create</button>
         <button onClick={()=>{this.fetch()}}>Fetch</button>
         <button onClick={()=>{this.delete(this.state.id)}}>Delete</button>
         <button onClick={()=>{this.update(this.state.id)}}>Update</button>
         <button onClick={()=>{this.upload()}}>Image Upload</button>
         {this.renderNotes()}
         <img src ={this.state.data} style={{height:200,width:200}} alt="none"/>
       </div>
    )
  }
}

// const {currentUser} =firebase.auth();
//firebase.database().ref(`/users/${currentUser}.uid`)
