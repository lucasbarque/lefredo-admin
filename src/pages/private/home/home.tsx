import { useNavigate } from 'react-router-dom';

import { useAuth } from '@hooks/useAuth';

export function Home() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    const { redirect } = signOut();
    if (redirect) {
      navigate(redirect);
    }
  }

  return (
    <div className='flex flex-col'>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <button className='cursor-pointer' onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
