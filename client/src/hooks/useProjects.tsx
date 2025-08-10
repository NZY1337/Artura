import { useQuery } from '@tanstack/react-query';
import { getProjects } from '../services/builder';

const useProjects = () => {
    const { data, isPending, error } = useQuery({
        queryKey: ['projects'],
        queryFn: getProjects,
    });

    return { data, isPending, error };
};

export default useProjects;
