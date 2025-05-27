import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { designGenerator } from '../../services/builder';
import type { ProjectResponseProps } from '../../types';
import { toast } from 'react-toastify';


const useDesignGeneration = ({ closeWaitingModal }: { closeWaitingModal: () => void }) => {
    const [data, setData] = useState<ProjectResponseProps | null>(null);
    console.log(data)
    const { isPending, mutate, } = useMutation({
        mutationFn: designGenerator,
        onSuccess: (data: ProjectResponseProps) => {
            setData(data);
            closeWaitingModal();
        },
        onError: (error) => {
            toast.error(error.message)
            closeWaitingModal();
        }
    });

    return { isPending, data, mutate };
}

export default useDesignGeneration