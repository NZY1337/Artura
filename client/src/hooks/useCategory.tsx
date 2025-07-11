import { useQuery } from '@tanstack/react-query';
import { getProjects } from '../services/builder';

const useCategory = () => {
  const { data, isPending, error} = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });
 
  return {data, isPending, error}; 
};

export default useCategory;
