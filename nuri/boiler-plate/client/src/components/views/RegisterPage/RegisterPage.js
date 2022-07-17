import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import {registerUser} from "../../../_actions/user_actions";
import {useNavigate} from 'react-router-dom';

function RegisterPage(props) {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //state 선언 for email, for password
  const [Email, setEmail] = useState("") //초기값 ""로 세팅
  const [Password, setPassword] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")
  const [Name, setName] = useState("")

  const onEmailHandler = (event) =>{
      setEmail(event.currentTarget.value)
  }

  const onNameHandler = (event) =>{
      setName(event.currentTarget.value)
  }
  
  const onPWHandler = (event) =>{
    setPassword(event.currentTarget.value)
  }

  const onConfirmPWHandler = (event) =>{
    setConfirmPassword(event.currentTarget.value)
  } 

  const onSubmitHandler = (event) =>{
      event.preventDefault();
      console.log('Email', Email);
      console.log('Name', Name);
      console.log('Password', Password);
      console.log('Confirm Password', ConfirmPassword);

      //비밀번호 재확인 일치 
      if(Password !== ConfirmPassword){
        return alert("비밀번호 확인 값이 다름");
      }

      let body = {
          email : Email,
          name : Name,
          password : Password
      }

      //without Redux
      //Axios.post('/api/users/register', body)

      dispatch(registerUser(body))
      .then(response =>{
          if(response.payload.success){
              //에러 발생 Uncaught (in promise) TypeError: Cannot read property 'push' of undefined
              //props.history.push('/')  //react-router-dom v6에서 지원안함
              //로그인 성공 시 루트 페이지로 이동
              //react에서 페이지를 이동하는 방식-> 생성자에 파라미터로 props 넣어줘야함
              alert("회원가입 성공");
              navigate('/'); //루트로 이동
          }else{
              alert("회원가입 실패");
          }
      })
  }

  return (
    <div style={
      {display : 'flex', justifyContent : 'center',
      width : '100%', height:'100vh'
      }
  }>
      <form style={{display : 'flex', flexDirection : 'column'}}
          onSubmit = {onSubmitHandler}
      >
          <label>Email</label>
          <input type='Email' value={Email} onChange={onEmailHandler}/>
          
          <label>Name</label>
          <input type='text' value={Name} onChange={onNameHandler}/>

          <label>Password</label>
          <input type='Password' value={Password} onChange={onPWHandler}/>

          <label>ConfirmPassword</label>
          <input type='Password' value={ConfirmPassword} onChange={onConfirmPWHandler}/>
          
          
          <br />
          <button>Login</button>
      </form>
  
  </div>
  )
}

export default RegisterPage
