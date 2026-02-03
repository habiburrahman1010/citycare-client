
import React, { useState } from 'react';
import UseAuth from '../../../hooks/UseAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import axios from 'axios';
import { IoStar } from 'react-icons/io5';

const CitizenProfile = () => {
    const { user, refetchUser } = UseAuth();
    const axiosSecure = useAxiosSecure();
    const [newPhoto, setNewPhoto] = useState(null);
    const [newName, setNewName] = useState('');

    // Fetch user profile
    const { data: profile, isLoading, isError, refetch } = useQuery({
        queryKey: ['profile', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    if (isLoading) return <p>Loading profile...</p>;
    if (isError) return <p>Error loading profile.</p>;
    if (!profile) return <p>No profile found.</p>;

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            let photoURL = profile.photoURL;


            if (newPhoto) {
                const formData = new FormData();
                formData.append('image', newPhoto);

                const imgbbURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST}`;
                const res = await axios.post(imgbbURL, formData); // plain axios for external API
                photoURL = res.data.data.url; // get uploaded image URL
            }


            const updateData = {
                displayName: newName || profile.displayName,
                photoURL,
            };


            const updatedUser = await axiosSecure.patch(`/users/${user.email}`, updateData);

            Swal.fire('Success', 'Profile updated successfully', 'success');
            setNewPhoto(null);
            setNewName('');
            refetch();
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Failed to update profile', 'error');
        }
    };


    const handleSubscribe = async () => {
        try {
            const { data } = await axiosSecure.post('/premium-checkout-session', {
                email: user.email,
            });

            window.location.href = data.url;
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Failed to initiate payment', 'error');
        }
    };




    return (
        <div className="p-6 max-w-md mx-auto bg-white shadow rounded">
            <div className="flex items-center gap-4">
                <img src={profile.photoURL} alt="Profile" className="w-16 h-16 rounded-full" />
                <div>
                    <h2 className="text-xl font-bold flex items-center gap-4">

                        {profile.displayName} {profile.isPremium && <span className="text-yellow-500 font-bold"><IoStar />
                        </span>}
                    </h2>
                    <p>{profile.email}</p>
                </div>
            </div>

            {profile.isBlocked && (
                <p className="text-red-500 mt-4 font-semibold">
                    Your account is blocked. Contact the authorities.
                </p>
            )}

            {!profile.isPremium && !profile.isBlocked && (

                <button className="btn btn-primary mt-4 w-full " onClick={handleSubscribe}>Subscribe for 1000tk</button>
            )}

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
                    onChange={(e) => setNewPhoto(e.target.files[0])}
                />

                <button type="submit" className="btn btn-primary mt-2">
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default CitizenProfile;
