import React, { useState } from 'react';
import UseAuth from '../../../hooks/UseAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import axios from 'axios';

const StaffProfile = () => {
    const { user, refetchUser } = UseAuth();
    const axiosSecure = useAxiosSecure();
    const [newPhoto, setNewPhoto] = useState(null);
    const [newName, setNewName] = useState('');

    
    const { data: profile, isLoading, isError, refetch } = useQuery({
        queryKey: ['staffProfile', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    if (isLoading) return <p><span className="loading loading-spinner loading-xl"></span></p>;
    if (isError) return <p><span className="loading loading-spinner loading-xl"></span></p>;
    if (!profile) return <p>No profile found.</p>;

   
    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
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

            const res = await axiosSecure.patch(`/users/${user.email}`, updateData);

            if (res.data) {
                Swal.fire("Success", "Profile updated successfully", "success");
                setNewPhoto(null);
                setNewName("");
                refetch();
                refetchUser?.(); 
            }
        } catch (error) {
            console.error("Update error:", error);
            Swal.fire(
                "Error",
                error.response?.data?.message || "Failed to update profile",
                "error"
            );
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
                    <span className="badge badge-secondary mt-1">Staff</span>
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
                    className="file-input w-full"
                    accept="image/*"
                    onChange={(e) => setNewPhoto(e.target.files[0])}
                />

                <button type="submit" className="btn btn-primary mt-2">
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default StaffProfile;
