import React, {useContext} from 'react';
import {UserContext} from "./FormContext.jsx";
import {CameraIcon} from "@heroicons/react/24/solid";
import RegistrationButton from "./registrationButton.jsx";
import ProfilePicture from "../assets/143086968_2856368904622192_1959732218791162458_n.png"
import {Button} from "@material-tailwind/react";
function StepForm4(props) {
    const {
        UserData,
        SubmitFinalForm,
        hangleProfilePicture,
        prevStep,
        loading,
        disabled,



    } = useContext(UserContext);

    return (
            <div>
            <div className="mt-8 mb-2 w-full max-w-screen-lg sm:w-full ">
                <div className="mb-1 flex flex-col   place-items-center justify-center rounded-full">

                    <div className='w-40 h-40  rounded-full  relative '>
                        <img
                            src={UserData.preview_image == null ? ProfilePicture : URL.createObjectURL(UserData.preview_image)}
                            alt="Profile" className='w-40 h-40 rounded-full p-2'/>
                        <label htmlFor='setimage'
                               className=' flex place-items-center justify-center absolute bottom-2 right-4 formbg p-4 rounded-full'>
                            <CameraIcon className=' absolute text-white  h-5 w-5'/>
                        </label>
                        <input type="file" style={{display: "none"}} className="sendimage" id="setimage"
                               onChange={hangleProfilePicture}/>
                    </div>
                </div>
            </div>




                <div className="flex justify-between">
                    <Button onClick={prevStep}
                            className="mt-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-md">
                        Back
                    </Button>
                    <Button onClick={SubmitFinalForm } loading={loading} disabled={disabled} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
                        Next
                    </Button>
                </div>
        </div>
    );
}

export default StepForm4;
