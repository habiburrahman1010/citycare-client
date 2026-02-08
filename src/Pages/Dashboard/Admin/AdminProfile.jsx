import React, { useState, useEffect } from "react";
import UseAuth from "../../../hooks/UseAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import axios from "axios";

const AdminProfile = () => {
  const { user, refetchUser, loading } = UseAuth();
  const axiosSecure = useAxiosSecure();

  const [newPhoto, setNewPhoto] = useState(null);
  const [newName, setNewName] = useState("");
  const [ready, setReady] = useState(false);
  const [updating, setUpdating] = useState(false);

  
  const { data: profile, isLoading, refetch } = useQuery({
    queryKey: ["profile", user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  
  useEffect(() => {
    if (profile?.email) {
      setReady(true);
    }
  }, [profile]);

  if (loading || isLoading || !ready) {
    return <p className="text-center mt-6">Loading profile...</p>;
  }

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!profile?.email || updating) return;

    try {
      setUpdating(true);

      let photoURL = profile.photoURL;

      if (newPhoto) {
        const formData = new FormData();
        formData.append("image", newPhoto);

        const imgbbURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST}`;
        const res = await axios.post(imgbbURL, formData);
        photoURL = res.data.data.url;
      }

      const updateData = {
        displayName: newName || profile.displayName,
        photoURL,
      };

      await axiosSecure.patch(`/users/${profile.email}`, updateData);

      setNewPhoto(null);
      setNewName("");
      refetch();
      refetchUser?.();
      Swal.fire("Success", "Profile updated", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Update failed", "error");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded">
      <div className="flex items-center gap-4">
        <img
          src={newPhoto ? URL.createObjectURL(newPhoto) : profile.photoURL}
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-bold">{profile.displayName}</h2>
          <p>{profile.email}</p>
          <span className="badge badge-secondary mt-1">Admin</span>
        </div>
      </div>

      <form onSubmit={handleUpdate} className="mt-6 flex flex-col gap-2">
        <label className="label">Update Name</label>
        <input
          type="text"
          placeholder="New Name"
          className="input input-bordered w-full"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />

        <label className="label">Update Photo</label>
        <input
          type="file"
          accept="image/*"
          className="file-input w-full"
          onChange={(e) => setNewPhoto(e.target.files[0])}
        />

        <button
          type="submit"
          disabled={!ready || updating}
          className="btn btn-primary mt-3"
        >
          {updating ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default AdminProfile;
