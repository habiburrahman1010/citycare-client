import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AllIssues = () => {
  const axiosSecure = useAxiosSecure();
  const [assigningIssue, setAssigningIssue] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState("");

  const { data: issues = [], refetch: refetchIssues } = useQuery({
    queryKey: ["issues"],
    queryFn: async () => {
      const res = await axiosSecure.get("/issues/all");
      return res.data;
    },
  });

  const { data: staffList = [] } = useQuery({
    queryKey: ["staff"],
    queryFn: async () => {
      const res = await axiosSecure.get("/staff");
      return res.data;
    },
  });

  const handleAssign = async () => {
    if (!selectedStaff) {
      return Swal.fire("Select staff first");
    }

    await axiosSecure.post(`/issue/assign/${assigningIssue._id}`, {
      staffId: selectedStaff,
    });

    Swal.fire("Assigned!", "Staff assigned successfully", "success");

    setAssigningIssue(null);
    setSelectedStaff("");
    refetchIssues();
  };

  const handleReject = async (issue) => {
    const result = await Swal.fire({
      title: `Reject "${issue.title}"?`,
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Reject",
    });

    if (result.isConfirmed) {
      await axiosSecure.post(`/issue/reject/${issue._id}`);

      Swal.fire("Rejected!", "Issue rejected successfully", "success");
      refetchIssues();
    }
  };


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Issues</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Assigned Staff</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue, i) => (
            <tr key={issue._id}>
              <td>{i + 1}</td>
              <td>{issue.title}</td>
              <td>{issue.category}</td>
              <td>{issue.status}</td>
              <td>{issue.priority}</td>
              <td>
                {staffList.find(s => s._id === issue.assignedStaff)?.name || "Unassigned"}
              </td>

              <td className="flex gap-2">
                {!issue.assignedStaff && (
                  <button className="btn btn-sm btn-primary" onClick={() => setAssigningIssue(issue)}>
                    Assign Staff
                  </button>
                )}
                {issue.status === "pending" && (
                  <button className="btn btn-sm btn-error" onClick={() => handleReject(issue)}>
                    Reject
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Assign Staff Modal */}
      {assigningIssue && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-2">Assign Staff for "{assigningIssue.title}"</h3>
            <select
              className="select select-bordered w-full mb-4"
              value={selectedStaff}
              onChange={(e) => setSelectedStaff(e.target.value)}
            >
              <option value="">Select Staff</option>
              {staffList.map((staff) => (
                <option key={staff._id} value={staff._id}>
                  {staff.name}
                </option>
              ))}
            </select>
            <div className="modal-action">
              <button className="btn btn-primary" onClick={handleAssign}>
                Assign
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setAssigningIssue(null);
                  setSelectedStaff("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllIssues;