import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import UseAuth from '../../../hooks/UseAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import IssueCard from './IssueCard';
import EditIssueModal from './EditIssueModal';

const MyIssues = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [editIssue, setEditIssue] = useState(null);


  const {
    data: issues = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['my-issues', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues?userEmail=${user.email}`);
      return res.data;
    },

  });


  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/issues/${user.email}/${id}`)
          .then((res) => {
            if (res.data.deletedCount === 1) {
              Swal.fire('Deleted!', 'Your issue has been deleted.', 'success');
              refetch(); // refetch issues after delete
            } else {
              Swal.fire('Error', 'Issue not found or already deleted', 'error');
            }
          })
          .catch(() => Swal.fire('Error', 'Failed to delete issue', 'error'));
      }
    });
  };

  const handleViewDetails = (id) => navigate(`/dashboard/issue-details/${id}`);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading issues.</p>;
  if (!issues.length) return <p>You have not created any issues</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Issues</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {issues.map((issue) => (
          <IssueCard
            key={issue._id}
            issue={issue}
            onEdit={setEditIssue}
            onDelete={handleDelete}
            onView={handleViewDetails}
          />
        ))}
      </div>

      {editIssue && (
        <EditIssueModal
          issue={editIssue}
          onClose={() => setEditIssue(null)}
          onUpdate={() => refetch()}
        />
      )}
    </div>
  );
};

export default MyIssues;
