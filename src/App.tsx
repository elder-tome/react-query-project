import './App.css';
import type { TUser } from './@type/user';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
      <ReactQueryDevtools initialIsOpen={false} />
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
    <div className='h-svh flex items-center justify-center'>
      <div className="w-[1000px] border rounded-md p-2">
        <Table>
          <TableCaption>Lista de usuários</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead className="w-[130px]">Nome</TableHead>
              <TableHead>Bio</TableHead>
              <TableHead className="text-right">E-mail</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.bio}</TableCell>
                <TableCell className="text-right">{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div >
  );
};

export default App;
