import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UseAuth from "../../../hooks/UseAuth";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from "recharts";

const CitizenHome = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = UseAuth();

    // -------- Fetch user issues --------
    const {
        data: issues = [],
       issueLoading
    } = useQuery({
        queryKey: ['my-issues', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/issues?userEmail=${user.email}`);
            return res.data;
        },

    });


   

    if (issueLoading ) {
        return <p className="text-center mt-6"><span className="loading loading-spinner loading-xl"></span></p>;
    }

    // -------- Stats --------
    const totalIssues = issues.length;
    const pendingCount = issues.filter(i => i.status === "pending").length;
    const workingCount = issues.filter(i => i.status === "working" || i.status === "in-progress").length;
    const resolvedCount = issues.filter(i => i.status === "resolved" || i.status === "closed").length;

   

    // -------- Chart data --------
    const chartData = [
        { name: "Pending", value: pendingCount },
        { name: "Working", value: workingCount },
        { name: "Resolved", value: resolvedCount },
    ];

    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center md:text-left">
                Citizen Dashboard
            </h2>

            {/* -------- Cards -------- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-blue-100 p-4 rounded shadow text-center">
                    <p>Total Issues</p>
                    <h3 className="text-2xl font-bold">{totalIssues}</h3>
                </div>

                <div className="bg-yellow-100 p-4 rounded shadow text-center">
                    <p>Pending</p>
                    <h3 className="text-2xl font-bold">{pendingCount}</h3>
                </div>

                <div className="bg-indigo-100 p-4 rounded shadow text-center">
                    <p>In Progress</p>
                    <h3 className="text-2xl font-bold">{workingCount}</h3>
                </div>

                <div className="bg-green-100 p-4 rounded shadow text-center">
                    <p>Resolved</p>
                    <h3 className="text-2xl font-bold">{resolvedCount}</h3>
                </div>

               
            </div>

            {/* -------- Chart -------- */}
            <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-semibold text-center mb-2">
                    Issue Status Overview
                </h3>

                <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                        <Pie data={chartData} dataKey="value" nameKey="name" label>
                            {chartData.map((item, index) => (
                                <Cell
                                    key={index}
                                    fill={
                                        item.name === "Pending"
                                            ? "#facc15"
                                            : item.name === "Working"
                                                ? "#6366f1"
                                                : "#22c55e"
                                    }
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default CitizenHome;
