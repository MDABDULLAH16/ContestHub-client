import React from 'react';
import useRole from '../../../hooks/useUserRole';
import { Outlet } from 'react-router';
import AdminDashboard from '../../Dashboard/AdminDashboard';

const DashboardLayout = () => {
    const {role} = useRole()
    return (
        <div>
            {role === 'admin' && <AdminDashboard/>}
            {role === 'creator' && <h2 className="text-2xl font-bold">Creator Dashboard</h2>}
            {role === 'user' && <h2 className="text-2xl font-bold">User Dashboard</h2>} 
            <Outlet></Outlet>
        </div>
    );
};

export default DashboardLayout;