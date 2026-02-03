import React from 'react';

const IssueCard = ({ issue, onEdit, onDelete, onView }) => {
  return (
    <div className="card shadow-lg p-4 bg-base-100 relative">
      <img
        src={issue.image}
        alt={issue.title}
        className="w-full h-48 object-cover rounded"
      />
      <h3 className="text-xl font-semibold mt-2">{issue.title}</h3>
      <p className="text-gray-600">{issue.description}</p>
      <p className="mt-1"><strong>Status:</strong> {issue.status}</p>
      <p><strong>Priority:</strong> {issue.priority}</p>
      <p>Category: {issue.category}</p>
      <p>Created At: {new Date(issue.createdAt).toLocaleString()}</p>
      <p>issue id :{issue._id}</p>

      <div className="mt-4 flex gap-2">
        {issue.status === 'pending' && (
          <button
            onClick={() => onEdit(issue)}
            className="btn btn-sm btn-warning"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => onDelete(issue._id)}
          className="btn btn-sm btn-error"
        >
          Delete
        </button>
        <button
          onClick={() => onView(issue._id)}
          className="btn btn-sm btn-primary"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default IssueCard;
