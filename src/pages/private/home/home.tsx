import { useAuth } from '@hooks/useAuth';

export function Home() {
  const { user } = useAuth();
  return <pre>{JSON.stringify(user, null, 2)}</pre>;
}
