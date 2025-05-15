import './App.css';
import type { TUser } from './@type/user';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
};

function Home() {
  const fetchData = async () => {
    const response = await fetch('http://localhost:3001/users');
    return response.json();
  };

  const { data, isPending, isError, error } = useQuery<TUser[]>({
    queryKey: ['users'],
    queryFn: fetchData
  });

  if (isError) {
    console.error(error);
    return <span>{error.message}</span>;
  }

  if (isPending) {
    return <span>Carregando...</span>;
  }

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {data?.map(user => (
          <li key={user.id}>
            <strong>{user.name}</strong>
            <p>{user.bio}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
