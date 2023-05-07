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
import Register from "../src/components/register";
import SendEmail from "../src/components/resetPassword/sendEmail";
import ResetPassword from "../src/components/resetPassword/resetPassword";
import { Outlet } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./components/profile";
import { useSelector } from "react-redux";
import AddressForm from "./components/profile/addressForm";

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
    ],
  },
]);

function App() {
  const user = useSelector((state) => state.user);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
