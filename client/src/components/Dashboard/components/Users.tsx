import { useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button, MenuItem, Select, Container
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getUsers, updateUserRole } from '../../../services/users';
import { queryClient } from '../../../context/TanstackQuery';


export const Users = () => {
    const [updatedRole, setUpdatedRole] = useState<{ [userId: string]: string }>({});

    const { isPending, error, data: users } = useQuery({
        queryKey: ['usersData'],
        queryFn: getUsers
    });

    const updateUserRoleMutation = useMutation({
        mutationFn: ({ userId, role }: { userId: string; role: any }) =>
            updateUserRole(userId, role),
        onMutate: async ({ userId, role }) => {
            await queryClient.cancelQueries({ queryKey: ['usersData'] });

            const previousUsers = queryClient.getQueryData(['usersData']);

            queryClient.setQueryData(['usersData'], (old: any) =>
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

    const handleRoleChange = (userId: string, newRole: string) => {
        setUpdatedRole((prev) => ({
            ...prev,
            [userId]: newRole,
        }));
    };

    if (isPending) return <Container>'Loading...'</Container>

    console.log({ user1: users[0].role, user2: users[1].role })
    if (error) return <Container>{`An error has occurred: ${error.message}`}</Container>

    return (
        <Container disableGutters={true}>
            {/* <Button onClick={() => updateUserRoleMutation.mutate({ userId: 'user_2x2rSRi7O7ezLaqgnc5m2DQAgJn', role: 'user' })}>Updatge User Role</Button> */}

            < TableContainer component={Paper} >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user: any) => {
                            const selectedRole = updatedRole[user.id] || user.role;
                            return (
                                <TableRow key={user.id}>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Select
                                            value={selectedRole}
                                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                            size="small"
                                        >
                                            <MenuItem value="user">User</MenuItem>
                                            <MenuItem value="admin">Admin</MenuItem>
                                        </Select>
                                    </TableCell>
                                    <TableCell>{new Date(user.createdAt).toLocaleString()}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            onClick={() => updateUserRoleMutation.mutate({ userId: user.id, role: selectedRole })}
                                            disabled={selectedRole === user.role}
                                            sx={{ mr: 1 }}
                                        >
                                            Update Role
                                        </Button>

                                        <Button
                                            variant="contained"
                                            size="small"
                                            onClick={() => { }}
                                            sx={{ mr: 1 }}
                                        >
                                            Delete
                                        </Button>

                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer >
        </Container >
    )
}