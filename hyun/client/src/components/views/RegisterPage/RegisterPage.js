import React, {useState}  from 'react'
import {useDispatch} from 'react-redux'
import { registerUser } from "../../../_action/user_action";
import { useNavigate } from "react-router-dom";

function RegisterPage(props) {

  const dispatch = useDispatch();

  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [Name, setName] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")

  let navigate = useNavigate();

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }
  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }
  const onConfirmPassword = (event) => {
    setConfirmPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) =>{
      event.preventDefault();

      console.log('Email',Email);
      console.log('Password',Password);
      console.log('ConfirmPassword',ConfirmPassword);

      if(Password !== ConfirmPassword){
        return alert('비밀번호가 서로 다릅니다.');
      }
      let body ={
          email: Email,
          password : Password,
          name : Name
      }

      dispatch(registerUser(body))
      .then(response => {
          console.log("response.payload",response.payload);
          if(response.payload.success){
            navigate('/login');
          } else {
              alert("Failed to register");
          }
      });
  }


  return (
    <div  style={{
      display:'flex', justifyContent:'center',alignItems:'center',width:'100%',height:'100vh'}}
  >
      <form style={{display:'flex',flexDirection:'column'}}
          onSubmit={onSubmitHandler}
      >
          <label>Email</label>
          <input type="email" value={Email} onChange={onEmailHandler}></input>

          <label>Name</label>
          <input type="text" value={Name} onChange={onNameHandler}></input>

          <label>Password</label>
          <input type="password" value={Password} onChange={onPasswordHandler}></input>

          <label>Confirm Password</label>
          <input type="password" value={ConfirmPassword} onChange={onConfirmPassword}></input>

          <br/>
          <button type="submit">
              Register
          </button>
      </form>
  </div>
)
}

export default RegisterPage