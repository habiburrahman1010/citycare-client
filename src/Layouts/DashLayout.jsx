import React from 'react';
import { Link, Outlet } from 'react-router';
import { FaHome, FaCog, FaBars, FaExclamationTriangle, FaUserCircle } from "react-icons/fa";
import { FiPlusCircle, FiUsers } from 'react-icons/fi';
import { MdOutlineInfo } from 'react-icons/md';
import UseAuth from '../hooks/UseAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';

const DashLayout = () => {

    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();

    const { data: dbUser, isLoading } = useQuery({
        queryKey: ["dbUser", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        },
    });

    if (isLoading) return <p className="p-6">Loading...</p>;

    const role = dbUser?.role;

    console.log('role', role)





    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

                <div className="drawer-content">
                    {/* Navbar */}
                    <nav className="navbar w-full bg-base-300">
                        <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <FaBars className="text-lg" />
                        </label>
                        <div className="px-4">Navbar Title</div>
                    </nav>

                    {/* Page content here */}
                    <Outlet />
                </div>

                <div className="drawer-side is-drawer-close:overflow-visible">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>

                    <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                        <ul className="menu w-full grow">

                            {/* Home*/}
                            <li>
                                <Link
                                    to={'/'}

                                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2"
                                    data-tip="Homepage"
                                >
                                    <FaHome className="text-lg" />
                                    <span className="is-drawer-close:hidden">HomePage</span>
                                </Link>
                            </li>
                            {
                                role === 'citizen' &&

                                <>
                                    {/*Dashboard Home*/}
                                    <li>
                                        <Link
                                            to={'/dashboard'}

                                            className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2"
                                            data-tip="Homepage"
                                        >
                                            <FaHome className="text-lg" />
                                            <span className="is-drawer-close:hidden">Dashboard Home</span>
                                        </Link>
                                    </li>

                                    {/* create issue */}
                                    <li>
                                        <Link
                                            to={'/dashboard/create-issue'}
                                            className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2"
                                            data-tip="Create issue"
                                        >
                                            <FiPlusCircle size={20} />
                                            <span className="is-drawer-close:hidden">Create issue</span>
                                        </Link>
                                    </li>



                                    {/*my isssue */}
                                    <li>
                                        <Link
                                            to={`/dashboard/my-issue/${user?.email}`}
                                            className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2"
                                            data-tip="My Issue"
                                        >
                                            <FaExclamationTriangle size={24} />
                                            <span className="is-drawer-close:hidden"> My Issue </span>
                                        </Link>
                                    </li>

                                    {/*citizen profile */}
                                    <li>
                                        <Link
                                            to={'/dashboard/citizen-profile'}
                                            className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2"
                                            data-tip="Citizen Profile"
                                        >
                                            <FaUserCircle size={26} />
                                            <span className="is-drawer-close:hidden">Citizen Profile</span>
                                        </Link>
                                    </li>


                                </>
                            }

                            {/* --------------------------------------------- */}

                            {
                                role === "admin" &&
                                <>

                                    {/*Admin Home*/}
                                    <li>
                                        <Link
                                            to={'/dashboard/admin-home'}

                                            className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2"
                                            data-tip="Homepage"
                                        >
                                            <FaHome className="text-lg" />
                                            <span className="is-drawer-close:hidden">Admin Home</span>
                                        </Link>
                                    </li>



                                    {/*manage users*/}
                                    <li>
                                        <Link
                                            to={'/dashboard/mamage-users'}
                                            className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2"
                                            data-tip="manage Users"
                                        >
                                           <FiUsers size={24} />
                                            <span className="is-drawer-close:hidden">Manage Users</span>
                                        </Link>
                                    </li>

                                    {/*manage staff*/}
                                    <li>
                                        <Link
                                            to={'/dashboard/manage-staff'}
                                            className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2"
                                            data-tip="manage staff"
                                        >
                                           <FiUsers size={24} />
                                            <span className="is-drawer-close:hidden">Manage staff</span>
                                        </Link>
                                    </li>
                                    {/*All issue*/}
                                    <li>
                                        <Link
                                            to={'/dashboard/admin-all-issue'}
                                            className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2"
                                            data-tip="All issue"
                                        >
                                           <FiUsers size={24} />
                                            <span className="is-drawer-close:hidden">All Issue</span>
                                        </Link>
                                    </li>

                                    {/*Admin profile */}
                                    <li>
                                        <Link
                                            to={'/dashboard/admin-profile'}
                                            className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2"
                                            data-tip="Admin Profile"
                                        >
                                            <FaUserCircle size={26} />
                                            <span className="is-drawer-close:hidden">Admin Profile</span>
                                        </Link>
                                    </li>

                                </>
                            }

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashLayout;
