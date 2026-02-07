import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAuth from "../../../hooks/UseAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminProfile = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();

  const { data: profile = {}, refetch } = useQuery({
    queryKey: ["profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/profile/${user.email}`);
      return res.data;
    },
  });

  const { register, handleSubmit, reset } = useForm({
    values: profile,
  });

  const onSubmit = async data => {
    await axiosSecure.patch(`/profile/${user.email}`, data);
    Swal.fire("Updated!", "Profile updated successfully", "success");
    refetch();
  };

  return (
    <div className="p-6 max-w-md">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input
          className="input input-bordered w-full"
          placeholder="Name"
          {...register("displayName")}
        />

        <input
          className="input input-bordered w-full"
          placeholder="Photo URL"
          {...register("photoURL")}
        />

        <button className="btn btn-primary w-full">Update</button>
      </form>
    </div>
  );
};

export default AdminProfile;
