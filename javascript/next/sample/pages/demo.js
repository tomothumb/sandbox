import React, {useCallback, useContext, useEffect, useState} from "react";
import Link from "next/link";
import {CategoryContext} from "../context/categoryProvider";

function Demo() {
    console.log("MAIN MAIN MAIN");
    const [val,setVal] = useState(1)

    const cb = useCallback(()=>{
        console.log('-- MAIN USE callback(no val) --')
    },[])

    const cb2 = useCallback(()=>{
        console.log('-- MAIN USE callback(val) --')
    },[val])

    useEffect(()=>{
        console.log('-- MAIN USE EFFECT (noval) --')
    },[])

    useEffect(()=>{
        console.log('-- MAIN USE EFFECT (val) --')
    },[val])

    return (
        <>
            <div>
                MAIN MAIN MAIN
            </div>
            <hr/>
            <button onClick={()=>{
                setVal(val+1);
            }}>VAL更新</button>
            <hr/>
            {val}
            <hr/>
            <SubDemo key={1} val={val} handleParentClick={setVal} mycb={cb} mycb2={cb2} />
            <hr/>
            <SubDemo key={2} val={val} handleParentClick={setVal} mycb={cb} mycb2={cb2} />
        </>
    )
}


function SubDemo({val, handleParentClick, mycb, mycb2}) {
    console.log("SUB SUB SUB");
    const [subval,setSubval] = useState(1)
    const {category, setCategory} = useContext(CategoryContext);
    console.log('category',category)

    const cb = useCallback(()=>{
        console.log('-- SUB USE callback(no val) --')
    },[])

    const cb2 = useCallback(()=>{
        console.log('-- SUB USE callback(val) --')
    },[val])

    const cb3 = useCallback(()=>{
        console.log('-- SUB USE callback(subval) --')
    },[subval])

    useEffect(()=>{
      console.log('-- SUB USE EFFECT(no val) --')
    },[])

    useEffect(()=>{
        console.log('-- SUB USE EFFECT(val) --')
    },[val])

    useEffect(()=>{
        console.log('-- SUB USE EFFECT(subval) --')
    },[subval])

    return (
        <>
            <div>
                SUB SUb SUB
            </div>

            <button onClick={()=>{
                setSubval(subval+1);
            }}>SUBVALを更新</button>
            <button onClick={()=>{
                handleParentClick(val+1);
            }}>PARENT VALを更新</button>
            {val} - {subval}

            <p>カテゴリCONTEXT{category}</p>
            <button onClick={()=>{
                setCategory(category+1);
            }}>category VALを更新</button>

            <button onClick={()=>{
                mycb()
            }}>mycb</button>

            <button onClick={()=>{
                mycb2()
            }}>mycb2</button>

            <Link href={"/demo2"}><a>DEMO2へ</a></Link>

        </>
    )
}

export default Demo