import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

  // -------- FETCH ISSUES --------
  const { data: issuesResponse } = useQuery({
    queryKey: ["issues"],
    queryFn: async () => {
      const res = await axiosSecure.get("/public/issues");
      return res.data;
    },
  });

  // -------- FETCH USERS --------
  const { data: usersResponse } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // -------- FORCE ARRAY SAFETY --------
  const issues = Array.isArray(issuesResponse)
    ? issuesResponse
    : Array.isArray(issuesResponse?.data)
    ? issuesResponse.data
    : Array.isArray(issuesResponse?.issues)
    ? issuesResponse.issues
    : [];

  const users = Array.isArray(usersResponse)
    ? usersResponse
    : Array.isArray(usersResponse?.data)
    ? usersResponse.data
    : [];

  // -------- STATS --------
  const totalIssues = issues.length;

  const resolvedIssues = issues.filter(
    (i) => i?.status === "closed" || i?.status === "resolved"
  ).length;

  const pendingIssues = issues.filter(
    (i) => i?.status === "pending"
  ).length;

  const rejectedIssues = issues.filter(
    (i) => i?.status === "rejected"
  ).length;

  // -------- LATEST DATA --------
  const latestIssues = [...issues]
    .sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))
    .slice(0, 5);

  const latestUsers = [...users]
    .sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))
    .slice(0, 5);

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-100 p-4 rounded text-center">
          <h3>Total Issues</h3>
          <p className="text-2xl font-bold">{totalIssues}</p>
        </div>
        <div className="bg-green-100 p-4 rounded text-center">
          <h3>Resolved</h3>
          <p className="text-2xl font-bold">{resolvedIssues}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded text-center">
          <h3>Pending</h3>
          <p className="text-2xl font-bold">{pendingIssues}</p>
        </div>
        <div className="bg-red-100 p-4 rounded text-center">
          <h3>Rejected</h3>
          <p className="text-2xl font-bold">{rejectedIssues}</p>
        </div>
      </div>

      {/* Latest Issues */}
      <div className="bg-white p-4 rounded shadow overflow-x-auto">
        <h3 className="text-lg font-semibold mb-2">Latest Issues</h3>
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Title</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {latestIssues.map((i, idx) => (
              <tr key={i?._id || idx}>
                <td>{idx + 1}</td>
                <td>{i?.userEmail}</td>
                <td>{i?.title || "N/A"}</td>
                <td>{i?.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Latest Users */}
      <div className="bg-white p-4 rounded shadow overflow-x-auto">
        <h3 className="text-lg font-semibold mb-2">Latest Users</h3>
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {latestUsers.map((u, idx) => (
              <tr key={u?._id || idx}>
                <td>{idx + 1}</td>
                <td>{u?.displayName || u?.name}</td>
                <td>{u?.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHome;
