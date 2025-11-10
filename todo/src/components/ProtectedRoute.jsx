
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/useUser';

export default function ProtectedRoute({ children }) {
  const { user } = useUser();

  // If user is null (not logged in), redirect to the login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user is logged in, render the child component (the App/task list)
  return children;
}