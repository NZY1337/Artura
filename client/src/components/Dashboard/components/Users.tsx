import { useState } from 'react';
import { Button, MenuItem, Select, Container, Box, Typography, Stack } from '@mui/material';
import { toast } from 'react-toastify';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getUsers, updateUserRole, deleteUser } from '../../../services/users';
import { queryClient } from '../../../context/TanstackQuery';
import GenericDialog from '../../UtilityComponents/modals/GenericDialog';
import { DataGrid } from '@mui/x-data-grid';

export const Users = () => {
    const [updatedRole, setUpdatedRole] = useState<{ [userId: string]: string }>({});
    const [open, setOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

    const columns = [
        { field: 'username', headerName: 'Username', width: 130 },
        { field: 'email', headerName: 'Email', width: 250 },
        {
            field: 'role', headerName: 'Role', width: 150, sortable: false, renderCell: (params: any) => {
                const selectedRole = updatedRole[params.row.id] || params.row.role;

                return (
                    <Box>
                        <Select
                            value={selectedRole}
                            onChange={(e) => handleRoleChange(params.row.id, e.target.value)}
                            size="small"
                        >
                            <MenuItem value="user">User</MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                        </Select>
                    </Box>
                )
            }
        },
        {
            field: 'createdAt',
            headerName: 'Created At',
            width: 180,
            valueFormatter: (date: any) => new Date(date).toLocaleString(),
        },
        {
            field: 'updatedAt',
            headerName: 'Updated At',
            width: 180,
            valueFormatter: (date: any) => new Date(date).toLocaleString(),
        },
        {
            field: 'actions', headerName: 'Actions', width: 200, sortable: false, renderCell: (params: any) => {
                const user = params.row;
                const selectedRole = updatedRole[user.id] || user.role;

                return (
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Button
                            variant="text"
                            size="small"
                            onClick={() => updateUserRoleMutation.mutate({ userId: user.id, role: selectedRole })}
                            disabled={selectedRole === user.role}
                            sx={{ mr: 1, color: 'secondary' }}
                        >
                            Update Role
                        </Button>

                        <Button
                            variant="text"
                            size="small"
                            onClick={() => {
                                setOpen(true);
                                setSelectedUserId(params.row.id);
                            }}
                            sx={{ mr: 1 }}
                        >
                            Delete
                        </Button>
                    </Box>
                );
            },
        },
    ];

    const { isPending, error, data: users } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers
    });

    const updateUserRoleMutation = useMutation({
        mutationFn: ({ userId, role }: { userId: string; role: any }) => updateUserRole(userId, role),
        onMutate: async ({ userId, role }: { userId: string; role: any }) => {
            await queryClient.cancelQueries({ queryKey: ['users'] });

            const previousUsers = queryClient.getQueryData(['users']);

            queryClient.setQueryData(['users'], (old: any) =>
                old.map((user: any) =>
                    user.id === userId ? { ...user, role } : user
                )
            );

            return { previousUsers };
        },
        onSuccess: (_data, variables) => {
            toast('Role changed to ' + variables.role);
        }
    });

    // now i can i delete user with tanstack query
    const deleteUserMutation = useMutation({
        mutationFn: (userId: string) => deleteUser(userId), // Call the deleteUser function
        onMutate: async (userId: string) => {
            await queryClient.cancelQueries({ queryKey: ['users'] });

            const previousUsers = queryClient.getQueryData(['users']);

            // Optimistically update the cache
            queryClient.setQueryData(['users'], (old: any) =>
                old.filter((user: any) => user.id !== userId)
            );

            return { previousUsers };
        },

        onError: (error, userId, context: any) => {
            queryClient.setQueryData(['users'], context.previousUsers);
            setSelectedUserId(null);
            setOpen(false);
            toast.error(error.message);
        },
        onSuccess: () => {
            setSelectedUserId(null);
            setOpen(false);
            toast.success('User deleted successfully.');
        },

    });

    const handleRoleChange = (userId: string, newRole: string) => {
        setUpdatedRole((prev) => ({
            ...prev,
            [userId]: newRole,
        }));
    };

    if (isPending) return <Container>'Loading...'</Container>

    if (error) return <Container>{`An error has occurred: ${error.message}`}</Container>

    return (
        <Container disableGutters={true}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <DataGrid sx={{
                    '& .MuiDataGrid-cell': {
                        display: 'flex', // Make all cells flex containers
                        alignItems: 'center', // Vertically center content
                    },
                }} columns={columns} rows={users || []} />
            </div>

            <GenericDialog open={open} onClose={() => setOpen(false)}>
                <>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        Are you sure you want to delete this user?
                    </Typography>
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" color="error" onClick={() => deleteUserMutation.mutate(selectedUserId!)}>
                            Yes
                        </Button>
                        <Button variant="outlined" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                    </Stack>
                </>
            </GenericDialog>
        </Container >
    )
}
