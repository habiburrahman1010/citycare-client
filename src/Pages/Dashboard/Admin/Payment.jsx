import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Payments = () => {
  const axiosSecure = useAxiosSecure();


  const { data: issues = [] ,isLoading, isError} = useQuery({
    queryKey: ["issues"],
    queryFn: async () => {
      const res = await axiosSecure.get("/public/issues");
      return Array.isArray(res.data?.issues) ? res.data.issues : [];
    },
  });


  const highPriorityIssues = issues.filter((p) => p.priority === "high");

  if (isLoading) return <p className="text-center mt-6 text-lg"><span className="loading loading-spinner loading-xl"></span></p>;
  if (isError)
    return (
      <p className="text-center mt-6 text-red-500 text-lg">
        Failed to load issues.
      </p>
    );
  if (!highPriorityIssues.length)
    return (
      <p className="text-center mt-6 text-gray-500 text-lg">
        No high priority issues found.
      </p>
    );

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center md:text-left">
        Paid Issues
      </h2>


      <div className="overflow-x-auto">
        <table className="table table-zebra w-full min-w-[500px] md:min-w-[650px]">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-sm md:text-base">#</th>
              <th className="text-sm md:text-base">User Email</th>
              <th className="text-sm md:text-base">Title / Type</th>
              <th className="text-sm md:text-base">Priority</th>
              <th className="text-sm md:text-base">Status</th>
              <th className="text-sm md:text-base">Date</th>
            </tr>
          </thead>
          <tbody>
            {highPriorityIssues.map((p, index) => (
              <tr
                key={p._id || index}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="text-sm md:text-base">{index + 1}</td>
                <td className="text-xs md:text-sm break-words">{p.userEmail}</td>
                <td className="text-sm md:text-base">{p.title || p.type || "N/A"}</td>
                <td>
                  <span className="badge badge-error text-xs md:text-sm">
                    {p.priority}
                  </span>
                </td>
                <td>
                  <span
                    className={`badge text-xs md:text-sm ${p.status === "resolved" || p.status === "closed"
                        ? "badge-success"
                        : p.status === "pending"
                          ? "badge-warning"
                          : "badge-secondary"
                      }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="text-xs md:text-sm whitespace-nowrap">
                  {new Date(p.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {highPriorityIssues.length === 0 && (
        <p className="text-center mt-4 text-gray-500 text-sm md:text-base">
          No high priority issues to display.
        </p>
      )}
    </div>
  );
};

export default Payments;