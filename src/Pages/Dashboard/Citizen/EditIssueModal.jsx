import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import UseAuth from '../../../hooks/UseAuth';

const EditIssueModal = ({ issue, onClose, onUpdate }) => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit, reset } = useForm();

  
  useEffect(() => {
    if (issue) {
      reset({
        title: issue.title || '',
        description: issue.description || '',
        category: issue.category || '',
        location: issue.location || '',
      });
    }
  }, [issue, reset]);

  const onSubmit = (data) => {
    axiosSecure
      .patch(`/issues/${user.email}/${issue._id}`, data)
      .then(res => {
        Swal.fire('Success', 'Issue updated successfully', 'success');
        onUpdate(res.data); 
        onClose();           
      })
      .catch(() => {
        Swal.fire('Error', 'Failed to update', 'error');
      });
  };

  return (
    <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-xl">
        <h3 className="text-xl font-bold mb-4">Edit Issue</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <input
            {...register('title')}
            placeholder="Title"
            className="input input-bordered w-full"
          />

          <input
            {...register('description')}
            placeholder="Description"
            className="input input-bordered w-full"
          />

          <input
            {...register('category')}
            placeholder="Category"
            className="input input-bordered w-full"
          />

          <input
            {...register('location')}
            placeholder="Location"
            className="input input-bordered w-full"
          />

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-sm btn-outline"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-sm btn-primary"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditIssueModal;
