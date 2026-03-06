import LoginModal from './Components/Modals/LoginModal';
import { useAuth } from './Hooks/useAuth';

function ProtectedPath({ children }) {
  const { user } = useAuth();
  return user ? children : <LoginModal />;
}

export default ProtectedPath;