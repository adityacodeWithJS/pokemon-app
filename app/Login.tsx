import React, { ChangeEvent, useState } from "react"
const Login = () => {
 const [formData, setFormData]=useState<string>('')
const [btnData, setBtnData]=useState<string>('')
return (<div>
    <p>Login</p>
    <input type="text"
     name="email" id="userEmailId"
       placeholder="Enter email"
       value={formData}
       onChange={(e:ChangeEvent<any>)=>setFormData(e.target.value)}
       />

       <button
       onClick={()=>setBtnData('Update Button')}
       >
       Update Button 
       </button>

</div>)
}
export default Login