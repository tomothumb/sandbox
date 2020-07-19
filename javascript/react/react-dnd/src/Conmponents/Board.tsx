import React from 'react';
import Knight from "./Knight";
// import {moveKnight, canMoveKnight} from "../State/Game";
import {DndProvider} from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend"
import BoardSquare from "./BoardSquare";
type TypeKnightPosition = [number, number]

interface Prop {
  knightPosition: TypeKnightPosition
}

export default function Board({knightPosition}: Prop) {
  const squares = []
  for (let i=0; i<64; i++){
    squares.push(renderSquare(i,knightPosition))
  }
  return (
    <DndProvider backend={HTML5Backend}>
    <div style={{
      width: '300px',
      height: '300px',
      display: 'flex',
      flexWrap: 'wrap'
    }}>
      {squares}
    </div>
    </DndProvider>
  )
}

function renderSquare(i: number, knightPosition: TypeKnightPosition) {
  const x = i % 8
  const y = Math.floor(i / 8)

  return (
    <div key={i} style={{
      width: '12.5%',
      height: '12.5%',
    }}
    >
      <BoardSquare x={x} y={y}>
        {renderPiece(x,y,knightPosition)}
      </BoardSquare>
    </div>
  )
}


function renderPiece(x: number, y: number, knightPosition: TypeKnightPosition) {
  if(x === knightPosition[0] && y === knightPosition[1]){
    return <Knight />
  }
}

// function handleSquareClick(toX:number, toY:number){
//   if (canMoveKnight(toX, toY)){
//     moveKnight(toX,toY)
//   }
// }
