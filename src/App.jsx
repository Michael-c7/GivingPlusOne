import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from 'react-router-dom';

// pages
import Home from './pages/Home';
import Error from './pages/Error';
import Search from './pages/Search';
import SingleItem from './pages/SingleItem';
import About from './pages/About';
import HowItWorks from './pages/HowItWorks';

// components
import Navbar from './components/Navbar';


const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <Error/>,
    element: (
      <>
        <Navbar />
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: 'search', element: <Search />, },
      { path: 'about', element: <About /> },
      { path: 'howItWorks', element: <HowItWorks /> },
      { path: 'singleItem/:itemId', element: <SingleItem /> },
      // { path: '*', element: <Navigate to="/" /> }, // Redirect to Home for unknown routes
    ],
  },
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;