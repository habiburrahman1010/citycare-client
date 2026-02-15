import React from "react";
import { FaStar } from "react-icons/fa";

const reviews = [
  {
    id: 1,
    name: "Alice Johnson",
    comment: "CityCare helped get a broken streetlight fixed quickly. Amazing service!",
    rating: 5,
    date: "Feb 10, 2026",
  },
  {
    id: 2,
    name: "Bob Smith",
    comment: "Very user-friendly platform. I could track the progress of my reported issue easily.",
    rating: 4,
    date: "Feb 12, 2026",
  },
  {
    id: 3,
    name: "Catherine Lee",
    comment: "Efficient and transparent! I feel like my concerns actually matter.",
    rating: 5,
    date: "Feb 08, 2026",
  },
  {
    id: 4,
    name: "David Kim",
    comment: "Resolved my water leakage complaint quickly. Highly recommended.",
    rating: 5,
    date: "Feb 09, 2026",
  },
  {
    id: 5,
    name: "Emma Wilson",
    comment: "Helpful platform, very responsive staff. Makes city management easier for everyone.",
    rating: 4,
    date: "Feb 11, 2026",
  },
  {
    id: 6,
    name: "Frank Turner",
    comment: "Simple, clean, and effective. CityCare is a must for every citizen!",
    rating: 5,
    date: "Feb 07, 2026",
  },
];

const Review = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold text-center mb-10 text-primary">
        User Reviews
      </h2>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="p-6 border rounded-lg shadow hover:shadow-lg transition"
          >
           
            <h3 className="font-bold text-lg mb-2 text-primary">{review.name}</h3>

           
            <div className="flex items-center mb-2 text-yellow-400">
              {Array.from({ length: review.rating }).map((_, idx) => (
                <FaStar key={idx} />
              ))}
            </div>

           
            <p className="text-gray-700 mb-2">{review.comment}</p>

           
            <p className="text-sm text-gray-400">{review.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;
