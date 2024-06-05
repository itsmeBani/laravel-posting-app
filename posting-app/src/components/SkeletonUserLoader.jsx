import React from 'react';
import {Avatar, ListItem, ListItemPrefix, Typography} from "@material-tailwind/react";
import ProfilePicture from "../assets/143086968_2856368904622192_1959732218791162458_n.png";

function SkeletonUserLoader(props) {
    return (
  <>
      <div className="flex gap-3 h-16 px-3 py-2  rounded-lg hover:bg-[#1f1f1f] animate-pulse  overflow-hidden">

          <div className="full">

              <div   className="rounded-full h-full  w-12 h-full  bg-[#171717] "></div></div>
          <div>

              <div className="flex flex-col gap-2  h-full">
                  <h1 className='text-gray-400 h-4 w-[200px] mt-1 text-ellipsis overflow-hidden   rounded-md bg-[#171717]'>

                  </h1>
                  <h1  color="gray" className="font-normal text-gray-500 w-[170px]  text-ellipsis overflow-hidden  rounded-md  bg-[#171717] h-4">
                  </h1>
              </div>

          </div>
      </div>




  </>
    );
}

export default SkeletonUserLoader;
