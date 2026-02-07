import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UseAuth from "../../../hooks/UseAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";

const AssignedIssue = () => {
    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [selectedStatus, setSelectedStatus] = useState({});

    // -------------------- Fetch assigned issues --------------------
    const { data: issues = [], isLoading } = useQuery({
        queryKey: ["staffIssues", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/staff/issues/${user.email}`);
            return res.data;
        },
    });

    // -------------------- Status mutation --------------------
    const mutation = useMutation({
        mutationFn: ({ id, status }) =>
            axiosSecure.patch(`/staff/issues/status/${id}`, {
                status,
                staffId: user._id, // For timeline
            }),
        onSuccess: () => queryClient.invalidateQueries(["staffIssues", user.email]),
    });

    // -------------------- Status flow mapping --------------------
    const flow = {
        pending: ["assigned"],
        assigned: ["in-progress"],
        "in-progress": ["working"],
        working: ["resolved"],
        resolved: ["closed"],
        closed: [], 
        null: ["assigned"], 
    };

    if (isLoading) return <p className="p-6">Loading assigned issues...</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Assigned Issues</h2>

            <table className="table table-zebra w-full">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Boosted</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {issues.map((issue) => {
                        const statusKey = issue.status ?? "null"; 
                        const availableStatuses = flow[statusKey] || [];

                        return (
                            <tr key={issue._id}>
                                <td>{issue.title}</td>
                                <td>{issue.priority}</td>
                                <td>{issue.status ?? "Pending"}</td>
                                <td>{issue.boosted ? "Yes" : "No"}</td>
                                <td>
                                    <div className="flex gap-2">
                                        <select
                                            className="select select-sm select-bordered"
                                            value={selectedStatus[issue._id] || ""}
                                            onChange={(e) =>
                                                setSelectedStatus((prev) => ({
                                                    ...prev,
                                                    [issue._id]: e.target.value,
                                                }))
                                            }
                                        >
                                            <option value="">Select Status</option>
                                            {availableStatuses.map((s) => (
                                                <option key={s} value={s}>
                                                    {s.charAt(0).toUpperCase() + s.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                        <button
                                            className={`btn btn-sm btn-primary ${mutation.isLoading ? "loading" : ""}`}
                                            onClick={() => {
                                                const status = selectedStatus[issue._id];
                                                if (!status) return alert("Please select a status!");
                                                mutation.mutate({ id: issue._id, status });
                                            }}
                                        >
                                            Update
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {issues.length === 0 && (
                <p className="mt-4 text-center text-gray-500">No assigned issues found.</p>
            )}
        </div>
    );
};

export default AssignedIssue;
