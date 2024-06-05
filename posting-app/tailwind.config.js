const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports =  withMT({
    content: ["./src/**/*.{html,js,jsx}"],
        theme: {
            extend: {
                colors: {

                        typography: '#F2F3F5',
                         labelcolor:"#B2BAC1"

                },
            },
            screens: {
                'sm': '576px',
                'md': '960px',
                'lg': '1440px',
                // => @media (min-width: 1280px) { ... }
            },
    },
    plugins: [],})
