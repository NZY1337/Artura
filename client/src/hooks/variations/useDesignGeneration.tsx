import { useMutation, useQueryClient } from '@tanstack/react-query';
import { designGenerator } from '../../services/builder';
import { useNotifications } from '@toolpad/core';

const useDesignGeneration = () => {
    const notifications = useNotifications();
    const { isPending, mutate } = useMutation({
        mutationFn: designGenerator,
        onError: (error) => {
            notifications.show(error.message, {
                severity: 'error',
                autoHideDuration: 3000
            })
        }
    });

    return { isPending, mutate };
}

export default useDesignGeneration