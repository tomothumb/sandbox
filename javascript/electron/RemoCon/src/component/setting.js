import React, { Component } from 'react';

export class CP_setting extends Component {
  constructor(props){
    super(props);
    this.state = {
      text_input: "",
      access_token : null
    };
  }
  componentWillMount(){
    const data = localStorage.getItem('access_token');
      if(data){
        this.setState({access_token:data});
      }
  }
  setAccessToken(){
      localStorage.setItem('access_token',this.state.text_input);
    this.setState({ access_token: this.state.text_input });
    this.setState({ text_input: "" });
  }
  handleInput(e){
      console.log(e);
      this.setState({ text_input: e.target.value });
  }

  render(){
    let access_token = (this.state.access_token != "")
        ? <p style={{fontSize:"12px"}}>{this.state.access_token}</p>
        : null;

    return(
      <div style={{}}>
        {access_token}
          <input type="text"
              onChange={(e)=>{this.handleInput(e);}}
              value={this.state.text_input}
              placeholder='>note'
              style={{color:'red',borderBottomColor:'black',borderBottomWidth:1}}
          />
          <button onClick={this.setAccessToken.bind(this)} >save</button>
      </div>

    )
  }
}

