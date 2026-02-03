import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import UseAuth from '../../../hooks/UseAuth';
import IssueCard from './IssueCard';
import EditIssueModal from './EditIssueModal';
import { useNavigate } from 'react-router';


const MyIssues = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editIssue, setEditIssue] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    axiosSecure.get(`/issues?userEmail=${user.email}`)
      .then(res => setIssues(res.data))
      .catch(error => Swal.fire('Error', 'Failed to load your issues', 'error'))
      .finally(() => setLoading(false));
  }, [user, axiosSecure]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/issues/${user.email}/${id}`)
          .then(res => {
            if (res.data.deletedCount === 1) {
              setIssues(prev => prev.filter(issue => issue._id !== id));
              Swal.fire('Deleted!', 'Your issue has been deleted.', 'success');
            } else {
              Swal.fire('Error', 'Issue not found or already deleted', 'error');
            }
          })
          .catch(() => Swal.fire('Error', 'Failed to delete issue', 'error'));
      }
    });
  };


  const handleViewDetails = (id) => navigate(`/dashboard/issue-details/${id}`);

  if (loading) return <p>Loading...</p>;
  if (!issues.length) return <p>You have not created any issues</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Issues</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {issues.map(issue => (
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
          onUpdate={(updatedIssue) =>
            setIssues(prev => prev.map(i => i._id === updatedIssue._id ? updatedIssue : i))
          }
        />
      )}
    </div>
  );
};

export default MyIssues;
