import {useContext, useState} from 'react'

import './App.css'
import PostingPage from './Pages/PostingPage.jsx';
import LoginPage from "./Pages/LoginPage.jsx";
import {UserContext, UserProvider} from "./components/FormContext.jsx";
import {CurrentUserContext, CurrenUserProvider} from "./components/CurrentUserProvider.jsx";

function App() {


    const {

        CurrentUser,
        token,
        sessionToken,
        serCurrentUser
    } = useContext(CurrentUserContext);

    return (
        <div className="h-screen w-full flex   justify-center  place-items-center gap-4">


            <UserProvider>


                {  sessionToken ?<PostingPage/> : <LoginPage/>

                }


            </UserProvider>


        </div>
    )
}

export default App
