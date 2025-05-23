import { getProjects } from "../services/builder";
import { useQuery } from '@tanstack/react-query';


const useCategory = () => {
    const { isPending, data, error } = useQuery({
        queryKey: ['projects'],
        queryFn: getProjects
    });

    return { isPending, data, error }
}

export default useCategory