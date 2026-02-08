import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

 
  const { data: issues = [] } = useQuery({
    queryKey: ["issues"],
    queryFn: async () => {
      const res = await axiosSecure.get("/public/issues");
      return res.data;
    },
  });

  const { data: payments = [] } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  
  const totalIssues = issues.length;
  const resolvedIssues = issues.filter((i) => i.status === "resolved").length;
  const pendingIssues = issues.filter((i) => i.status === "pending").length;
  const rejectedIssues = issues.filter((i) => i.status === "rejected").length;

  

  
  const latestIssues = [...issues]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  

  

  const latestUsers = [...users]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center md:text-left">
        Admin Dashboard
      </h2>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-100 p-4 rounded shadow text-center">
          <h3 className="font-semibold text-lg">Total Issues</h3>
          <p className="text-2xl font-bold">{totalIssues}</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow text-center">
          <h3 className="font-semibold text-lg">Resolved Issues</h3>
          <p className="text-2xl font-bold">{resolvedIssues}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow text-center">
          <h3 className="font-semibold text-lg">Pending Issues</h3>
          <p className="text-2xl font-bold">{pendingIssues}</p>
        </div>
        <div className="bg-red-100 p-4 rounded shadow text-center">
          <h3 className="font-semibold text-lg">Rejected Issues</h3>
          <p className="text-2xl font-bold">{rejectedIssues}</p>
        </div>
        
      </div>

      
      <div className="overflow-x-auto bg-white p-4 rounded shadow">
        <h3 className="text-xl font-semibold mb-2">Latest Issues</h3>
        <table className="table table-zebra w-full min-w-[500px]">
          <thead>
            <tr>
              <th>#</th>
              <th>User Email</th>
              <th>Title </th>
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
                <td>{i.title || i.type || "N/A"}</td>
                <td>
                  <span
                    className={`badge ${
                      i.status === "resolved"
                        ? "badge-success"
                        : i.status === "pending"
                        ? "badge-warning"
                        : "badge-error"
                    }`}
                  >
                    {i.status}
                  </span>
                </td>
                <td>
                  <span className="badge badge-info">{i.priority}</span>
                </td>
                <td className="whitespace-nowrap">{new Date(i.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      

      
      <div className="overflow-x-auto bg-white p-4 rounded shadow">
        <h3 className="text-xl font-semibold mb-2">Latest Users</h3>
        <table className="table table-zebra w-full min-w-[500px]">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {latestUsers.map((u, idx) => (
              <tr key={u._id}>
                <td>{idx + 1}</td>
                <td>{u.displayName || u.name}</td>
                <td className="break-all">{u.email}</td>
                <td>{u.role}</td>
                <td className="whitespace-nowrap">{new Date(u.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHome;
