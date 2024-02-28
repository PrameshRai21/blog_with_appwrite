import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import store from './store/store'
import { Provider } from 'react-redux'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import { AuthLayout, Login, Signup } from './components/index.js'
import EditPost from './pages/EditPost'
import AllPosts from './pages/AllPosts'
import AddPost from './pages/AddPost'
import Post from './pages/Post'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: (
          <AuthLayout authentication={false}>
             <Login />
          </AuthLayout>
        ),
      },
      {
        path: '/signup',
        element: (
          <AuthLayout authentication={false}>
              <Signup />
          </AuthLayout>
        ),
      },
      {
        path: '/all-posts',
        element:(
          <AuthLayout authentication>
             {" "}
             <AllPosts/>
          </AuthLayout>
        ),
      },
      {
        path: '/add-post',
        element:(
          <AuthLayout authentication>
            {" "}
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: '/edit-post/:slug',
        element: (
          <AuthLayout authentication>
            {" "}
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: '/post/:slug',
        element: <Post />
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
         <RouterProvider router={router} />
      </Provider>,
  </React.StrictMode>
)