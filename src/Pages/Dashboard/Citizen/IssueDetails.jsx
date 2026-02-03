import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const IssueDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure.get(`/issues/${id}`)
      .then(res => setIssue(res.data))
      .catch(() => Swal.fire('Error', 'Failed to load issue', 'error'))
      .finally(() => setLoading(false));
  }, [id, axiosSecure]);

  if (loading) return <p>Loading...</p>;
  if (!issue) return <p>No issue found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-100 shadow rounded">
      <img
        src={issue.image}
        alt={issue.title}
        className="w-full h-72 object-cover rounded"
      />

      <h2 className="text-3xl font-bold mt-4">{issue.title}</h2>
      <p className="mt-2 text-gray-600">{issue.description}</p>

      <div className="mt-4 space-y-2">
        <p><strong>Status:</strong> {issue.status}</p>
        <p><strong>Priority:</strong> {issue.priority}</p>
        <p><strong>Category:</strong> {issue.category}</p>
        <p><strong>Location:</strong> {issue.location}</p>
        <p><strong>Upvotes:</strong> {issue.upvoteCount}</p>
        <p><strong>Created:</strong> {new Date(issue.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default IssueDetails;
