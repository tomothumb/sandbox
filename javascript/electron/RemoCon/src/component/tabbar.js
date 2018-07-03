import React, { Component } from 'react';
import App from "../app";

export class Tabbar extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
    return(
      <div style={{position:"fixed",width:"100%",backgroundColor:"#FFFFFF",bottom:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <p onClick={()=>this.props.handleTab('remocon')} style={{width:'50%',textAlign:"center",color:"#000000"}}>リモコン</p>
          <p onClick={()=>this.props.handleTab('setting')} style={{width:'50%',textAlign:"center",color:"#000000"}}>設定</p>
      </div>
    )
  }
}
