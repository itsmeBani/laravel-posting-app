import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { ThemeProvider } from "@material-tailwind/react";
import {BrowserRouter} from "react-router-dom";
import {CurrenUserProvider} from "./components/CurrentUserProvider.jsx";
ReactDOM.createRoot(document.getElementById('root')).render(

    <BrowserRouter>
       <React.StrictMode>
          <ThemeProvider>
          <CurrenUserProvider>
             <App />
          </CurrenUserProvider>
         </ThemeProvider>
       </React.StrictMode>
    </BrowserRouter>,
)
