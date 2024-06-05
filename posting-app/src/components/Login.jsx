import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import '../App.css'
import {Link} from "react-router-dom";
import React, {useContext, useState} from "react";
import Errormessage from "./Errormessage.jsx";
import * as Yup from "yup";
import axios from "axios";
import {CurrentUserContext} from "./CurrentUserProvider.jsx";
import TwoFactorAuth from "./TwoFactorAuth.jsx";

export function Login() {
    const [errors, seterrors] = React.useState({});

    const [loading, setIsloading] =useState(false);
    const  [isDisabled, setIsdisabled] =useState(false)


    const {

        CurrentUser,
        setToken,
        token,
        setCurrentUser
    } = useContext(CurrentUserContext);
    const [UserCredential, setUserCredential] = React.useState({
        email: "",
        password: "",
    })
    const ValidataSchema = Yup.object({
        email: Yup.string().email("Invalid email address").required("Email is required"),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required")
    });

    const submitLoginForm = async (e) => {
        e.preventDefault()

        setIsdisabled(true)
        setIsloading(true)
        try {
               await ValidataSchema.validate(UserCredential, {abortEarly: false})
            console.log("data validate successfully", UserCredential)
            const response = await axios.post('http://localhost:8000/api/login', UserCredential);

         if(response.data.success){

             setCurrentUser(response.data)

             setToken(response.data.token)

             setIsdisabled(false)
             setIsloading(false)
         }

            seterrors({});
        } catch (error) {

            setIsdisabled(false)
            setIsloading(false)
          seterrors({invalid: error?.response?.data.error})
            let Errormessages = {}
            error.inner.forEach(err => {
                Errormessages[err.path] = err.message
            })
            seterrors(Errormessages)


        }
    };
    const handleUserdata = (e) => {
        const {name, value} = e.target
        setUserCredential({
            ...UserCredential,
            [name]: value
        });
    }


    return (
   <>
       {!token ?<Card color="transparent" shadow={false} className="p-10 flex w-full">
               <Typography variant="h4" color="blue-gray" className="text-typography fontdisplay">
                   Welcome back!
               </Typography>
               <Typography color="" className="mt-1 font-normal text-labelcolor "> Nice to meet you! Enter your
                   details.</Typography>


               <form className="mt-8 mb-2 w-full max-w-screen-lg sm:w-full " onSubmit={submitLoginForm}>
                   <div className="mb-1 flex flex-col gap-3">
                       <div>
                           <Input
                               label="Email"
                               color="white"
                               name="email"
                               className="bg-[#202225] text-white"
                               error={errors.email!=null || errors.invalid !=null}

                               value={UserCredential.email}
                               onChange={handleUserdata}/>


                           {errors.email&&
                               <Typography
                                   variant="small"
                                   className="mt-2 text-sm flex text-red-500 items-center gap-2 font-normal opacity-70 "
                               > <Errormessage errormessage={errors.email}/></Typography>
                           }
                           {errors.invalid&&
                               <Typography
                                   variant="small"
                                   className="mt-2 text-sm flex text-red-500 items-center gap-2 font-normal opacity-70 "
                               > <Errormessage errormessage={errors.invalid}/></Typography>
                           }
                       </div>
                       <div><Input label="Password"
                                   color="white"
                                   className="bg-[#202225] text-white"
                                   error={errors.password!=null || errors.invalid !=null}
                                   name="password"
                                   value={UserCredential.password}
                                   onChange={handleUserdata}/>

                           {errors.invalid&&
                               <Typography
                                   variant="small"
                                   className="mt-2 text-sm flex text-red-500 items-center gap-2 font-normal opacity-70 "
                               > <Errormessage errormessage={errors.invalid}/></Typography>
                           }
                           {errors.password&&
                               <Typography
                                   variant="small"
                                   className="mt-2 text-sm flex text-red-500 items-center gap-2 font-normal opacity-70 "
                               > <Errormessage errormessage={errors.password}/></Typography>
                           }
                       </div>

                   </div>

                   <Button className="mt-6 bg-[#5865F2] flex justify-center" fullWidth type={"submit"} loading={loading} disabled={isDisabled}>
                       Login
                   </Button>
                   <Typography color="gray" className="mt-4 text-center font-normal  text-labelcolor">
                       Don't have an account?{" "}
                       <Link to="/register" className="font-medium text-blue-700">
                           Register
                       </Link>
                   </Typography>
               </form>


           </Card>:
           <TwoFactorAuth/>
       }
   </>


    );
}
