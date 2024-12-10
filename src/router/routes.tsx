import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import Home from '../pages/home/home_page';
import About from '../pages/about/about_page';
import Login from '../pages/login/login_page';
import Menu from '../pages/menu/menu_page';
import Reservations from '../pages/reservations/reservations_page';
import Order from '../pages/order/order_page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'login', element: <Login /> },
      { path: 'menu', element: <Menu /> },
      { path: 'reservations', element: <Reservations /> },
      { path: 'order', element: <Order /> },
    ],
  },
]);
