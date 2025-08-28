import React from 'react'
import './index.css'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Home from './components/Home/Home.jsx'
import SellItem from './components/SellItem/SellItem.jsx'
import Buyitem from './components/BuyItem/BuyItem.jsx'
import Confirm  from './components/Confirm/Confirm.jsx'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
const router = createBrowserRouter([
  {
    path : '/',
    element : <App/>,
    children : [{
       path : "",
       element : <Home/>
    },
    {
      path: "/SellItem",
      element: <SellItem />
    },
    {
      path: "/BuyItem",
      element: <Buyitem />
    },{
      path: "/Confirm",
      element: <Confirm />
    }]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
