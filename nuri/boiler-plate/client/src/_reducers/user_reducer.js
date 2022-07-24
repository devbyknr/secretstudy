import {
    LOGIN_USER, REGISTER_USER
} from '../_actions/types';

export default function (state = {}, action){ //현재 상태는 비어있는 상태
    switch(action.type){
        case LOGIN_USER :
            return {...state, loginSuccess : action.payload}
            break;

        case REGISTER_USER :
            return {...state, register : action.payload}
            break;
        
        default :
            return state;
        
    }
}