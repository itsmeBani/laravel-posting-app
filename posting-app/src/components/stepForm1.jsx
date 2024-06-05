import React, { useContext } from 'react';
import { Input, Typography } from "@material-tailwind/react";
import { CalendarIcon } from "@heroicons/react/24/outline/index.js";
import DatePicker from "react-datepicker";
import {UserContext } from "./FormContext.jsx";
import { useCountries } from "use-react-countries";
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
} from "@material-tailwind/react";
import Errormessage from "./Errormessage.jsx";

function StepForm1() {

    const {
        UserData,
        handleUserdata,
        errors,
        submitForm,
        setUserData,
        countries,country,setCountry,name,flags,countryCallingCode
    } = useContext(UserContext);



    return (



                <form className="rounded-md w-full max-w-md relative">
            <div>
                <div className="mt-8 mb-2 w-full max-w-screen-lg sm:w-full">
                    <div className="mb-1 flex flex-col gap-5">
                        <Input
                            label="First Name"
                            name='first_name'
                            onChange={handleUserdata}
                            value={UserData.first_name}
                            color="white"
                            className="text-white"
                            error={errors.first_name != null}
                        />
                        <Input
                            label="Last Name"
                            name='last_name'
                            onChange={handleUserdata}
                            color="white"
                            value={UserData.last_name}
                            className="bg-[#202225] text-white"
                            error={errors.last_name != null}
                        />



                        <div className={`gap-1 z-[111] flex place-items-center border-solid border-[1px] rounded-lg ${errors.date_of_birth ? "border-red-500" : "border-white"}`}>
                            <label htmlFor='calendar' className={`flex justify-between w-full gap-2 p-2.5 place-items-center`}>
                                <Typography color='white' className={`text-sm ${errors.date_of_birth != null ? "text-red-500" : "text-white"}`}>
                                    {UserData.date_of_birth
                                        ? UserData.date_of_birth.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
                                        : 'Date of Birth'}
                                </Typography>
                                <CalendarIcon className='h-5 w-5 absolute right-5' color='white' />
                            </label>
                            <DatePicker
                                id='calendar'
                                name='date_of_birth'
                                onChange={date => setUserData({ ...UserData, date_of_birth: date })}
                                showYearDropdown
                                showMonthDropdown
                                className='hidden  absolute outline-none focus:outline-none ring-transparent focus:ring-transparent shadow-none focus:shadow-none border-transparent focus:border-transparent text-green-300 top-0'
                            />
                        </div>



                        <div className="relative flex w-full max-w-[24rem]">
                            <Menu placement="bottom-start ">
                                <MenuHandler>
                                    <Button
                                        ripple={false}
                                        variant="text"
                                        color="blue-gray"
                                        className={`flex text-white     h-10 items-center gap-2 rounded-r-none border border-r-0 ${errors.phone_number != null? "border-red-500" : "border-blue-gray-200" } bg-blue-gray-500/10 pl-3`}
                                    >
                                        <img
                                            src={flags.svg}
                                            alt={name}
                                            className="h-4 w-4 rounded-full object-cover"
                                        />
                                        {countryCallingCode}
                                    </Button>
                                </MenuHandler>
                                <MenuList className="max-h-[20rem] max-w-[18rem] ">
                                    {countries.map(({ name, flags, countryCallingCode }, index) => {
                                        return (
                                            <MenuItem
                                                key={name}
                                                value={name}

                                                className="flex   items-center gap-2"
                                                onClick={() => setCountry(index)}
                                            >
                                                <img
                                                    src={flags.svg}
                                                    alt={name}
                                                    className="h-5 w-5 rounded-full object-cover"
                                                />
                                                {name} <span className="ml-auto">{countryCallingCode}</span>
                                            </MenuItem>
                                        );
                                    })}
                                </MenuList>
                            </Menu>
                            <Input
                                label='Phone number'
                                type="text"
                                pattern="[0-9]*"
                                name='phone_number'
                                onChange={handleUserdata}
                                color='white'
                                value={UserData.phone_number}
                                className="text-white rounded-l-none  "
                                error={errors.phone_number != null}
                            />



                        </div>
                        <Typography
                            variant="small"
                            className=" text-sm flex text-red-500 items-center  font-normal opacity-70 "
                        >
                            <p className='flex gap-1 flex-col'>
                                {
                                    errors.phone_number &&
                                    <Errormessage errormessage={errors.phone_number}/>
                                }

                            </p>
                        </Typography>


                    </div>
                </div>
                <button onClick={submitForm} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
                    Next
                </button>
            </div>
        </form>
    );
}

export default StepForm1;
