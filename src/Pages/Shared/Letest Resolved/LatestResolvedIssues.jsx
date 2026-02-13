import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const LatestResolvedIssues = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: issues = [], isLoading } = useQuery({
    queryKey: ["latestResolved"],
    queryFn: async () => {
      const res = await axiosSecure.get("/public/issues");
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="text-center mt-10"><span className="loading loading-spinner loading-xl"></span></p>;
  }

  // ✅ filter + sort + limit
  const resolvedIssues = issues
    .filter(i => i.status === "resolved" || i.status === "closed")
    .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))
    .slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-10">
        Latest Resolved Issues
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {resolvedIssues.map(issue => (
          <div key={issue._id} className="card bg-base-100 shadow hover:shadow-xl transition">

            <figure>
              <img
                src={issue.image}
                alt={issue.title}
                className="h-48 w-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h3 className="font-bold text-lg line-clamp-1">
                {issue.title}
              </h3>

              <p className="text-sm text-gray-500 line-clamp-2">
                {issue.description}
              </p>

              <div className="flex gap-2 mt-2">
                <span className="badge badge-success">
                  {issue.status}
                </span>

                <span className={`badge ${
                  issue.priority === "high" ? "badge-error" : "badge-info"
                }`}>
                  {issue.priority}
                </span>
              </div>

              <p className="text-sm mt-2">
                📍 {issue.location || "Unknown"}
              </p>

              <div className="card-actions justify-end mt-4">
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

export default LatestResolvedIssues;
