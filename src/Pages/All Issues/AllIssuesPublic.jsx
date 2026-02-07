import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import UseAuth from "../../hooks/UseAuth";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useState } from "react";

const AllIssuesPublic = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const { data: issues = [], refetch } = useQuery({
    queryKey: ["all-issues"],
    queryFn: async () => {
      const res = await axiosSecure.get("/public/issues");
      return res.data;
    },
  });

  const handleUpvote = async (issue) => {
    if (!user) {
      return navigate("/login");
    }

    try {
      await axiosSecure.patch(`/issues/upvote/${issue._id}`, {
        userEmail: user.email,
      });

      refetch();
    } catch (err) {
      Swal.fire("Oops!", err.response?.data?.message || "Failed", "error");
    }
  };

  // ---------- FILTER + SEARCH ----------
  const filteredIssues = issues.filter((issue) => {
    return (
      issue.title.toLowerCase().includes(search.toLowerCase()) &&
      (!filterStatus || issue.status === filterStatus) &&
      (!filterPriority || issue.priority === filterPriority) &&
      (!filterCategory || issue.category === filterCategory)
    );
  });

  return (
    <div>
      <h2 className="text-4xl font-bold text-center mb-4">All Issues</h2>

      {/* Search & Filters */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        <input
          placeholder="Search issue..."
          className="input input-bordered"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select className="select select-bordered" onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="">Category</option>
          <option value="Road">Road</option>
          <option value="Water">Water</option>
          <option value="Electricity">Electricity</option>
        </select>

        <select className="select select-bordered" onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">Status</option>
          <option value="pending">Pending</option>
          <option value="assigned">Assigned</option>
          <option value="rejected">Rejected</option>
        </select>

        <select className="select select-bordered" onChange={(e) => setFilterPriority(e.target.value)}>
          <option value="">Priority</option>
          <option value="high">High</option>
          <option value="normal">Normal</option>
        </select>
      </div>

      <div className="p-6 grid md:grid-cols-3 gap-4">
        {filteredIssues.map((issue) => (
          <div key={issue._id} className="card bg-base-100 shadow">
            <figure>
              <img src={issue.image} className="h-40 w-full object-cover" />
            </figure>

            <div className="card-body">
              <h2 className="font-bold">{issue.title}</h2>
              <p>{issue.category}</p>
              <p>{issue.location}</p>

              <div className="flex gap-2">
                <span className="badge badge-info">{issue.status}</span>
                <span className={`badge ${issue.priority === "high" ? "badge-error" : "badge-success"}`}>
                  {issue.priority}
                </span>
              </div>

              <div className="flex justify-between items-center mt-2">
                <button onClick={() => handleUpvote(issue)} className="btn btn-sm">
                  👍 {issue.upvotes || 0}
                </button>

                <button
                  onClick={() => navigate(`/issue-details/${issue._id}`)}
                  className="btn btn-sm btn-primary"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllIssuesPublic;
