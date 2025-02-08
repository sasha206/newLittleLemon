import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import AdminLayout from './AdminLayout';
import Home from '../pages/home/home_page';
import About from '../pages/about/about_page';
import Login from '../pages/login/login_page';
import Menu from '../pages/menu/menu_page';
import Reservations from '../pages/reservations/reservations_page';
import Order from '../pages/order/order_page';
import AdminPanel from '../pages/admin_panel/admin_panel_page';
import EditorMenu from '../pages/login/login_components/editor_menu';
import Analytics_page from '../pages/login/login_components/analytics_page';
import ProtectedRoute from './ProtectedRoute';

const staffRoles: UserRole[] = ['workers', 'managers', 'admins'];
export type UserRole = 'users' | 'workers' | 'managers' | 'admins';
export type UserRoles = UserRole[];

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'menu', element: <Menu /> },
      { path: 'reservations', element: <Reservations /> },
      { path: 'order', element: <Order /> },
    ],
  },
  {
    path: '/login',
    element: <AdminLayout />,
    children: [
      { index: true, element: <Login /> },
      { 
        path: 'editor_menu', 
        element: (
          <ProtectedRoute allowedRoles={staffRoles}>
            <EditorMenu />
          </ProtectedRoute>
        ) 
      },
      { 
        path: 'admin_panel', 
        element: (
          <ProtectedRoute allowedRoles={staffRoles}>
            <AdminPanel />
          </ProtectedRoute>
        ) 
      },
      { 
        path: 'analytics_page', 
        element: (
          <ProtectedRoute allowedRoles={staffRoles}>
            <Analytics_page/>
          </ProtectedRoute>
        )
      },
    ],
  },
]);


