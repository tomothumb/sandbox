import React from 'react';
// import Knight from "./Knight";
import Square from "./Square";
import {useDrop} from "react-dnd"
import {ItemTypes} from "../State/Constants";
import {canMoveKnight, moveKnight} from "../State/Game";

// import {moveKnight, canMoveKnight} from "../State/Game";
// import {DndProvider} from "react-dnd"
// import {HTML5Backend} from "react-dnd-html5-backend"
type TypeKnightPosition = [number, number]

interface Prop {
  x: number,
  y: number,
  children?: any
}

export default function BoardSquare({x,y, children}: Prop) {
  const black = (x + y) % 2 === 1

  const [{isOver, canDrop}, drop] = useDrop({
    accept: ItemTypes.KNIGHT,
    drop: () => {
      console.log(x,y)
      moveKnight(x,y)
    },
    canDrop: () => canMoveKnight(x,y),
    collect:(monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop()
    })
  })

  return (
    <div
      ref={drop}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <Square black={black}>{children}</Square>
      {isOver && !canDrop && ( <Overlay color='red' /> )}
      {!isOver && canDrop && ( <Overlay color='yellow' /> )}
      {isOver && canDrop && ( <Overlay color='green' /> )}
    </div>
  )

  // const squares = []
  // for (let i=0; i<64; i++){
  //   squares.push(renderSquare(i,knightPosition))
  // }
  // return (
  //   <DndProvider backend={HTML5Backend}>
  //   <div style={{
  //     width: '300px',
  //     height: '300px',
  //     display: 'flex',
  //     flexWrap: 'wrap'
  //   }}>
  //     {squares}
  //   </div>
  //   </DndProvider>
  // )
}

function Overlay({color}:any){
  return (
    <div style={{
      position:'absolute',
      top:0,
      left:0,
      width: '100%',
      height: '100%',
      zIndex:1,
      opacity:0.5,
      backgroundColor: color,
    }}
    />
  )
}

// function renderSquare(i: number, knightPosition: TypeKnightPosition) {
//   const x = i % 8
//   const y = Math.floor(i / 8)
//   const isKnightHere = knightPosition[0] === x && knightPosition[1] === y
//   const black = (x + y) % 2 === 1
//   const piece = isKnightHere ? <Knight/> : null
//
//
//   return (
//     <div key={i} style={{
//       width: '12.5%',
//       height: '12.5%',
//     }}
//       onClick={()=>handleSquareClick(x,y)}
//     >
//       <Square black={black}
//       >{piece}</Square>
//     </div>
//   )
// }
//
// function handleSquareClick(toX:number, toY:number){
//   if (canMoveKnight(toX, toY)){
//     moveKnight(toX,toY)
//   }
// }
