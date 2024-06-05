import React, {useRef, useState} from 'react';
import {Avatar, Button, ButtonGroup, ListItemPrefix} from "@material-tailwind/react";
import ProfilePicture from "../assets/143086968_2856368904622192_1959732218791162458_n.png";
import {FaceSmileIcon, PhoneIcon, PhotoIcon} from "@heroicons/react/16/solid/index.js";
import Modal from "./Modal.jsx";

function AddPostInput(props) {
    const [isInputFocused, setIsInputFocused] = useState(false);
    const buttonRef = useRef(null);
    const handleInputFocus = () => {
        setIsInputFocused(true);
    };

    return (
        <>
            <div className="w-full h-auto    px-0  sm:px-0  md:px-40">
                { isInputFocused&&<Modal setIsInputFocused={setIsInputFocused} />}
                <div className="bg-[#292929] flex  flex-col gap-4 w-full h-full p-7 rounded-xl">
                    <div className="w-full  gap-2 flex  h-full">


                        <Avatar variant="circular" alt="user"
                                src={ProfilePicture}/>


                        <input className="h-full w-full rounded-full bg-[#171717] p-3 text-white flex"
                               placeholder="What's on your mind, Jiovani?"
                               onFocus={handleInputFocus}
                        />
                    </div>


                    <div>
                        <ButtonGroup fullWidth className="gap-2">
                            <Button className="bg-[#171717] flex gap-1 justify-center place-items-center ">

                                <PhotoIcon className="h-7 w-7 "/> Photo

                            </Button>

                            <Button className="bg-[#171717] flex gap-1 justify-center place-items-center ">


                                <FaceSmileIcon className="h-7 w-7 "/>Feeling/Activity


                            </Button>
                        </ButtonGroup>
                    </div>
                </div>
            </div>


        </>
    );
}

export default AddPostInput;
