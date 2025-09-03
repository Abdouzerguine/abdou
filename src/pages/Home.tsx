import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Welcome to Our Platform
        </h1>
        <p className="text-lg text-gray-600">
          This is the home page. Content will be added here.
        </p>
      </div>
    </div>
  );
};

export default Home;