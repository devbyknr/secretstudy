import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user_action'
const LoginPage = (props) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault(); //페이지가 리프레쉬 되는걸 막음

    let body ={
      email : Email,
      password : Password
    }

    dispatch(loginUser(body)).then(response => {
      if(response.payload.loginSuccess){
        navigate("/")
      }else{
        alert('Error')
      }
    })

    
  }

  return (
    <div style={{
      display : 'flex', justifyContent: 'center', alignItems: 'center',
      width : '100%', height: '100vh' 
    }}>
      <form style={{ display : 'flex', flexDirection: 'column'}} onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="Password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button type='submit'>
          Login
        </button>
      </form>
      
    </div>
  )
}

export default LoginPage;
