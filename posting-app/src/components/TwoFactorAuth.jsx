import React, {useContext,useRef, useState, useEffect} from "react";
import {initializeApp} from "firebase/app";
import {
    getAuth,
    RecaptchaVerifier,
    signInWithPhoneNumber,
    PhoneAuthProvider,
    signInWithCredential
} from "firebase/auth";
import {CurrentUserContext} from "./CurrentUserProvider.jsx";
import {Button} from "@material-tailwind/react";
// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCgq-9vrldQ8ee4nVOtWA1uuAF19hKVyxc",
    authDomain: "connectify-7ab06.firebaseapp.com",
    projectId: "connectify-7ab06",
    storageBucket: "connectify-7ab06",
    messagingSenderId: "467009265918",
    appId: "1:467009265918:web:c036130318d7660a11c5af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const TwoFactorAuth = () => {
    const {CurrentUser, setToken, token,HandleLogout, setCurrentUser, SessionToken} = useContext(CurrentUserContext);
    const phoneNumber = CurrentUser?.phone_number;
    const inputRefs = useRef([]);
    const [verificationId, setVerificationId] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [otp, setOtp] = useState("");
    const [recaptcha, setReCaptcha] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const  [isLoadingVerify, setIsLoadingVerify] = useState(false)
    const [initialOtp, setInitialOtp] = useState({
        Otp1: '',
        Otp2: '',
        Otp3: '',
        Otp4: '',
        Otp5: '',
        Otp6: '',
    });
    const [resendTimeout, setResendTimeout] = useState(30);
    const [isResendDisabled, setIsResendDisabled] = useState(false);

    useEffect(() => {
        if (resendTimeout > 0) {
            const timerId = setTimeout(() => setResendTimeout(resendTimeout - 1), 1000);
            return () => clearTimeout(timerId);
        } else {
            setIsResendDisabled(false);
        }
    }, [resendTimeout]);

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;

        if (value.length > 1) {
            e.target.value = value.slice(0, 1);
        }

        setInitialOtp((prevInputs) => ({
            ...prevInputs,
            [name]: e.target.value,
        }));

        const otpValues = Object.values({ ...initialOtp, [name]: value });
        const combinedValue = otpValues.join('');
        setOtp(combinedValue);

        // Move focus to the next input field if value length is 1 and not the last input
        if (value.length === 1 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const setUpRecaptcha = (number) => {

        const recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {});

        recaptchaVerifier.render();
        setIsLoading(true);
        setReCaptcha("Please Verify That You Are Not A Robot")
        return signInWithPhoneNumber(auth, number, recaptchaVerifier);
    };
    const sendOTP = () => {
        setUpRecaptcha(phoneNumber)
            .then((confirmationResult) => {
                setVerificationId(confirmationResult.verificationId);
                setIsResendDisabled(true);
                setResendTimeout(30);

            })
            .catch((error) => {
                console.error("Error during signInWithPhoneNumber", error);
                console.log(error.code)
                if (error.code === "auth/too-many-requests"){
                    setErrorMessage("Too Many Requests Please Try Again Later")
                    setIsLoading(false)
                }
            });
    };

    const resendOTP = (e) => {
        setVerificationId(null)

        e.preventDefault()
        if (isResendDisabled) return;
        sendOTP();
        setIsLoading(false)
    };

    const verifyOTP = (e) => {
        setIsLoadingVerify(true)
        e.preventDefault();
        if (!verificationId) {
            console.log("Verification ID is not available. Please request OTP first.");
            return;
        }
        const credential = PhoneAuthProvider.credential(verificationId, otp);
        signInWithCredential(auth, credential)
            .then((result) => {
                console.log("User is verified");
                setIsLoadingVerify(false)
                console.log(CurrentUser);
                SessionToken(result.user.accessToken);
            })
            .catch((error) => {
                console.error("Error during verifyOTP", error);
                let errorMessage = "An error occurred during verification. Please try again.";

                switch (error.code) {
                    case 'auth/invalid-verification-code':
                        errorMessage = "The OTP you entered is invalid. Please check and try again.";
                        setIsLoadingVerify(false)
                        break;
                    case 'auth/missing-verification-code':
                        errorMessage = "Please enter the OTP.";
                        setIsLoadingVerify(false)
                        break;
                    case 'auth/credential-already-in-use':
                        errorMessage = "This credential is already in use.";
                        setIsLoadingVerify(false)
                        break;
                    case 'auth/code-expired':
                        errorMessage = "The OTP you entered is expired.";
                        setIsLoadingVerify(false)
                        break;
                    default:
                        if (error.message.includes('-39')) {
                            errorMessage = "An unknown error occurred with code -39. Please contact support.";
                            setIsLoadingVerify(false)
                        }
                        break;
                }

                setErrorMessage(errorMessage);

            });
    };
    return (


        <div className="   h-full w-full flex flex-col place-items-center justify-center  overflow-hidden">
            <div className=" px-6 pt-20 h-full pb-9  flex  place-items-center justify-center    w-full max-w-lg rounded-2xl">
                <div className="mx-auto  flex w-full max-w-md flex-col space-y-5">
                    <div className="flex  flex-col items-center justify-center text-center space-y-2">
                        <div className="font-semibold text-3xl">
                            <p className=" text-white ">Mobile Phone Verification</p>
                        </div>

                        <div className="flex flex-row  text-sm font-medium text-gray-400">
                            {verificationId ?
                                <p className="flex text-md flex-col"> Enter the 6-digit verification code that was sent
                                    to {CurrentUser.phone_number && <span
                                        className="text-blue-600 text-lg">{CurrentUser?.phone_number?.substring(0, 5) + "*****" + CurrentUser?.phone_number?.substring(9, 14)}</span>}</p>
                                : <p className="flex text-md flex-col">We are going to send 6-digit verification code
                                    to {CurrentUser.phone_number && <span
                                        className="text-blue-600 text-lg">{CurrentUser?.phone_number?.substring(0, 5) + "*****" + CurrentUser?.phone_number?.substring(9, 14)}</span>}</p>


                            }

                        </div>
                    </div>

                    <div className="p-0 m-0">
                        {verificationId ?

                            <form>
                                <div className="flex flex-col  gap-4">
                                    <div className="flex gap-1 flex-row items-center justify-between mx-auto w-full max-w-xs">
                                        {[...Array(6)].map((_, index) => (
                                            <div key={index} className="w-full h-16">
                                                <input
                                                    className="w-full text-blue-600 font-bold h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl text-lg bg-[#252525] focus:ring-2 ring-blue-700"
                                                    type="number"
                                                    min="0"
                                                    max="9"
                                                    step="1"
                                                    maxLength="1"
                                                    name={`Opt${index + 1}`}
                                                    onInput={(e) => handleInputChange(e, index)}
                                                    ref={(el) => (inputRefs.current[index] = el)}
                                                    required
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-[#f87171] text-xs text-center">{errorMessage}</p>
                                    <div className="flex flex-col space-y-5">
                                        <div>
                                            <Button
                                                className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                                                onClick={verifyOTP}
                                         loading={isLoadingVerify}
                                                disabled={isLoadingVerify}

                                            >
                                                Verify Account
                                            </Button>
                                        </div>

                                        <div
                                            className="flex flex-row place-items-center justify-center h-full text-center text-sm font-medium space-x-1 text-gray-500">
                                            <p>Didn't receive code?</p>


                                            <button className="flex flex-row items-center text-blue-600"
                                                    onClick={resendOTP} disabled={isResendDisabled}>
                                                Resend OTP {isResendDisabled && `(${resendTimeout})`}
                                            </button>


                                        </div>
                                    </div>
                                </div>
                            </form> : <Button loading={isLoading}
                                              disabled={isLoading}
                                              className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                                              onClick={sendOTP}>Send OTP</Button>


                        }
                        <p className="text-[#f87171] text-xs text-center">{errorMessage}</p>

                        <p onClick={ HandleLogout} className="text-blue-300 text-xs text-center p-2 underline p-2 font-medium">Change Account</p>
                        {!verificationId ?  <p className="text-blue-300 text-xs text-center p-2">        {recaptcha} </p>:""}

                            <div className="flex justify-center  h-[100px] w-full p-2">

                                <div id="recaptcha-container"></div>
                            </div>

                    </div>
                </div>
            </div>
        </div>


    );
};

export default TwoFactorAuth;
