import React, {useContext, useEffect, useRef, useState} from 'react'


import '../App.css'
import ProfilePicture from "../assets/143086968_2856368904622192_1959732218791162458_n.png"
import {
    List,
    ListItem,
    ListItemPrefix,
    Avatar,
    Card,
    Carousel,
    Typography, IconButton, Button,
} from "@material-tailwind/react";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";

import {
    PlusIcon

} from "@heroicons/react/24/outline";
import axios from "axios";
import SkeletonUserLoader from "../components/SkeletonUserLoader.jsx";
import AddPostInput from "../components/AddPostInput.jsx";
import PostCard from "../components/PostCard.jsx";
import PostCardSkeleton from "../components/PostCardSkeleton.jsx";
import Modal from "../components/Modal.jsx";
import UserAvatar from "../components/Avatar.jsx";
import {CurrentUserContext} from "../components/CurrentUserProvider.jsx";
import axiosClient from "../components/axiosClient.jsx";
import {PowerIcon} from "@heroicons/react/24/outline/index.js";


export default function PostingPage() {


    const [userData, setUserData] = useState(null)
    const [isuserLoading, setisuserloading] = useState(false)
    const [isLoading, setisloading] = useState(false)
const  [post, setpost] = useState({})
    const  [openModalProfile, setopenmodalprofile] = useState(false)
    const {    setToken,

        CurrentUser,
        serCurrentUser,
        setsessionToken,
HandleLogout,
        token
    } = useContext(CurrentUserContext);
    useEffect(() => {
        const fetchUserData = async () => {

            setisuserloading(true)
            try {

                axiosClient.get('/get-user')
                    .then(({data}) => {
                        setUserData(data);

setisuserloading(false)
                    })


            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData().then();

    }, []);



useEffect(() => {
    setisloading(true)
        axiosClient.get('http://localhost:8000/api/users/posts-and-comments')
            .then(({data}) => {
               setpost(data)
                setisloading(false)
            })

},[])



    const array = Array.from({length: 5}, (_, i) => `Item ${i + 1}`);
console.log(post)





    return (
        <>
            <section className='bg-[#171717] w-full h-full sm:flex    md:flex-col   xl:flex-row  '>



                <div className=' w-[500px]   bg-[#292929] scroll-container overflow-auto '>
                    <Card className="w-full justify-between flex h-full  bg-transparent  rounded-none shadow-none ">
                        <List>
                            {isuserLoading ?
                                array.map((item, i) => {
                                    return (
                                        <SkeletonUserLoader/>
                                    )
                                })

                                :


                                userData?.map((user) => (
                                <UserAvatar user={user}/>
                                ))
                            }
                        </List>

<div className="w-full">


    <button  onClick={HandleLogout}  className="text-white px-5 py-2 flex place-items-center gap-2  bg-transparent   hover:text-[#ef4444] ">
        <PowerIcon className="h-5 w-5 "/>
Logout
    </button>
</div>

                    </Card>
                </div>

                <div className='w-full relative  bg-[#1f1f1f]  flex flex-col    gap-4  px-5  overflow-x-hidden'>
                    <div className="  w-full   flex justify-end place-item-center ">

                        <div
                             className=' flex z-[100000]   w-full justify-end  h-auto  p-3 rounded-lg hover:bg-[#1f1f1f] overflow-hidden   '>
                            <ListItemPrefix className="mr-0   m-2 z-[100000]">

                                <Avatar variant="circular" alt="user"  onClick={() => {setopenmodalprofile(true)}}
                                        src={CurrentUser?.profile_picture ? `http://localhost:8000${CurrentUser?.profile_picture}` : ProfilePicture}/>


                                {openModalProfile &&
                                    <div className="absolute bg-white/30 w-[300px] right-2  top-2 h-[400px]">
                                        <Avatar variant="circular" alt="user"
                                                src={CurrentUser?.profile_picture ? `http://localhost:8000${CurrentUser?.profile_picture}` : ProfilePicture}/>

                                    </div>

                                }






                            </ListItemPrefix>

                        </div>






                    </div>

                    <div className=' h-[280px] w-full flex     gap-3'>
                        <Swiper watchSlidesProgress={true} className="h-full relative  "
                                breakpoints={{
                                    576: {slidesPerView: 2},
                                    768: {slidesPerView: 3},
                                    1000: {slidesPerView: 6},
                                    400: {slidesPerView: 2},
                                }}
                                spaceBetween={15}
                                navigation>
                            <SwiperSlide className='  bg-[#171717] flex h-auto rounded-lg  overflow-hidden'
                                         onClick={() => alert()}>
                                <div className="relative">
                                    <img alt="" src={ProfilePicture} className="w-full "/>
                                    <div className="absolute w-full flex justify-center -bottom-6 ">
                                        <div className="rounded-full  bg-[#171717] p-[7px] ">
                                            <PlusIcon className="h-[40px] w-[40px] bg-[#0c6] rounded-full p-1"
                                                      color="white"/>
                                        </div>
                                    </div>
                                </div>
                                <Typography color="gray" className="mt-5 pb-5  text-center font-bold    ">Create
                                    Story</Typography>
                            </SwiperSlide>
                            <SwiperSlide className='  bg-[#171717] h-full rounded-lg'></SwiperSlide>
                            <SwiperSlide className='  bg-[#171717] h-full rounded-lg'></SwiperSlide>
                            <SwiperSlide className='  bg-[#171717] h-full rounded-lg'></SwiperSlide>
                            <SwiperSlide className='  bg-[#171717] h-full rounded-lg'></SwiperSlide>
                            <SwiperSlide className='  bg-[#171717] h-full rounded-lg'></SwiperSlide>
                            <SwiperSlide className='  bg-[#171717] h-full rounded-lg'></SwiperSlide>
                            <SwiperSlide className='  bg-[#171717] h-full rounded-lg'></SwiperSlide>
                            <SwiperSlide className='  bg-[#171717] h-full rounded-lg'></SwiperSlide>
                        </Swiper>
                    </div>
                    <AddPostInput/>

                    {isLoading?<PostCardSkeleton/>:


                    <PostCard {...post}  />
                    }
                </div>
            </section>


        </>
    )
}
