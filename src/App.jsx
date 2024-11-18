import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./Layout/Layout";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import Home from "./pages/Home";
import CreateCar from "./pages/CreateCar";
import UpdateCar from "./pages/UpdateCar";
import CarDetails from "./pages/CarDetails";

function App() {
  const router = createBrowserRouter([
    {path:'/app',
      element: <Layout/>,
      children:[
        {path: '/app/home' , element: <Home/>},
        {path: '/app/create-car' , element: <CreateCar/>},
      //   {path: '/app/my-profile' , element: <ProfilePage/>},
      { path: '/app/update-car/:carId', element: <UpdateCar /> },  // Added carId param
      { path: '/app/car-detail/:carId', element: <CarDetails /> }  
      ]
    },
    {path:'/',
      element: <SignIn/>,
    },
    {path:'/signup',
      element: <SignUp/>,
    }
  ])
  return (
    <>


          <RouterProvider router={router}>

          </RouterProvider>

    </>
  );
}

export default App;
