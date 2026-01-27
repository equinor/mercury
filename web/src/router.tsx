import { createBrowserRouter } from 'react-router-dom'
import { MainPage } from './pages/Main'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
])
