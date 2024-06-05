import React, {useContext, useEffect, useRef, useState} from 'react';
import {Avatar, Button, Card, CardBody, CardHeader, Typography} from "@material-tailwind/react";
import {
    ChatBubbleOvalLeftEllipsisIcon,
    FaceSmileIcon, HeartIcon,
    PaperAirplaneIcon,
    PhotoIcon
} from "@heroicons/react/16/solid/index.js";
import EmojiPicker from "emoji-picker-react";
import ProfilePicture from "../assets/143086968_2856368904622192_1959732218791162458_n.png"
import {CurrentUserContext} from "./CurrentUserProvider.jsx";


function PostCard(props) {
    const {data} = props;
    const {

        CurrentUser,

    } = useContext(CurrentUserContext);

    const [OpenComment, setOpenComment] = useState(0)
    const [isEmojiPicker, setisEmojiPicker] = useState(false)


    const refemoji = useRef();
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!refemoji?.current?.contains(event.target)) {
                setisEmojiPicker(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
    }, [refemoji]);
    const ishideComment =(index)=>{
        setOpenComment(index === OpenComment ? 0 : index)

    }

const  Addcomment=(comment) =>{

        alert("Comment")

}
    return (
        <>

            {data?.map((post) => {
                return (

                    <div className="w-full flex  justify-center px-0  sm:px-0  md:px-40  " key={post?.id}>

                        <Card color="transparent" shadow={false} className="w-full  p-5 py-3 max-full bg-[#292929]">
                            <CardHeader
                                color="transparent"
                                floated={false}
                                shadow={false}
                                className="mx-0 flex items-center gap-4 pt-0 pb-4"
                            >
                                <Avatar
                                    size=""
                                    variant="circular"
                                    src={post?.user?.profile_picture ? `http://localhost:8000${post?.user?.profile_picture}` : ProfilePicture}


                                    alt="tania andrew"
                                />
                                <div className="flex w-full flex-col ">
                                    <div className="flex items-center justify-between">
                                        <Typography variant="h6" color="white" className="opacity-80">
                                            {post?.user?.first_name + " " + post?.user?.last_name}
                                        </Typography>

                                    </div>
                                    <Typography variant="h6" color="white"
                                                className="font-normal opacity-70">{post?.user?.email}</Typography>
                                </div>
                                <div className="w-full px-5 ">

                                    <Typography variant="paragraph" color="white"
                                                className="opacity-80 text-right font-normal ">
                                        {new Date(post?.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </Typography></div>
                            </CardHeader>
                            <CardBody className="mb-6 p-0">
                                <Typography color="white" className="px-1 py-1">
                                    {post?.title}
                                </Typography>


                                {post?.images &&


                                    <img
                                        src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                                        alt="ui/ux review check" className="rounded-lg"
                                    />

                                }
                                <div className="flex justify-between">

                                    <Button ripple={false}
                                            className=" group bg-transparent px-0 flex gap-1 justify-center rounded-full place-items-center "
                                            onClick={() => {
                                                setlikes((count) => count + 1)
                                            }}>

                                        <HeartIcon className="h-7 w-7 group-hover:text-[#0c6] group-hover:animate-pulse "/>
                                        {post?.likes <= 0 ? 0 : post?.likes}
                                    </Button>
                                    <Button ripple={false}
                                            className=" group bg-transparent flex rounded-full px-0 gap-1 justify-center place-items-center  "
                                            onClick={()=>

                                            {ishideComment(post?.id)}


                                    }>
                                        <ChatBubbleOvalLeftEllipsisIcon
                                            className="h-7 w-7 group-hover:text-[#0c6]"/> {post?.comments?.length}
                                    </Button>


                                </div>

                                <div className="h-[2px] w-full flex px-3 mb-4">
                                    <span className="bg-[#171717] rounded-full h-full w-full"></span>

                                </div>


                                {OpenComment === post?.id &&
                                    post?.comments?.map((item, index) => {


                                        return (

                                            <div className="flex flex-col  px-10  pb-2" key={item.id}>
                                                <div className="flex items-center gap-2  max-w-auto">
                                                    <Avatar
                                                        src={item.user?.profile_picture ? `http://localhost:8000${item?.user?.profile_picture}` : ProfilePicture}
                                                        alt="avatar"
                                                        size="sm"/>
                                                    <Typography variant="small" color="white"
                                                                className="font-normal bg-[#171717] px-5 rounded-xl py-2">
                                                        {item?.content}
                                                    </Typography>
                                                </div>
                                            </div>


                                        )
                                    })

                                }


                                <div className="w-full gap-2 flex h-16 pt-5 px-4">


                                    <Avatar variant="circular" alt="user"
                                            src={CurrentUser?.profile_picture ? `http://localhost:8000${CurrentUser?.profile_picture}` : ProfilePicture}
                                    />


                                    <div
                                        className=" w-full rounded-full flex bg-[#171717] place-items-center gap-1 pr-4 relative">

                                        <input
                                            className="h-full w-full bg-transparent border-none outline-0 px-5 text-white "
                                            placeholder="Write a comment ..."


                                        />


                                        <button><PhotoIcon className="h-7 w-7 hover:text-[#0c6]"/></button>
                                        <button onClick={() => {
                                            setisEmojiPicker(!isEmojiPicker)
                                        }}><FaceSmileIcon className="h-7 w-7 hover:text-[#0c6]"/></button>

                                        <button onClick={Addcomment}><PaperAirplaneIcon className="h-7 w-7 hover:text-[#0c6]"/></button>

                                        {isEmojiPicker &&
                                            <div className="absolute right-0 bottom-14 z-100 " ref={refemoji}>

                                                <EmojiPicker lazyLoadEmojis={true} emojiStyle="facebook" theme="dark"
                                                             className="absolute z-50   " onEmojiClick={(e) => {
                                                    console.log(e.emoji)
                                                }}/>

                                            </div>
                                        }
                                    </div>
                                </div>


                            </CardBody>
                        </Card>
                    </div>

                )


            })


            }


        </>

    );
}

export default PostCard;
