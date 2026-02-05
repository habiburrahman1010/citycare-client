import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleBlockToggle = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: user.isBlocked ? "Unblock this user?" : "Block this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.patch(`/users/block/${user._id}`, {
          isBlocked: !user.isBlocked,
        });

        refetch();
      }
    });
  };

  if (isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Subscription</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, i) => (
            <tr key={user._id}>
              <td>{i + 1}</td>
              <td>{user.displayName || "N/A"}</td>
              <td>{user.email}</td>
              <td>{user.isPremium ? "Premium" : "Free"}</td>
              <td>
                {user.isBlocked ? (
                  <span className="text-red-500">Blocked</span>
                ) : (
                  <span className="text-green-500">Active</span>
                )}
              </td>
              <td>
                <button
                  onClick={() => handleBlockToggle(user)}
                  className={`btn btn-sm ${
                    user.isBlocked ? "btn-success" : "btn-error"
                  }`}
                >
                  {user.isBlocked ? "Unblock" : "Block"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
