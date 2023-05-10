import "./App.css";
// import Login from "./components/Login";
import ErrorPage from "./pages/Error";
import Login from "./components/Login";
import Footer from "./components/footer";
import Home from "./pages/Home";
import Header from "./components/header/navbar";
import Products_Printers from "./pages/Products_3dPrinters.jsx";
// import AboutUs from "/src/pages/AboutUs.jsx";
// import Contact from "/src/pages/Contacts.jsx";
// import Checkout from "/src/pages/Checkout.jsx";
// import SignIn from "/src/pages/Sign_in.jsx";
import Register from "../src/components/register";
import SendEmail from "../src/components/resetPassword/sendEmail";
import ResetPassword from "../src/components/resetPassword/resetPassword";
import { Outlet } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./components/profile";
import { useDispatch, useSelector } from "react-redux";
import AddressForm from "./components/profile/addressForm";
import { publicProductsRequest } from "./utils/axios";
import { useEffect } from "react";
import { allProduct } from "./redux/productsRedux";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/reset",
        element: <SendEmail />,
      },
      {
        path: "/resetPassword",
        element: <ResetPassword />,
      },
      {
        path: "/products/3dPrinters",
        element: <Products_Printers />,
      },

      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      console.log("the effect is invoked");
      try {
        let products = JSON.parse(localStorage.getItem("products"));
        if (products) {
          dispatch(allProduct(products));
        } else {
          const res = await publicProductsRequest.get("/products");
          products = res.data;
          localStorage.setItem("products", JSON.stringify(products));
          dispatch(allProduct(products));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [dispatch]);

  const user = useSelector((state) => state.user);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
