import { Axios } from 'axios';
import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import {loginUser} from "../../../_actions/user_actions";
import {useNavigate} from 'react-router-dom';

function LoginPage(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    //state 선언 for email, for password
    const [Email, setEmail] = useState("") //초기값 ""로 세팅
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) =>{
        setEmail(event.currentTarget.value)
    }

    const onPWHandler = (event) =>{
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) =>{
        event.preventDefault();
        console.log('Email', Email);
        console.log('Password', Password);

        let body = {
            email : Email,
            password : Password
        }

        dispatch(loginUser(body))
        .then(response =>{
            if(response.payload.loginSuccess){
                //에러 발생 Uncaught (in promise) TypeError: Cannot read property 'push' of undefined
                //props.history.push('/')  //react-router-dom v6에서 지원안함
                //로그인 성공 시 루트 페이지로 이동
                //react에서 페이지를 이동하는 방식-> 생성자에 파라미터로 props 넣어줘야함
                alert("로그인 성공");
                navigate('/'); //루트로 이동
            }else{
                alert("로그인 실패");
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
                <label>Password</label>
                <input type='Password' value={Password} onChange={onPWHandler}/>
                <br />
                <button>Login</button>
            </form>
        
        </div>
    )
}

export default LoginPage
