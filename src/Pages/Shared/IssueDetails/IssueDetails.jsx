import React from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UseAuth from "../../../hooks/UseAuth";

const IssueDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = UseAuth();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // -------------------- Fetch issue with React Query --------------------
    const { data: issue, isLoading, isError } = useQuery({
        queryKey: ["issue", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/issues/${id}`);
            return res.data;
        },
    });

    // -------------------- Actions --------------------
    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .delete(`/issues/${user.email}/${id}`)
                    .then((res) => {
                        if (res.data.deletedCount === 1) {
                            Swal.fire(
                                "Deleted!",
                                "Your issue has been deleted.",
                                "success"
                            );
                            queryClient.invalidateQueries(["issues"]); 
                            navigate("/"); 
                        } else {
                            Swal.fire("Error", "Issue not found or already deleted", "error");
                        }
                    })
                    .catch(() => Swal.fire("Error", "Failed to delete issue", "error"));
            }
        });
    };

    const handleBoost = async () => {
        try {
            const { data } = await axiosSecure.post('/issues/boost-checkout-session', {
                email: user.email,
                issueId: id,  
            });

           
            window.location.href = data.url;
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Failed to initiate boost payment', 'error');
        }
    };







    // -------------------- Render --------------------
    if (isLoading) return <p className="text-center mt-10">Loading...</p>;
    if (isError || !issue) return <p className="text-center mt-10">Issue not found</p>;

    return (
        <div className="max-w-5xl mx-auto p-6">
            {/* IMAGE */}
            <img
                src={issue.image}
                alt={issue.title}
                className="w-full h-96 object-cover rounded-xl shadow"
            />

            {/* TITLE & DESCRIPTION */}
            <h2 className="text-4xl font-bold mt-5">{issue.title}</h2>
            <p className="mt-3 text-gray-600">{issue.description}</p>

            {/* BADGES */}
            <div className="flex gap-3 mt-4">
                <span className="badge badge-info">{issue.status}</span>
                <span
                    className={`badge ${issue.priority === "high" ? "badge-error" : "badge-success"}`}
                >
                    {issue.priority}
                </span>
                <span className="badge badge-outline">{issue.category}</span>
            </div>

            <p className="mt-3">📍 {issue.location}</p>
            <p className="mt-1">👍 {issue.upvotes || 0}</p>

            {/* ACTIONS */}
            <div className="flex gap-3 mt-5">
                {user?.email === issue.userEmail && issue.status === "pending" && (
                    <button className="btn btn-warning">Edit</button>
                )}

                {user?.email === issue.userEmail && (
                    <button onClick={handleDelete} className="btn btn-error">
                        Delete
                    </button>
                )}

                {issue.priority !== "high" && (
                    <button onClick={handleBoost} className="btn btn-primary">
                        Boost (৳100)
                    </button>
                )}
            </div>

            {/* STAFF */}
            {issue.assignedStaff && (
                <div className="mt-6 p-4 border rounded-xl bg-base-200">
                    <h3 className="font-bold text-lg">Assigned Staff</h3>
                    <p>{issue.assignedStaff.name}</p>
                    <p>{issue.assignedStaff.email}</p>
                </div>
            )}

            {/* TIMELINE */}
            <div className="mt-10">
                <h3 className="text-2xl font-bold mb-4">Issue Timeline</h3>

                <ul className="timeline timeline-vertical">
                    {[...(issue.timeline || [])].reverse().map((t, i) => (
                        <li key={i}>
                            <div className="timeline-start text-sm">
                                {new Date(t.time).toLocaleString()}
                            </div>
                            <div className="timeline-middle">⬤</div>
                            <div className="timeline-end p-4 border rounded-xl">
                                <span className="badge badge-primary">{t.status}</span>
                                <p className="mt-1">{t.message}</p>
                                <small className="text-gray-500">Updated by: {t.updatedBy}</small>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default IssueDetails;
