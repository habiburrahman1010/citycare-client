import React from 'react';
import { Link, Outlet } from 'react-router';
import { FaHome, FaCog, FaBars } from "react-icons/fa";
import { FiPlusCircle } from 'react-icons/fi';

const DashLayout = () => {
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

                            {/* Home */}
                            <li>
                                <button
                                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2"
                                    data-tip="Homepage"
                                >
                                    <FaHome className="text-lg" />
                                    <span className="is-drawer-close:hidden">Homepage</span>
                                </button>
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

                            {/* Settings */}
                            <li>
                                <button
                                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2"
                                    data-tip="Settings"
                                >
                                    <FaCog className="text-lg" />
                                    <span className="is-drawer-close:hidden">Settings</span>
                                </button>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashLayout;
