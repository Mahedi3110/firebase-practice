import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './layout/Layout';
import User from './User';
import Join from './Join';
import Home from './Home';
import NotFound from './NotFound';
import AuthProvider from './provider/AuthProvider';
import PrivateRoute from './privateRoute/PrivateRoute';
import Order from './Order';
import Profile from './Profile';
import LogOutRoute from './privateRoute/LogOutRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/home",
        element: <Home></Home>
      },
      {
        path: "/join",
        element: <Join></Join>
      },
      // {
      //   path: "/join",
      //   element: <LogOutRoute><Join></Join></LogOutRoute>
      // },
      {
        path: "/user",
        element: <PrivateRoute><User></User></PrivateRoute>
      },
      {
        path: "/order",
        element: <PrivateRoute><Order></Order></PrivateRoute>
      },
      {
        path: "/profile",
        element: <PrivateRoute><Profile></Profile></PrivateRoute>
      }
    ]
  },
  {
    path: "/*",
    element: <NotFound></NotFound>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
