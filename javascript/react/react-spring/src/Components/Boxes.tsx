import React, {useState} from "react";
import {useSpring, animated, interpolate} from 'react-spring'

export function Boxes() {

  const length = 10
  const [index, setIndex] = useState(1)

  const [data, setData] = useState(
    [{v:1},{v:2},{v:3},{v:4},{v:5},{v:6},{v:7},{v:8}]
  )

  const [str, setStr] = useState('abc')

  const setBoxData = () => {
    let datas = []
    for(let i = index; i < index + length; i++){
      datas.push({
        v:i
      });
    }
    setData(datas);
  }
  const handleClick = function(){

    setIndex(index + 1);
    setBoxData();

    if(str == 'xyz'){
      setStr( 'abc')
    }else{
      setStr( 'xyz')
    }
  }

  let boxes = data.map((item,box_idx)=> {
    console.log(item,box_idx)
    return(<Box key={item.v} value={item.v} />)
    }
  )

  return(
    <div>
      <div className="boxes">
        {boxes}
      </div>
      <div>
        {str}
      </div>
      <button type="button"
              onClick={handleClick}>ボタン</button>
    </div>
  )
}

export function Box(props:any) {

  return(
    <div className="box">{props.value}</div>
  )
}
