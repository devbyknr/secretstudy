import { Axios } from 'axios';
import React,{useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../_action/user_action';

export default function (SpecificComponent,option,adminRoute = null){

    //null => 아무나 출입 가능한 페지
    //true => 로그인한 유저만 가능
    //false => 로그인한 유는 불능

    const dispatch = useDispatch();
 

    function AuthenticationCheck(props){

        let navigate = useNavigate();

        useEffect(()=>{
            dispatch(auth()).then(response => {
                console.log(response)
                
                //Doesnt login
                if(!response.payload.isAuth){
                    if(option){
                        navigate('/login')
                    }
                } else {
                    //did login
                    if(adminRoute && !response.payload.isAdmin){
                        navigate('/')
                    } else {
                        if(option === false){
                            navigate('/')
                        }
                    }

                }
            });
//            Axios.get('/api/users/auth',)
        },[])
        return (
            <SpecificComponent/>
        )
    }


    return AuthenticationCheck
}