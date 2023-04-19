import "./App.css";
import Login from "./components/Login";
import Footer from "./components/footer";
import Home from "./pages/Home";
import { Outlet } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        {/* <Header /> */}
        <Outlet />
        <Footer />
      </>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      // {
      //   path: "/register",
      //   element: <Register />,
      // },
      // {
      //   path: "/reset",
      //   element: <Reset />,
      // },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
