import {Avatar, Button, IconButton, Textarea, Typography} from "@material-tailwind/react";
import React from "react";
import {FaceSmileIcon, HomeIcon, MapIcon, PhotoIcon, XMarkIcon} from "@heroicons/react/16/solid/index.js";

function Modal({setIsInputFocused}) {


    const handleInputFocus = () => {

        setIsInputFocused(false);
    };

    return (
       <section className="fixed z-50 top-0 left-0 w-full h-full bg-black/70 flex place-items-center justify-center">
            <div className="text-white w-[30rem] justify-between rounded-lg h-auto relative bg-[#171717] flex flex-col"                                         >
                <button  className="rounded-full absolute right-2 bg-[#212121] p-2   top-2  z-50 " onClick={handleInputFocus}>
                    <XMarkIcon className="h-6 w-6"/>
                </button >
             <div className="w-full  flex justify-center relative p-5"><Typography variant="h5" className="">Create Post</Typography></div>


                <div className="h-[2px] w-full bg-[#212121]"></div>
                <div className="flex py-3 px-5 gap-3 ">
                    <Avatar
                    size=""
                    variant="circular"
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                    alt="tania andrew"
                />
                    <div className="flex w-full flex-col ">
                        <div className="flex items-center justify-between">
                            <Typography variant="h6" color="white" className="opacity-80 leading-relaxed">
                                Jiovani Fabro
                            </Typography>

                        </div>
                        <Typography variant="h6" color="white" className="font-thin text-xs   h-full leading-3 opacity-70">Jiovanifabro@gmail.com</Typography>
                    </div></div>
                <div>




                </div>
                <div className="py-1 px-2">
                    <Textarea   label="What's in Your Mind, Jiovani?" rows="6" color="green"   className="text-white p-2  rounded-lg  border-bottom-none"/>




                </div>
<div className="h-[14rem] w-full pb-3 px-2">

<div className="w-full h-full  bg-[#212121] rounded-lg flex place-items-center justify-center">

    <div className="flex flex-col place-items-center">
        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" className="h-7 w-7 mb-2" data-name="Layer 1" viewBox="0 0 24 24" fill="#f1f1f1">
            <path d="m5,10c0-.552.448-1,1-1h3v-3c0-.552.448-1,1-1s1,.448,1,1v3h3c.552,0,1,.448,1,1s-.448,1-1,1h-3v3c0,.552-.448,1-1,1s-1-.448-1-1v-3h-3c-.552,0-1-.448-1-1Zm19-1v10c0,2.757-2.243,5-5,5h-10c-2.446,0-4.479-1.768-4.908-4.092-2.324-.429-4.092-2.462-4.092-4.908V5C0,2.243,2.243,0,5,0h10c2.446,0,4.479,1.768,4.908,4.092,2.324.429,4.092,2.462,4.092,4.908ZM5,18h10c1.654,0,3-1.346,3-3V5c0-1.654-1.346-3-3-3H5c-1.654,0-3,1.346-3,3v10c0,1.654,1.346,3,3,3Zm17-9c0-1.302-.839-2.402-2-2.816v8.816c0,2.757-2.243,5-5,5H6.184c.414,1.161,1.514,2,2.816,2h10c1.654,0,3-1.346,3-3v-10Z"/>
        </svg>

        <Typography variant="h6" className="">Add Photo</Typography>

                <Typography variant="h6" className="font-thin leading-3 text-xs">
                or drag and drop</Typography>

    </div>


</div>
</div>

    <div className="flex justify-between p-3 border border-[#212121] m-2 border-1 rounded-lg">

        <div>Add to your post</div>
        <div>
            <ul className="flex">
                <li><PhotoIcon className="h-7 w-7"/></li>
                <li><FaceSmileIcon className="h-7 w-7"/></li>
                <li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-7 h-7">
                    <path fillRule="evenodd" d="m7.539 14.841.003.003.002.002a.755.755 0 0 0 .912 0l.002-.002.003-.003.012-.009a5.57 5.57 0 0 0 .19-.153 15.588 15.588 0 0 0 2.046-2.082c1.101-1.362 2.291-3.342 2.291-5.597A5 5 0 0 0 3 7c0 2.255 1.19 4.235 2.292 5.597a15.591 15.591 0 0 0 2.046 2.082 8.916 8.916 0 0 0 .189.153l.012.01ZM8 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" clipRule="evenodd" />
                </svg>
                </li>








            </ul>



        </div>




</div>

                <div className="w-full p-2">

                    <Button  loading={true}    className="w-full flex place-items-center justify-center  rounded-sm bg-[#00e673] text-[#fff]  font-bold " disabled={false} >

                        Add Post</Button>

                </div>

            </div>

        </section>


    );
}

export default Modal;
