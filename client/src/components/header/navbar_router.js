import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './src/pages/Home'
import Products from './src/pages/Products'
import AboutUs from './src/pages/AboutUs'
import Contacts from './src/pages/Contacts'
import Checkout from './src/pages/Checkout'
import SignIn from './src/pages/SignIn'

function AppRouter()
{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home />}/>

                <Route path="/products" element={<Products />}/>
                
                <Route path="/about_us" element={<AboutUs />}/>
                
                <Route path="/contacts" element={<Contacts />}/>
                
                <Route path="/checkout" element={<Checkout />}/>
                
                <Route path="/sign_in" element={<SignIn />}/>
            
            </Routes>
        </BrowserRouter>
    )
}
export default AppRouter