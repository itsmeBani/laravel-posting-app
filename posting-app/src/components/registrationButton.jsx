import React from 'react'
import {Button} from "@material-tailwind/react";

export default function RegistrationButton({ prevStep, submitForm }) {
  return (
      <div className="flex justify-between">
          <button onClick={prevStep}
              className="mt-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-md">
              Back
          </button>
          <Button onClick={submitForm } className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
              Next
          </Button>
      </div>
  )
}
