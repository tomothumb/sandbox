import React, {createContext, useContext, useState} from "react";
import Measure from 'react-measure'


export const MeasureContext = createContext({} as any);

export const MeasureProvider = ({children}: any) => {

  const [xs, setXs] = useState<any>({})
  const [ys, setYs] = useState<any>({})

  const resetX = () => {
    setXs({})
    setYs({})
  }
  const addX = (d:any,k:any,v:any) => {
    setXs((prevState:any)=>{
      let new_state = {...prevState}
      Object.keys(new_state).map((time_stamp, index) => {
        if(time_stamp.toString() !== d.toString()){
          delete new_state[time_stamp]
        }
      });
      if(undefined === new_state[d]){
        new_state[d] = {}
      }

      new_state[d][k] = v
      return new_state
    })
  }
  const addY = (d:any,k:any,v:any) => {
    setYs((prevState:any)=>{
      let new_state = {...prevState}
      Object.keys(new_state).map((time_stamp, index) => {
        if(time_stamp.toString() !== d.toString()){
          delete new_state[time_stamp]
        }
      });
      if(undefined === new_state[d]){
        new_state[d] = {}
      }

      new_state[d][k] = v
      return new_state
      // return {
      //   ...prevState,
      //   k:v
      // }
    })
  }
  return (
    <MeasureContext.Provider value={{
      xs, setXs,
      ys, setYs,
      addX, addY, resetX
    }}>
      {children}
    </MeasureContext.Provider>
  )
}

export function MeasureBoxes() {

  const {xs, ys, resetX} = useContext(MeasureContext);

  const [time, setTime] = useState((new Date()).getTime());
  let d = time
  // d = (new Date()).getTime()
  const boxes = [1,2,3,4,5].map((item)=>{
    return <MeasureBox key={item} v={item} d={d} />
  })
  return (
    <>
      <Measure
        bounds
        onResize={() => {
          setTime((new Date()).getTime())
          // resetX()
        }}
      >
        {({ measureRef }) => (
          <div ref={measureRef}>{boxes}</div>
        )}
      </Measure>

    </>
  )
}


export function MeasureBox(props:any) {

  const {addX, addY} = useContext(MeasureContext);

  const [w, setWidth] = useState(-1)
  const [h, setHeight] = useState(-1)
  const [t, setTop] = useState(-1)

  return (
    <Measure
      bounds
      onResize={(contentRect) => {
        // console.log(props.d,props.v)
        if('bounds' in contentRect && undefined !== contentRect.bounds){
          setWidth(contentRect.bounds.width)
          setHeight(contentRect.bounds.height)
          setTop(contentRect.bounds.top)
          addX(props.d, props.v, contentRect.bounds.width)
          addY(props.d, props.v, contentRect.bounds.height)
        }

      }}
    >
      {({ measureRef }) => (
        <div ref={measureRef}>
          I can do cool things with my dimensions now :D
          w:{w},
          h:{h},
          t:{t},
          {h > 250 && (
            <div>Render responsive content based on the component size!</div>
          )}
        </div>
      )}
    </Measure>
  )
}
