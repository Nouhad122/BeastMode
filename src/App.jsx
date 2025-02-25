import { createBrowserRouter, RouterProvider } from 'react-router'
import './App.css'
import RootPage from './Pages/RootPage';
import Home from './Pages/Home';
import ExerciseDetail from './Pages/ExerciseDetail';
import Exercises from './Pages/ExercisesPage';

function App() {
  const router = createBrowserRouter([
    {path: '/', element: <RootPage />, children: [
        {index: true, element: <Home />},
        {path: '/exercises', element: <Exercises />},
        {path: '/exercises/:name/:id', element: <ExerciseDetail />}
      ]
    }
  ]);

  return (
      <RouterProvider router={router} />
  )
}

export default App
