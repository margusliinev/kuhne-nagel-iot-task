import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AppPage from './pages/AppPage';

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <HomePage />,
        },
        {
            path: '/app',
            element: <AppPage />,
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
