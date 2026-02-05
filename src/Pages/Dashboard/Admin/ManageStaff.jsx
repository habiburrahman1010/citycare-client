import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageStaff = () => {
    const axiosSecure = useAxiosSecure();
    const [editingStaff, setEditingStaff] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [imageUploading, setImageUploading] = useState(false);

    const { data: staffList = [], isLoading, refetch } = useQuery({
        queryKey: ["staff"],
        queryFn: async () => {
            const res = await axiosSecure.get("/staff");
            return res.data;
        },
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // -----------------------------
    // Upload image to ImageBB
    // -----------------------------
    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append("image", file);


        setImageUploading(true);
        try {
            const res = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST}`, {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            setImageUploading(false);
            return data.data.url;
        } catch (err) {
            setImageUploading(false);
            console.error(err);
            Swal.fire("Error", "Failed to upload image", "error");
            return "";
        }
    };

    // -----------------------------
    // Add / Update Staff
    // -----------------------------
    const onSubmit = async (data) => {
        try {
            // Upload image if selected
            let photoURL = editingStaff?.photoURL || "";
            if (data.photo && data.photo[0]) {
                photoURL = await uploadImage(data.photo[0]);
            }

            // Create a simple object to send to backend
            const staffData = {
                name: data.name,
                phone: data.phone || "",
                photoURL,
            };

            // Include email & password only when adding a new staff
            if (!editingStaff) {
                staffData.email = data.email;
                staffData.password = data.password;
            }

            // Send to backend
            if (editingStaff) {
                await axiosSecure.patch(`/staff/${editingStaff._id}`, staffData);
                Swal.fire("Updated!", "Staff updated successfully", "success");
            } else {
                await axiosSecure.post("/staff", staffData);
                Swal.fire("Added!", "Staff added successfully", "success");
            }

            // Reset form & close modal
            reset();
            setEditingStaff(null);
            setModalOpen(false);
            refetch();
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Failed to add/update staff", "error");
        }
    };



    if (isLoading)
        return <span className="loading loading-spinner loading-lg"></span>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Manage Staff</h2>

            <button
                className="btn btn-primary mb-4"
                onClick={() => setModalOpen(true)}
            >
                Add Staff
            </button>

            <table className="table w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {staffList.map((staff, i) => (
                        <tr key={staff._id}>
                            <td>{i + 1}</td>
                            <td>
                                {staff.photoURL ? (
                                    <img src={staff.photoURL} alt={staff.name} className="w-12 h-12 rounded-full" />
                                ) : (
                                    "N/A"
                                )}
                            </td>
                            <td>{staff.name}</td>
                            <td>{staff.email}</td>
                            <td>{staff.phone || "N/A"}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-warning mr-2"
                                    onClick={() => {
                                        setEditingStaff(staff);
                                        setModalOpen(true);
                                        reset(staff);
                                    }}
                                >
                                    Update
                                </button>
                                <button
                                    className="btn btn-sm btn-error"
                                    onClick={() => {
                                        Swal.fire({
                                            title: `Delete ${staff.name}?`,
                                            text: "This action cannot be undone.",
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonText: "Delete",
                                        }).then(async (result) => {
                                            if (result.isConfirmed) {
                                                await axiosSecure.delete(`/staff/${staff._id}`);
                                                refetch();
                                                Swal.fire("Deleted!", "Staff removed successfully.", "success");
                                            }
                                        });
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {modalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-2">
                            {editingStaff ? "Update Staff" : "Add Staff"}
                        </h3>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                            <input
                                type="text"
                                placeholder="Name"
                                className="input input-bordered w-full"
                                {...register("name", { required: "Name is required" })}
                            />
                            {errors.name && <span className="text-red-500">{errors.name.message}</span>}

                            <input
                                type="email"
                                placeholder="Email"
                                className="input input-bordered w-full"
                                {...register("email", { required: "Email is required" })}
                                disabled={!!editingStaff}
                            />

                            {errors.email && <span className="text-red-500">{errors.email.message}</span>}

                            {!editingStaff && (
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="input input-bordered w-full"
                                    {...register("password", { required: "Password is required" })}
                                />
                            )}
                            {errors.password && <span className="text-red-500">{errors.password.message}</span>}

                            <input
                                type="text"
                                placeholder="Phone"
                                className="input input-bordered w-full"
                                {...register("phone")}
                            />

                            <input
                                type="file"
                                className="file-input file-input-bordered w-full"
                                {...register("photo")}
                                accept="image/*"
                            />

                            {imageUploading && <p>Uploading image...</p>}

                            <div className="modal-action">
                                <button type="submit" className="btn btn-primary">
                                    {editingStaff ? "Update" : "Add"}
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => {
                                        setModalOpen(false);
                                        setEditingStaff(null);
                                        reset();
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageStaff;
