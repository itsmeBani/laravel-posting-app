import React from 'react';
import {Avatar, ListItemPrefix, Typography} from "@material-tailwind/react";
import ProfilePicture from "../assets/143086968_2856368904622192_1959732218791162458_n.png";

function UserAvatar({user}) {
    return (

   <>
       <div key={user?.id}
            className=' flex  p-3 rounded-lg hover:bg-[#1f1f1f] overflow-hidden   '>
           <ListItemPrefix>

               <Avatar variant="circular" alt="user"
                       src={user?.profile_picture ? `http://localhost:8000${user?.profile_picture}` : ProfilePicture}/>
           </ListItemPrefix>
           <div>
               <Typography variant="h6"
                           className=' sm:hidden md:block text-gray-400  w-[200px] text-ellipsis overflow-hidden'>
                   {user?.first_name + " " + user?.last_name}


               </Typography>
               <Typography variant="small" color="gray"
                           className="font-normal   text-gray-500 lg:hidden ">
                   {user?.email}
               </Typography>
           </div>
       </div>

   </>


    );
}

export default UserAvatar;
