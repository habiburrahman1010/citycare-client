import React from "react";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center">
      {/* Title */}
      <h2 className="text-5xl font-extrabold text-primary mb-6">
        About CityCare
      </h2>

      {/* Paragraph */}
      <p className="text-lg text-gray-700 leading-relaxed">
        CityCare is a citizen-centric platform that empowers people to report, track, and resolve urban issues efficiently. 
        Our mission is to make cities cleaner, safer, and better managed by bridging the gap between citizens and local authorities. 
        With CityCare, every concern matters, and every solution counts.
      </p>
    </div>
  );
};

export default About;
