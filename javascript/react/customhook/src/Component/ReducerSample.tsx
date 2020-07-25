import React, {useReducer} from 'react';

function reducer(state:any, action:any) {
  switch (action.type) {
    case 'ADD':
      return {count: state.count + action.num }
    case 'SUB':
      return {count: state.count - action.num }
    default:
      throw new Error()
  }
}

const initialState = {
  count: 0
}

export function ReducerSample({props}: any) {

  const [countState, dispatch] = useReducer(reducer, initialState)

  return (
    <div>
      <p>{countState.count}</p>
      <button onClick={(e)=>dispatch({type:'SUB',num:2})}>-2</button>
      <button onClick={(e)=>dispatch({type:'ADD',num:2})}>+2</button>
    </div>
  )
}