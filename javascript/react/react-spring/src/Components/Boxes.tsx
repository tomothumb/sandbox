import React, {useCallback, useState} from "react";
import {useSpring, animated, interpolate, useTransition} from 'react-spring'

export function Boxes() {


  const length = 10
  const [index, setIndex] = useState(1)
  const [direct, setDirect] = useState('prev')

  const [datas, setDatas] = useState(
    [{v:1},{v:2},{v:3},{v:4},{v:5},{v:6},{v:7},{v:8}]
  )

  const transitions = useTransition(datas,data => data.v, {
    from: ()=>{
      console.log(direct)
      if(direct === 'next'){
        return {opacity:0,marginLeft:"0%",marginRight:"-10%"}
      }else{
        return {opacity:0,marginRight:"0%",marginLeft:"-10%"}
      }
    },
    enter: {opacity:1,marginLeft:"0%",marginRight:"0%"},
    leave: ()=>{
      if(direct === 'next'){
        return {opacity:0,marginLeft:"-10%",marginRight:"0%"}
      }else{
        return {opacity:0,marginRight:"-10%",marginLeft:"0%"}
      }
    },
  })

  const setBoxData = (start:number) => {
    let new_datas = []
    for(let i = start; i < start + length; i++){
      new_datas.push({
        v:i
      });
    }
    setDatas(new_datas);
  }
  const handleClick = useCallback(
    function(){
      setDirect((prevstate)=> {
        return 'next'
      })
      setIndex((previndex)=> {
        setBoxData(previndex + 1)
        return previndex + 1
      })

    },[index,direct]
  )
  const handlePrev = useCallback(
    function(){
      setDirect((prevstate)=> {
        return 'prev'
      })
      setIndex((previndex)=> {
        setBoxData(previndex - 1)
        return previndex - 1
      })
    },[index,direct]
  )


  let boxes = transitions.map(({item,props,key})=> {
      // console.log(item,props,key)
      return(
        <animated.div key={key} style={props}>
          <Box value={item.v} />
        </animated.div>
      )
    }
  )

  // let boxes = datas.map((item,box_idx)=> {
  //   console.log(item,box_idx)
  //   return(
  //     <animated.div>
  //       <Box key={item.v} value={item.v} />
  //     </animated.div>
  //     )
  //   }
  // )

  return(
    <div>
      <div className="boxes">
        {boxes}
      </div>
      <div className="boxes">
        {boxes}
      </div>
      <div className="boxes">
        {boxes}
      </div>


      <button type="button" onClick={()=> {
        handlePrev()
      }}>Prev</button>
      <button type="button" onClick={()=> {
        handleClick()
      }}>Next</button>
    </div>
  )
}

export function Box(props:any) {

  return(
    <div className="box">{props.value}</div>
  )
}
