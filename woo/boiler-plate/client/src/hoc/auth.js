import { Axios } from "axios";
import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import { authUser } from "../_actions/user_action";
//history.push가 먹히지 않음 useNavigate
import { useNavigate } from "react-router-dom";

export default function (SpecificComponent, option, adminRoute = null) {

     //option
     // null => 아무나 출입이 가능한 페이지
     // true => 로그인한 유저만 출입이 가능한 페이지
     // false => 로그인한 유저는 출입 불가능한 페이지
    function AuthticationCheck(props){
        const dispatch = useDispatch();
        const navigate = useNavigate();
        useEffect(() => {
            dispatch(authUser()).then(response => {
                console.log(response)
                if(!response.payload.isAuth){
                    if(option){
                        navigate("/login")
                    }
                }else{
                    if(option == false){
                        navigate("/")
                    }
                }
            })
        }, [])

        return(
            <SpecificComponent />
        )


    }
    //JSX로 리턴을 해야 하기떄문 해당 부분 수정
    return <AuthticationCheck />;
}