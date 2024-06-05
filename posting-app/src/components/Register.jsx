import React, {useContext} from 'react';
import {useState} from 'react';
import {
    Alert,
    Button,
    Input,
    Typography,
    IconButton
} from "@material-tailwind/react";
import {Link, NavLink, useNavigate} from "react-router-dom";

import Termandcondition from "./termandcondition.jsx";
import {Stepper, Step} from "@material-tailwind/react";
import * as Yup from 'yup';


import {
    CogIcon,
    UserIcon,
    BuildingLibraryIcon,
    InboxIcon,
    LockClosedIcon,
    CalendarIcon,

} from "@heroicons/react/24/outline";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';


import "react-datepicker/dist/react-datepicker.css";
import {CameraIcon, CheckIcon} from "@heroicons/react/24/solid"
import Errormessage from './Errormessage.jsx';
import RegistrationButton from './registrationButton.jsx';
import {UserContext, UserProvider} from "./FormContext.jsx";
import StepForm1 from "./stepForm1.jsx";
import StepForm2 from "./stepForm2.jsx";
import StepperIcon from "./StepperIcon.jsx";
import StepForm3 from "./stepForm3.jsx";
import StepForm4 from "./stepForm4.jsx";
import StepForm5 from "./stepForm5.jsx";
import SuccessAlert from "./SuccessAlert.jsx";

function Register(props) {
    const {
        activeStep,
        success, setSuccess
    } = useContext(UserContext);
    return (


        <div className="h-full w-full flex  justify-center p-10 ">
            {success&&<SuccessAlert/>}
            <div className=" h-full  rounded-md w-full max-w-md   relative  ">
                <Typography variant="h4" color="blue-gray" className="text-typography fontdisplay">
                    Register
                </Typography>
                <Typography color="" className=" font-normal text-labelcolor ">
                    Nice to meet you! Enter your details.
                </Typography>
                <div className='flex justify-between mt-5 mb-2'>
                    <div className="text-sm text-typography font-semibold">Step {activeStep+1}</div>

                    <div className="text-gray-500">{activeStep+1} of 4</div>
                </div>
                <div className="flex items-center w-full justify-between mb-4 relative">
                    <StepperIcon/>
                </div>
                {(() => {
                    switch (activeStep) {
                        case 0:
                            return <StepForm1 />;
                        case 1:
                            return <StepForm2 />;
                        case 2:
                            return <StepForm3 />;
                        case 3:
                            return <StepForm4 />;
                        // case 4:
                        //     return <StepForm4 />;
                        default:
                            return null;
                    }
                })()}
                <div className='absolute w-full bottom-0 '>
                    <Typography color="gray"
                                className="mt-4  text-center flex   justify-center  place-items-end  font-normal   w-full  text-labelcolor">
                        Already have an account? {" "}
                        <NavLink to="/login" className="font-medium text-blue-700 ml-1">
                            Sign In
                        </NavLink>
                    </Typography>


                </div>

            </div>

        </div>

    );
}

export default Register;
