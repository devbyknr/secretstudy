import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../_actions/user_action'

function RegisterPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Email, setEmail] = useState("")
  const [Name, setName] = useState("")
  const [Password, setPassword] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault(); //페이지가 리프레쉬 되는걸 막음

    if(Password !== ConfirmPassword){
      return alert("비밀번호가 일치 하지 않습니다.")
    }

    let body ={
      email : Email,
      name : Name,
      password : Password
    }

    dispatch(registerUser(body)).then(response => {
      if(response.payload.success){
        navigate("/login")
      }else{
        alert('Failed to signup')
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
        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />
        <label>Password</label>
        <input type="Password" value={Password} onChange={onPasswordHandler} />
        <label>Confirm Password</label>
        <input type="Password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
        <br />
        <button type='submit'>
          Login
        </button>
      </form>
      
    </div>
  )
}

export default RegisterPage
