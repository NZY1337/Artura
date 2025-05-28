import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { designGenerator } from '../../services/builder';
import type { ProjectResponseProps } from '../../types';
import { useNotifications } from '@toolpad/core';


const useDesignGeneration = ({ closeWaitingModal }: { closeWaitingModal: () => void }) => {
    const notifications = useNotifications();
    const [data, setData] = useState<ProjectResponseProps | null>(null);
    const { isPending, mutate, } = useMutation({
        mutationFn: designGenerator,
        onSuccess: (data: ProjectResponseProps) => {
            setData(data);
            closeWaitingModal();
        },
        onError: (error) => {
            notifications.show(error.message, {
                severity: 'error',
                autoHideDuration: 3000
            })
            closeWaitingModal();
        }
    });

    return { isPending, data, mutate };
}

export default useDesignGeneration