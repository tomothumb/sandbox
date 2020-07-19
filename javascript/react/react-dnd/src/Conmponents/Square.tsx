import React from 'react';

type Props = {
  black: boolean
  children: any,
}

export default function Square({black, children}: Props) {
  const fill = black ? 'black' : '#EFEFEF'
  const stroke = black ? '#EFEFEF' : 'black'


  return (
    <div
      style={{
        backgroundColor: fill,
        color: stroke,
        width: '100%',
        height: '100%'
      }}
    >
      {children}
    </div>
  )
}