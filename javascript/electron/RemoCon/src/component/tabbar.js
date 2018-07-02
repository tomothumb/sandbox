import React, { Component } from 'react';

export class Tabbar extends Component {

  render(){
    return(
      <div style={{position:"fixed",backgroundColor:"#CCCCCC",width:"100%",bottom:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <p style={{width:'50%',textAlign:"center",color:"#000000"}}>リモコン</p>
          <p style={{width:'50%',textAlign:"center",color:"#000000"}}>設定</p>
      </div>
    )
  }
}
