import React, { Component } from 'react';
import App from "../app";

export class Tabbar extends React.Component {

    constructor(props){
        super(props);
        // this.handleTab = this.handleTab;
    }

    render(){
    return(
      <div style={{position:"fixed",width:"100%",bottom:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <p  style={{width:'50%',textAlign:"center",color:"#000000"}}>リモコン</p>
          <p  style={{width:'50%',textAlign:"center",color:"#000000"}}>設定</p>
      </div>
    )
  }
}
