import axios from 'axios';
import {LOGIN_USER, REGISTER_USER, AUTH_USER} from './types';

export function loginUser(dateToSubmit){

    const request = axios.post('/api/user/login',dateToSubmit).then(response =>
        response.data
    )

    return {
        type : LOGIN_USER,
        payload : request

    }
}

export function registerUser(dateToSubmit){

    const request = axios.post('/api/user/register',dateToSubmit).then(response =>
        response.data
    )

    return {
        type : REGISTER_USER,
        payload : request

    }
}

export function auth(){
    const request = axios.post('/api/users/auth').then(response =>
        response.data
    )

    return {
        type : AUTH_USER,
        payload : request

    }
}