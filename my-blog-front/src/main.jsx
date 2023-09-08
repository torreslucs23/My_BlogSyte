import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import PostDetail from './routes/PostDetail.jsx'

//routes

import Home from './routes/Home.jsx'
import AllPosts from './routes/AllPosts.jsx'

import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'
import './index.css'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/allPosts",
        element: <AllPosts />
      },
      {
        path: "/post/:id",
        element: <PostDetail />
      }
    ],
  },
]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>,
)
