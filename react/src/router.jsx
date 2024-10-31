import { createBrowserRouter, Navigate } from 'react-router-dom'

import Login from './views/Login.jsx';
import Signup from './views/Signup.jsx';
import DefaultLayout from './components/DefaultLayout.jsx';
import GuestLayout from './components/GuestLayout.jsx';
import Users from './views/Users.jsx';
import Dashboard from './views/Dashboard.jsx';
import UserForm from './views/UserForm.jsx';
import CategoryForm from './views/CategoryForm.jsx';
import Category from './views/Category.jsx';
import SupplierForm from './views/SupplierForm.jsx';
import Supplier from './views/Supplier.jsx';
import './assets/css/style.css';
const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/users',
                element: <Users />
            },
            {
                path: '/users/new',
                element: <UserForm key="userCreate" />
            },
            {
                path: '/users/:id',
                element: <UserForm key="userUpdate" />
            },
            {
                path: '/category',
                element: <Category />
            },
            {
                path: '/category/new',
                element: <CategoryForm key="categoryCreate" />
            },
            {
                path: '/category/:id',
                element: <CategoryForm key="categoryUpdate" />
            },
            {
                path: '/supplier',
                element: <Supplier />
            },
            {
                path: '/supplier/new',
                element: <SupplierForm key="supplierCreate" />
            },
            {
                path: '/supplier/:id',
                element: <SupplierForm key="categoryUpdate" />
            },
        ],
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            }
        ]
    }
])

export default router;