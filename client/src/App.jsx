import "./App.css";
import { Button, ButtonGroup } from "@chakra-ui/react";
import Home from '/src/pages/Home'
import Products from '/src/pages/Products'
import AboutUs from '/src/pages/AboutUs'
import Contact from '/src/pages/Contacts'
import Checkout from '/src/pages/Checkout'
import SignIn from '/src/pages/Sign_in'
import {BrowserRouter, Route, Routes} from 'react-router-dom';


function App() {  
  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<Home />}/>
        <Route path = '/contact' element = {<Contact />}/>
        <Route path = '/products' element = {<Products />}/>
        <Route path = '/login' element = {<SignIn />}/>
        <Route path = '/checkout' element = {<Checkout />}/>
        <Route path = '/about_us' element = {<AboutUs />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
