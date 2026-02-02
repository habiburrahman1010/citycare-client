import React from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../../../hooks/UseAuth';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const CreateIssue = () => {
    const { register, handleSubmit, reset } = useForm();
    const { user } = UseAuth();
    const navigate = useNavigate()

    const handleCreateIssue = (data) => {
        const imageFile = data.image[0];

        const formData = new FormData();
        formData.append('image', imageFile);

        const imageApi = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST}`;


        axios.post(imageApi, formData)
            .then(imgRes => {
                const imageUrl = imgRes.data.data.url;


                const issue = {
                    title: data.title,
                    description: data.description,
                    category: data.category,
                    location: data.location,
                    image: imageUrl,
                    status: 'pending',
                    priority: 'normal',
                    upvoteCount: 0,
                    upvotedBy: [],
                    userEmail: user?.email,
                    createdAt: new Date(),
                };


                return axios.post('http://localhost:3000/issues', issue);
            })
            .then(() => {

                navigate('/dashboard/my-issue');

                Swal.fire({
                    icon: 'success',
                    title: 'Issue Created Successfully!',
                    timer: 1500,
                    showConfirmButton: false,
                });

                reset();
            })
            .catch(error => {
                console.error(error);

                Swal.fire('Error', 'go for premium', 'error');
            });
    };


    return (
        <div className="max-w-xl mx-auto p-6 bg-base-200 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Create Issue</h2>

            <form onSubmit={handleSubmit(handleCreateIssue)} className="space-y-4">
                <input
                    {...register('title', { required: true })}
                    placeholder="Issue Title"
                    className="input input-bordered w-full"
                />

                <textarea
                    {...register('description', { required: true })}
                    placeholder="Description"
                    className="textarea textarea-bordered w-full"
                />

                <select
                    {...register('category', { required: true })}
                    className="select select-bordered w-full"
                >
                    <option value="">Select Category</option>
                    <option value="Road">Road</option>
                    <option value="Water">Water</option>
                    <option value="Electricity">Electricity</option>
                    <option value="Garbage">Garbage</option>
                </select>

                <input
                    {...register('location', { required: true })}
                    placeholder="Location"
                    className="input input-bordered w-full"
                />

                <input
                    type="file"
                    {...register('image', { required: true })}
                    className="file-input file-input-bordered w-full"
                />

                <button className="btn btn-primary w-full">Submit Issue</button>
            </form>
        </div>
    );
};

export default CreateIssue;
