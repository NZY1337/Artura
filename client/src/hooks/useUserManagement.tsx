import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getUsers, updateUserRole, deleteUser } from '../services/users'; // adjust import path

import type { UserProps } from '../types'; // adjust import path

export const useUsersManagement = ({
    onUserDeleted = () => { },
    onDeleteModalClose = () => { },
}: {
    onUserDeleted?: () => void;
    onDeleteModalClose?: () => void;
} = {}) => {
    const queryClient = useQueryClient();

    const { isPending, error, data: users, } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
    });

    const updateUserRoleMutation = useMutation({
        mutationFn: ({ userId, role }: { userId: UserProps['id']; role: UserProps['role'] }) =>
            updateUserRole(userId, role),

        onMutate: async ({ userId, role }) => {
            await queryClient.cancelQueries({ queryKey: ['users'] });

            const previousUsers = queryClient.getQueryData<UserProps[]>(['users']);

            queryClient.setQueryData(['users'], (old: UserProps[]) =>
                old.map((user: UserProps) =>
                    user.id === userId ? { ...user, role } : user
                ) || []
            );

            return { previousUsers };
        },

        onSuccess: (_data, variables) => {
            toast('Role changed to ' + variables.role);
        },
    });

    const deleteUserMutation = useMutation({
        mutationFn: (userId: string) => deleteUser(userId),

        onMutate: async (userId: string) => {
            await queryClient.cancelQueries({ queryKey: ['users'] });

            const previousUsers = queryClient.getQueryData<UserProps[]>(['users']);

            queryClient.setQueryData(['users'], (old: UserProps[]) =>
                old.filter((user: UserProps) => user.id !== userId)
            );

            return { previousUsers: previousUsers || [] };
        },

        onError: (error, _, context?: { previousUsers: UserProps[] }) => {
            if (context && context.previousUsers) {
                queryClient.setQueryData(['users'], context.previousUsers);
            }
            onDeleteModalClose();
            toast.error(error.message);
        },

        onSuccess: () => {
            onUserDeleted();
            onDeleteModalClose();
            toast.success('User deleted successfully.');
        },
    });

    return {
        users,
        isPending,
        error,
        updateUserRoleMutation,
        deleteUserMutation,
    };
};
