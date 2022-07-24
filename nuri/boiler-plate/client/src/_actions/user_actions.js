import Axios from 'axios';
import {
    LOGIN_USER, 
    REGISTER_USER
}from './types'; //types에서 선언한 타입만 사용

export function loginUser(dataToSubmit){
    const request = Axios.post('/api/users/login', dataToSubmit)
    .then(response => response.data) //서버에서 받은 데이터를 reqeust에 저장

    return {
        type : LOGIN_USER,
        payload : request //서버에서 가져온 모든 데이터
    }

}

export function registerUser(dataToSubmit){
    const request = Axios.post('/api/users/register', dataToSubmit)
    .then(response => response.data) //서버에서 받은 데이터를 reqeust에 저장

    return {
        type : REGISTER_USER,
        payload : request //서버에서 가져온 모든 데이터
    }

}