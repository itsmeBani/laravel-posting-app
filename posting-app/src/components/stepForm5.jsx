import React, {useContext} from 'react';
import {Input, Typography} from "@material-tailwind/react";
import Errormessage from "./Errormessage.jsx";
import RegistrationButton from "./registrationButton.jsx";
import {UserContext} from "./FormContext.jsx";

function StepForm5(props) {
    const {
        UserData,
        handleUserdata,
        errors,
        prevStep,
        submitFormStep1,
    } = useContext(UserContext);


    return (

        <form className="  rounded-md w-full max-w-md   relative ">

            <div>
                <div className="mt-8 mb-2 w-full max-w-screen-lg sm:w-full ">
                    <div className=" flex flex-col">
                        <Input label="Email" color="white" name='email' onChange={handleUserdata}
                               className="text-white" value={UserData.email}
                               error={errors.email != null}
                        />
                        <Typography
                            variant="small"
                            className="mt-5 text-sm flex text-red-500 items-center  font-normal opacity-70 "
                        >
                            <p className='flex gap-1 flex-col'>
                                {
                                    errors.email &&
                                    <Errormessage errormessage={errors.email}/>
                                }

                            </p>
                        </Typography>
                    </div>


                </div>


                <RegistrationButton prevStep={prevStep} submitForm={submitFormStep1}/>
            </div>


        </form>

    );
}

export default StepForm5;
