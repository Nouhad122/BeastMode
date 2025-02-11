import { createBrowserRouter, RouterProvider } from 'react-router'
import './App.css'
import RootPage from './Pages/RootPage';
import Home, {loader as homeLoader} from './Pages/Home';

function App() {
  const router = createBrowserRouter([
    {path: '/', element: <RootPage />, children: [
        {index: true, element: <Home />, loader: homeLoader}
      ]
    }
  ]);

  return (
      <RouterProvider router={router} />
  )
}

export default App
