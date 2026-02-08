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

const StaffHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();

  // -------- Fetch assigned issues --------
  const { data: issues = [], isLoading } = useQuery({
    queryKey: ["staffIssues", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/staff/issues/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center mt-6">Loading dashboard...</p>;

  // -------- Stats --------
  const totalAssigned = issues.length;
  const resolvedCount = issues.filter(i => i.status === "resolved" || i.status === "closed").length;
  const pendingCount = issues.filter(i => i.status === "pending" || i.status === "working" || i.status === "in-progress").length;

  const today = new Date();
  const todaysTasks = issues.filter(i => new Date(i.createdAt).toDateString() === today.toDateString());

  // -------- Chart data --------
  const statusData = [
    { name: "Resolved", value: resolvedCount },
    { name: "Pending", value: pendingCount },
  ];

  const latestIssues = [...issues]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-center md:text-left">
        Staff Dashboard
      </h2>

      {/* -------- Cards -------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-100 p-4 rounded shadow text-center">
          <p>Assigned</p>
          <h3 className="text-2xl font-bold">{totalAssigned}</h3>
        </div>
        <div className="bg-green-100 p-4 rounded shadow text-center">
          <p>Resolved</p>
          <h3 className="text-2xl font-bold">{resolvedCount}</h3>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow text-center">
          <p>Pending</p>
          <h3 className="text-2xl font-bold">{pendingCount}</h3>
        </div>
        <div className="bg-purple-100 p-4 rounded shadow text-center">
          <p>Today Tasks</p>
          <h3 className="text-2xl font-bold">{todaysTasks.length}</h3>
        </div>
      </div>

      
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold text-center mb-2">Issue Status Chart</h3>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie data={statusData} dataKey="value" nameKey="name" label>
              {statusData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.name === "Resolved" ? "#22c55e" : "#f59e0b"}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      
      <div className="overflow-x-auto bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Latest Assigned Issues</h3>
        <table className="table table-zebra w-full min-w-[500px]">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Title</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {latestIssues.map((i, idx) => (
              <tr key={i._id}>
                <td>{idx + 1}</td>
                <td className="break-all">{i.userEmail}</td>
                <td>{i.title || "N/A"}</td>
                <td>
                  <span className={`badge ${i.status === "resolved" ? "badge-success" : "badge-warning"}`}>
                    {i.status}
                  </span>
                </td>
                <td><span className="badge badge-info">{i.priority}</span></td>
                <td>{new Date(i.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffHome;
