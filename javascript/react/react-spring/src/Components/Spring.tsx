import React from "react";
import {useSpring, animated, interpolate} from 'react-spring'

export function Spring() {

  // const {o, xyz, color} = useSpring({
  //   from: {o: 0, xyz: [0, 0, 0], color: 'red'},
  //   o: 1,
  //   xyz: [10, 20, 5],
  //   color: 'green'
  // })
  //
  // return (
  //   <animated.div
  //     style={{
  //       // If you can, use plain animated values like always, ...
  //       // You would do that in all cases where values "just fit"
  //       color,
  //       // Unless you need to interpolate them
  //       background: o.interpolate(o => `rgba(210, 57, 77, ${o})`),
  //       // // // Which works with arrays as well
  //       // transform: xyz.interpolate(xyz => `translate3d(${xyz[0]}px, ${xyz[1]}px, ${xyz[2]}px)`),
  //       // // If you want to combine multiple values use the "interpolate" helper
  //       // border: interpolate([o, color], (o:any, c:any) => `${o * 10}px solid ${c}`),
  //       // // You can also form ranges, even chain multiple interpolations
  //       // padding: o.interpolate({range: [0, 0.5, 1], output: [0, 0, 10]}).interpolate(o => `${o}%`),
  //       // // Interpolating strings (like up-front) through ranges is allowed ...
  //       // borderWidth: o.interpolate({range: [0, 10], output: ['1', ${c}]}),
  //
  //       // // Interpolating strings (like up-front) through ranges is allowed ...
  //       // borderColor: o.interpolate({range: [0, 1], output: ['red', '#ffaabb']}),
  //       // // There's also a shortcut for plain, optionless ranges ...
  //       // opacity: o.interpolate([0.1, 0.2, 0.6, 1], [1, 0.1, 0.5, 1])
  //     }}
  //   >
  //     {o.interpolate(n => n.toFixed(2)) /* innerText interpolation ... */}
  //   </animated.div>
  // )


  // const animate_props = useSpring({opacity: 1, from: {opacity:0}})
  const animate_props = useSpring({value: 100, from: {value:0}})

  const AnimatedDonut = animated(Donut)

  return (
    <AnimatedDonut number={animate_props.value}  />
  )

  // return (
  //   <animated.div style={animate_props}>
  //   {animate_props.marginLeft}
  //   </animated.div>
  // );
}

function Donut(props:any){
  return (
    <div style={{
      marginTop: props.number
    }}>
      {props.number}
    </div>
  );
}