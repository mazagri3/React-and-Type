// Created by Obi Mazagri
// This component displays an error message when a route is not found

import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="error-page">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Return to Home</Link>
    </div>
  );
};

export default ErrorPage; 