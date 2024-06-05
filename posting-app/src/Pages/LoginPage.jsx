import React, {useContext} from 'react';
import { Login } from "../components/Login.jsx";
import { Typography } from "@material-tailwind/react";
import { Route, Routes } from "react-router-dom";
import Register from "../components/Register.jsx";
import Logo from "../assets/logo.png";
import "../App.css"
import {UserProvider} from "../components/FormContext.jsx";
import {CurrentUserContext} from "../components/CurrentUserProvider.jsx";
function LoginPage(props) {
    const {

        CurrentUser,
        setCurrentUser
    } = useContext(CurrentUserContext);

    console.log(CurrentUser)
    return (
        <>
            <section className="bg-image flex justify-center place-items-center    p-2">

                <div className="formbg  flex rounded-md  h-[80%] w-[60%] max-w-md-w-full justify-center re place-items-center overflow-x-hidden ">



    <Routes>
        <Route index path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
    </Routes>


                    <div className="  h-full intro-background gap-3 w-full  hidden-md   flex flex-col justify-center place-items-center p-7">

                        <img className="h-25  object-cover object-center" src={Logo} />
                        <Typography variant='h5' className='text-typography fontdisplay'>Welcome to our Connectify</Typography>
                        <Typography className='text-labelcolor font-thin   text-center'>the perfect space to effortlessly share your thoughts, experiences, and ideas.</Typography>
                    </div>
                </div>
            </section>
        </>
    );
}
export default LoginPage;
