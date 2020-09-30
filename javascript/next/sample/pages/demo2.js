import React, {useCallback, useContext, useEffect, useState} from "react";
import Link from "next/link";
import {CategoryContext} from "../context/categoryProvider";

function Demo2() {
    console.log("MAIN2 MAIN2 MAIN2");
    const [val,setVal] = useState(1)

    const cb = useCallback(()=>{
        console.log('-- MAIN2 USE callback(no val) --')
    },[])

    const cb2 = useCallback(()=>{
        console.log('-- MAIN2 USE callback(val) --')
    },[val])

    useEffect(()=>{
        console.log('-- MAIN2 USE EFFECT (noval) --')
    },[])

    useEffect(()=>{
        console.log('-- MAIN2 USE EFFECT (val) --')
    },[val])

    return (
        <>
            <div>
                MAIN2 MAIN2 MAIN2
            </div>
            <hr/>
            <button onClick={()=>{
                setVal(val+1);
            }}>VAL更新</button>
            <hr/>
            {val}
            <hr/>
            <SubDemo2 key={1} val={val} handleParentClick={setVal} mycb={cb} mycb2={cb2} />
            <hr/>
            <SubDemo2 key={2} val={val} handleParentClick={setVal} mycb={cb} mycb2={cb2} />
        </>
    )
}


function SubDemo2({val, handleParentClick, mycb, mycb2}) {
    console.log("SUB2 SUB2 SUB2");
    const [subval,setSubval] = useState(1)
    const {category, setCategory} = useContext(CategoryContext);
    console.log('category',category)

    const cb = useCallback(()=>{
        console.log('-- SUB2 USE callback(no val) --')
    },[])

    const cb2 = useCallback(()=>{
        console.log('-- SUB2 USE callback(val) --')
    },[val])

    const cb3 = useCallback(()=>{
        console.log('-- SUB2 USE callback(subval) --')
    },[subval])


    useEffect(()=>{
        console.log('-- SUB2 USE EFFECT(no val) --')
    },[])

    useEffect(()=>{
        console.log('-- SUB2 USE EFFECT(val) --')
    },[val])

    useEffect(()=>{
        console.log('-- SUB2 USE EFFECT(subval) --')
    },[subval])

    return (
        <>
            <div>
                SUB2 SUb2 SUB2
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

            <Link href={"/demo"}><a>DEMOへ</a></Link>

        </>
    )
}

export default Demo2
