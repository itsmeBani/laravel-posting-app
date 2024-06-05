import React, {useContext} from 'react';
import {UserContext} from "./FormContext.jsx";
import {Input, Typography} from "@material-tailwind/react";
import Errormessage from "./Errormessage.jsx";
import RegistrationButton from "./registrationButton.jsx";

function StepForm3(props) {
    const {
        UserData,
        handleUserdata,
        errors,
        prevStep,
        submitFormStep2

    } = useContext(UserContext);


    return (
            <form className="  rounded-md w-full max-w-md   relative ">

            <div>
                <div className="mt-8 mb-2 w-full max-w-screen-lg sm:w-full ">
                    <div className="mb-1 flex flex-col gap-6">


                        <Input label="Password" color="white" onChange={handleUserdata} name="password"
                               className="bg-[#202225] text-white" value={UserData.password}
                               error={errors.password != null}
                        />
                        <Input label="Confirm Password" color="white" onChange={handleUserdata}
                               name='confirmPassword' className="bg-[#202225]  text-white"
                               value={UserData.confirmPassword}
                               error={errors.confirmPassword != null}/>

                    </div>


                </div>
                <Typography
                    variant="small"
                    className="mt-5 text-sm flex text-red-500 items-center gap-2 font-normal opacity-70 "
                >

                    <div className='flex gap-1 flex-col'>
                        <div className=''>
                            {
                                errors.confirmPassword &&
                                <Errormessage errormessage={errors.confirmPassword}/>
                            }
                        </div>
                        {
                            errors.password &&
                            <Errormessage errormessage={errors.password}/>
                        }

                    </div>
                </Typography>


                <RegistrationButton prevStep={prevStep} submitForm={submitFormStep2}/>
            </div>
        </form>
    );
}

export default StepForm3;
