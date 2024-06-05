import React from 'react';
import {Avatar, Button, Card, CardBody, CardHeader, Typography} from "@material-tailwind/react";
import {
    ChatBubbleOvalLeftEllipsisIcon,
    FaceSmileIcon,
    HandThumbUpIcon, PaperAirplaneIcon,
    PhotoIcon
} from "@heroicons/react/16/solid/index.js";
import ProfilePicture from "../assets/143086968_2856368904622192_1959732218791162458_n.png";
import {} from "@heroicons/react/outline/index"
function PostCardSkeleton(props) {
    return (
        <div className="w-full flex  justify-center   px-40">

            <Card color="transparent" shadow={false} className="w-full animate-pulse  px-2 py-3 max-full bg-[#292929]">
                <CardHeader
                    color="transparent"
                    floated={false}
                    shadow={false}
                    className="mx-0 flex items-center gap-4 pt-0 pb-4"
                >
                    <div   className="rounded-full   w-14  h-12  bg-[#171717] ">

                    </div>
                    <div className="flex w-full flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <h1  className="opacity-80 bg-[#171717] h-4 w-[60%] rounded-full">

                            </h1>

                        </div>
                        <h1  className="opacity-80 bg-[#171717] h-4 w-[40%] rounded-full">

                        </h1>
                    </div>
                </CardHeader>
                <CardBody className="mb-6 p-0">
                    <div className="h-[17rem] w-full bg-[#171717] rounded-xl">


                    </div>
                  < div className="p-2 flex flex-col gap-2">

                      <h1  className="opacity-80 bg-[#171717] h-4 w-[80%] rounded-full"></h1>
                      <h1  className="opacity-80 bg-[#171717] h-4 w-[60%] rounded-full"></h1>
                      <h1  className="opacity-80 bg-[#171717] h-4 w-[50%] rounded-full"></h1>
                      <h1  className="opacity-80 bg-[#171717] h-4 w-[30%] rounded-full"></h1>
                  </div>


                    <div className="flex justify-between p-2">

                        <div className=" px-10 py-5 flex bg-[#171717] gap-1 justify-center rounded-xl place-items-center "></div>
                        <div className=" px-10 py-5 flex bg-[#171717] gap-1 justify-center rounded-xl place-items-center "></div>
                    </div>

                    <div className="h-[2px] w-full flex px-5">
                        <span className="bg-[#171717] rounded-full h-full w-full"></span>

                    </div>











                    <div className="w-full gap-2 flex h-16 pt-5 px-4">

                        <div   className="rounded-full   w-14  h-12  bg-[#171717] "></div>


                        <div className=" w-full rounded-full flex bg-[#171717] place-items-center gap-1 pr-4 relative">

                            <div className="h-full w-full bg-transparent border-none outline-0 px-5 text-white "
                            />



                            <button> <PhotoIcon className="h-7 w-7 hover:text-[#0c6]"/>  </button>
                            <button > <FaceSmileIcon className="h-7 w-7 hover:text-[#0c6]"/></button>
                            <button > <PaperAirplaneIcon className="h-7 w-7 hover:text-[#0c6]"/>  </button>


                        </div>
                    </div>



                </CardBody>
            </Card>
        </div>
    );
}

export default PostCardSkeleton;
