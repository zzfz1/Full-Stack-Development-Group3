import "./App.css";
// import Login from "./components/Login";
import ErrorPage from "./pages/Error";
import Login from "./components/Login";
import Footer from "./components/footer";
import Home from "./pages/Home";
import Header from "./components/header/navbar";
// import Products from "./pages/Products.jsx";
// import AboutUs from "/src/pages/AboutUs.jsx";
// import Contact from "/src/pages/Contacts.jsx";
// import Checkout from "/src/pages/Checkout.jsx";
// import SignIn from "/src/pages/Sign_in.jsx";
import ShoppingCart from "./pages/Shopping_cart";
import Register from "../src/components/register";
import SendEmail from "../src/components/resetPassword/sendEmail";
import ResetPassword from "../src/components/resetPassword/resetPassword";
import { Outlet } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./components/profile";
import { useDispatch, useSelector } from "react-redux";
import AddressForm from "./components/profile/addressForm";
import { getAllCategories, getMyOrders } from "./redux/apiReq";
import { publicProductsRequest } from "./utils/axios";
import { useEffect } from "react";
import { allProduct } from "./redux/productsRedux";
import Contact from "./pages/Contacts";
import Products from "./pages/Products";
import AboutUs from "./pages/AboutUs";

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
        path: "/addressForm",
        element: <AddressForm />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/shopping_cart",
        element: <ShoppingCart />,
      },
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/about_us",
        element: <AboutUs />,
      },

      // {
      //   path: "/register",
      //   element: <Register />,
      // },
      // {
      //   path: "/reset",
      //   element: <Reset />,
      // // },
      // { path: "/checkout", element: <Checkout /> },
      // { path: "/about_us", element: <AboutUs /> },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      console.log("the effect is invoked");
      try {
        const res = await publicProductsRequest.get("/products");
        console.log("the product", res.data);
        dispatch(allProduct(res.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  const user = useSelector((state) => state.user);
  if (user.currentUser) {
    getMyOrders(user.currentUser._id);
  }
  getAllCategories();
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
