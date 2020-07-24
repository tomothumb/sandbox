import React, {useState} from 'react';

// No Customhook example
// export function Sample({props}:any){
//
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//
//   return (
//     <form>
//       <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
//       <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
//     </form>
//   )
// }


const useInput = (initialValue:any) => {
  const [value, setValue] = useState(initialValue)
  return {value, onChange:(e:any) => setValue(e.target.value)}
}

export function Sample({props}:any){

  const nameProps = useInput('')
  const emailProps = useInput('')
  const {value,onChange} = useInput('')

  return (
    <form>
      <input type="text"  value={nameProps.value} onChange={nameProps.onChange} />
      <input type="email" {...emailProps} />
      <input type="password" value={value} onChange={onChange} />
    </form>
  )
}