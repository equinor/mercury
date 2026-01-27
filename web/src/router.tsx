import { createBrowserRouter } from 'react-router-dom'
import InvalidUrl from './pages/InvalidUrl/InvalidUrl'
import { MainPage } from './pages/MainPage/MainPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '*',
    element: <InvalidUrl />,
  },
])
