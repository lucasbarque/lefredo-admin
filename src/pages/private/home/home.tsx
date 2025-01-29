import { useAuth } from '@hooks/useAuth';

export function Home() {
  const { user } = useAuth();

  return (
    <div className='flex flex-col'>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
