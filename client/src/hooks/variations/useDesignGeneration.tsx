import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { designGenerator } from '../../services/builder';
import type { ProjectResponseProps } from '../../types';
import { useNotifications } from '@toolpad/core';


const useDesignGeneration = () => {
    const notifications = useNotifications();
    const [data, setData] = useState<ProjectResponseProps | null>(null);
    const { isPending, mutate, } = useMutation({
        mutationFn: designGenerator,
        onSuccess: (data: ProjectResponseProps) => {
            setData(data);
        },
        onError: (error) => {
            notifications.show(error.message, {
                severity: 'error',
                autoHideDuration: 3000
            })
        }
    });

    return { isPending, data, mutate };
}

export default useDesignGeneration