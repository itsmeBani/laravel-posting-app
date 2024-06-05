import React, {useContext} from 'react';
import {Step, Stepper} from "@material-tailwind/react";
import {InboxIcon, LockClosedIcon, UserIcon} from "@heroicons/react/24/outline/index.js";
import {UserContext} from "./FormContext.jsx";

function StepperIcon(props) {
    const {activeStep,setIsLastStep,setIsFirstStep
    } = useContext(UserContext);

    return (
        <Stepper
            lineClassName='h-1 w-full '
            activeLineClassName='bg-[#7289da]'
            activeStep={activeStep}
            isLastStep={(value) => setIsLastStep(value)}
            isFirstStep={(value) => setIsFirstStep(value)}
        >
            <Step className="p-5 relative " color='green'

                  style={{background: activeStep === 0 ? "#7289da" : activeStep > 0 ? "#7289da" : ""}}>
                <UserIcon className="h-5 w-5 absolute top-50  "/>
            </Step>
            <Step className="p-5 relative "
                  style={{background: activeStep === 1 ? "#7289da" : activeStep > 1 ? "#7289da" : ""}}
            > <InboxIcon className="h-5 w-5 absolute top-50"/>
            </Step>
            <Step className="p-5 relative "
                  style={{background: activeStep === 2 ? "#7289da" : activeStep > 2 ? "#7289da" : ""}}
            > <LockClosedIcon
                className="h-5 w-5 absolute  top-50"/>
            </Step>
            <Step className="p-5 relative "
                  style={{background: activeStep === 3 ? "#7289da" : activeStep > 3 ? "#7289da" : ""}}
            > <UserIcon className="h-5 w-5 absolute top-50"/>
            </Step>

        </Stepper>
    );
}

export default StepperIcon;
