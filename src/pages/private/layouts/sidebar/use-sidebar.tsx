import { useNavigate } from 'react-router-dom';

import { useAuth } from '@hooks/useAuth';

export function useSidebar() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { redirect } = signOut();

  function handleLogout() {
    if (redirect) {
      navigate(redirect);
    }
  }
  return {
    handleLogout,
  };
}
