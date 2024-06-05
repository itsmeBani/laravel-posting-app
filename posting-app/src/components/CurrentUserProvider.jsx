import React, {createContext, useEffect, useState} from "react";
import {UserContext} from "./FormContext.jsx";
import axios from "axios";
import axiosClient from "./axiosClient.jsx";
export const CurrentUserContext = createContext({});

export const CurrenUserProvider = ({children}) => {
    const [CurrentUser,setCurrentUser] = React.useState({})

    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
   const  [sessionToken , setsessionToken] = useState(localStorage.getItem('SESSION_TOKEN'))


    console.log(token)
    const setToken = (token) => {
        _setToken(token)
        if(token){
            localStorage.setItem('ACCESS_TOKEN',token);
        }
        else{
            localStorage.removeItem('ACCESS_TOKEN');
        }
        }


    const SessionToken = (sessionToken) => {
        setsessionToken(sessionToken)
        if(sessionToken){
            localStorage.setItem('SESSION_TOKEN',sessionToken);
        }
        else{
            localStorage.removeItem('SESSION_TOKEN');
        }
    }


        useEffect(() => {
            axiosClient.get('/user')
                .then(({data}) => {
                    console.log(data)
                   setCurrentUser(data)
                })

        },[token,sessionToken])

    const HandleLogout= async () =>{


        try {

            if (!token) {
                console.error('No token found, user is not authenticated.');
                return;
            }

            const response = await axios.post('http://localhost:8000/api/logout', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data.success) {
                setToken("")
                setsessionToken("")
                localStorage.removeItem('ACCESS_TOKEN');
                localStorage.removeItem('SESSION_TOKEN');

            }
        } catch (error) {
            console.error('Error logging out:', error.response?.data?.error || error.message);
        }
    }


    return (
        <CurrentUserContext.Provider value={{
            CurrentUser,
            setCurrentUser,
            token,
            HandleLogout,
            setsessionToken,
            sessionToken,
            SessionToken,
            setToken
        }}>


            {children}
        </CurrentUserContext.Provider>
    );
}
