import React, {createContext, useContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import {useCountries} from "use-react-countries";

export const UserContext = createContext({});


export const UserProvider = ({children}) => {
    const { countries } = useCountries();
    const [country, setCountry] = React.useState(0);
    const { name, flags, countryCallingCode } = countries[country];


    console.log(countryCallingCode)
    const [UserData, setUserData] = React.useState({
        first_name: "",
        last_name: "",
        date_of_birth: null,
        phone_number: "",
        email: "",
        password: "",
        preview_image: null,
        confirmPassword: "",
        profile_picture: null,
    })



    const [activeStep, setActiveStep] = React.useState(0);
    const [isLastStep, setIsLastStep] = React.useState(false);
    const [isFirstStep, setIsFirstStep] = React.useState(false);
    const [inputError, setinputError] = React.useState(false);
    const [getimagepreview, setimagepreview] = useState(null)
    const [errors, seterrors] = React.useState({});
    const [loading, isLoading] = useState(false)
    const [disabled, isDisabled] = useState(false)

    const [success, setSuccess] = useState(false)
    const navigate = useNavigate();
    const prevStep = () => {
        !isFirstStep && setActiveStep((cur) => cur - 1);
    };


    const ValidataSchema = Yup.object({
        first_name: Yup.string().required("First name is required"),
        last_name: Yup.string().required("Last name is required"),
        date_of_birth: Yup.date().required("Date of Birth is required"),
        phone_number: Yup.string()
            .required('Phone number is required').min(10,"Invalid Phone Number").max(10,"Invalid Phone Number")
    });


    const ValidateSchemaStep1 = Yup.object({

        email: Yup.string().email("Invalid email address").required("Email is required")


    })


    const ValidateSchemaStep2 = Yup.object({
        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
            )
            .required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], "Passwords must match")
            .required("Confirm Password is required"),

    })


    const submitForm = async (e) => {


        e.preventDefault()
        try {
            await ValidataSchema.validate(UserData, {abortEarly: false})
            console.log("formdata submitted successfully", UserData)
            setActiveStep(1)
            console.log(UserData)
            seterrors({});
        } catch (error) {
            let Errormessages = {}
            error.inner.forEach(err => {
                Errormessages[err.path] = err.message
            })
            seterrors(Errormessages)
        }
    };
    const submitFormStep1 = async (e) => {

        e.preventDefault()
        try {
            await ValidateSchemaStep1.validate(UserData, {abortEarly: false})
            console.log("formdata submitted successfully", UserData)
            setActiveStep(2)
            seterrors({});
        } catch (error) {
            let Errormessages = {}
            error.inner.forEach(err => {
                Errormessages[err.path] = err.message
            })
            seterrors(Errormessages)
        }
    };


    const submitFormStep2 = async (e) => {
        e.preventDefault()
        try {
            await ValidateSchemaStep2.validate(UserData, {abortEarly: false})
            console.log("formdata submitted successfully", UserData)

            setActiveStep(3)
            seterrors({});

        } catch (error) {
            let Errormessages = {}
            error.inner.forEach(err => {
                Errormessages[err.path] = err.message
            })
            seterrors(Errormessages)
        }
    };


    const SubmitFinalForm = async (e) => {

        e.preventDefault();

        const formData = new FormData();
        formData.append('first_name', UserData.first_name);
        formData.append('last_name', UserData.last_name);
        formData.append('date_of_birth', UserData.date_of_birth);
        formData.append('phone_number', countryCallingCode+UserData.phone_number);
        formData.append('email', UserData.email);
        formData.append('password', UserData.password);
        formData.append('confirmPassword', UserData.confirmPassword);
        formData.append('profile_picture', UserData.profile_picture);

           isDisabled(true);
           isLoading(true)
        console.log(formData)

        try {

            const response = await axios.post('http://localhost:8000/api/Register-user', formData);
            console.log(response.data)
            isDisabled(false);
            isLoading(false)
            setUserData({})
            setActiveStep(0)
            setSuccess(true);

            setTimeout(() => {
                setSuccess(false);
            }, 2000);
            if (response.status === 500) {
                // Handle the 500 Internal Server Error
                console.error('Internal Server Error:', response.statusText);
                // You can show an error message to the user or perform any other necessary action
            }
        } catch (error) {
            console.error(error.response.data);
            if (error.response.data.error === "Email address already exists.") {
                setActiveStep(1)
                seterrors({email: error.response.data.error})


            }



            if (error.response.data.message === "The phone number has already been taken.") {
                setActiveStep(0)
                seterrors({phone_number: error.response.data.message})


            }





            isDisabled(false);
            isLoading(false)
        }
    };


    const handleUserdata = (e) => {
        const {name, value} = e.target
        setUserData({
            ...UserData,
            [name]: value
        });
    }
    const hangleProfilePicture = (e) => {
        const file = e.target.files[0];


        setUserData(prevUserData => ({
            ...prevUserData,
            profile_picture: file,
            preview_image: file
        }));
        console.log(UserData)
    }


    return (
        <UserContext.Provider value={{
            UserData,
            setUserData,
            activeStep,
            setActiveStep,
            isLastStep,
            setIsLastStep,
            isFirstStep,
            setIsFirstStep,
            inputError,
            setinputError,
            getimagepreview,
            setimagepreview,
            errors,
            countries,country,setCountry,name,flags,countryCallingCode,
            seterrors,
            loading,
            isLoading,
            disabled,
            isDisabled,
            submitForm,
            submitFormStep1,
            submitFormStep2,
            SubmitFinalForm,
            hangleProfilePicture,
            handleUserdata,
            prevStep,
            success, setSuccess
        }}>


            {children}
        </UserContext.Provider>
    );
};
