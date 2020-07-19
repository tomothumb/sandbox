import React from 'react';
import Knight from "./Knight";
import Square from "./Square";
import {moveKnight, canMoveKnight} from "../State/Game";

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
    <div style={{
      width: '300px',
      height: '300px',
      display: 'flex',
      flexWrap: 'wrap'
    }}>
      {squares}
    </div>
  )
}

function renderSquare(i: number, knightPosition: TypeKnightPosition) {
  const x = i % 8
  const y = Math.floor(i / 8)
  const isKnightHere = knightPosition[0] === x && knightPosition[1] === y
  const black = (x + y) % 2 === 1
  const piece = isKnightHere ? <Knight/> : null


  return (
    <div key={i} style={{
      width: '12.5%',
      height: '12.5%',
    }}
      onClick={()=>handleSquareClick(x,y)}
    >
      <Square black={black}
      >{piece}</Square>
    </div>
  )
}

function handleSquareClick(toX:number, toY:number){
  if (canMoveKnight(toX, toY)){
    moveKnight(toX,toY)
  }
}
