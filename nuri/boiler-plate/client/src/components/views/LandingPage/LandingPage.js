import React, {useEffect} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate();

    //LandingPage 들어오자마자 getRequest를 서버에게 전달 endpoint는 api/hello
    //server에서 돌아오는 response를 console에 출력
    useEffect(()=>{
        axios.get('/api/hello')
        .then(response => console.log(response.data))
    }, [])

    const onClickHandler = () => {
      axios.get('/api/users/logout')
           .then(response => {
              console.log(response.data);
              if(response.data.success){
                alert("로그아웃 성공");
                navigate('/login');
              }else{
                alert("로그아웃 실패");
              }
           })
    }

  return (
    <div style={
        {display : 'flex', justifyContent :'center', 
        alignItems : 'center', width : '100%', height : '100vh'}
    }>
        <h2>
          시작 페이지
        </h2>

        <button onClick={onClickHandler}> 
          로그아웃 
        </button>
    </div>
  )
}

export default LandingPage
