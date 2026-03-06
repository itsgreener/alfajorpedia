import { useAuth } from './Hooks/useAuth';
import LoginModal from './Components/LoginModal.jsx';

function ProtectedPath({ children }) {
  const { user } = useAuth();
  return user ? children : <LoginModal />;
}

export default ProtectedPath;