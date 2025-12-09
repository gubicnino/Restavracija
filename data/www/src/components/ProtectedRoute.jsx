import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function ProtectedRoute({ children, requiredRoles = [] }) {
    const { isLoggedIn, currentUser } = useUser();

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRoles.length > 0 && !requiredRoles.includes(currentUser?.vloga)) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black-rich via-gray-900 to-black-rich flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-playfair text-white mb-4">Nimate dostopa</h1>
                    <p className="text-gray-400">Nimate ustreznih pravic za ogled te strani.</p>
                </div>
            </div>
        );
    }

    return children;
}