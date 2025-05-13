
import { useState } from 'react';
import {
    QueryClient, useQuery, useMutation
} from '@tanstack/react-query';
import { Container } from '@mui/material';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Typography, Button, MenuItem, Select
} from '@mui/material';
import { getUsers, updateUserRole } from '../services/users';

export const queryClient = new QueryClient()

export const Example = () => {
    const [updatedRoles, setUpdatedRoles] = useState<{ [userId: string]: string }>({});

    const { isPending, error, data: users } = useQuery({
        queryKey: ['usersData'],
        queryFn: getUsers
    });

    const updateUserRoleMutation = useMutation({
        mutationFn: ({ userId, role }: { userId: string; role: any }) =>
            updateUserRole(userId, role),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['usersData'] }),
    });

    const handleRoleChange = (userId: string, newRole: string) => {
        setUpdatedRoles((prev) => ({
            ...prev,
            [userId]: newRole,
        }));
    };

    const handleUpdateRole = (userId: string) => {
        const newRole = updatedRoles[userId];
        if (!newRole) return;



        console.log(`Updated user ${userId} role to ${newRole}`);
    };

    console.log(users)
    if (isPending) return <Container>'Loading...'</Container>

    if (error) return <Container>{`An error has occurred: ${error.message}`}</Container>

    return (
        <Container>
            {/* <h1>{data.name}</h1>
            <p>{data.description}</p>
            <strong>👀 {data.subscribers_count}</strong>{' '}
            <strong>✨ {data.stargazers_count}</strong>{' '}
            <strong>🍴 {data.forks_count}</strong> */}
            <h1>Users</h1>

            <Button onClick={() => updateUserRoleMutation.mutate({ userId: 'user_2x2rSRi7O7ezLaqgnc5m2DQAgJn', role: 'user' })}>Updatge User Role</Button>

            <TableContainer component={Paper}>
                <Typography variant="h6" sx={{ p: 2 }}>Users</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Updated At</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user: any) => {
                            const selectedRole = updatedRoles[user.id] || user.role;
                            return (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
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
                                    <TableCell>{new Date(user.updatedAt).toLocaleString()}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            onClick={() => handleUpdateRole(user.id)}
                                            disabled={selectedRole === user.role}
                                        >
                                            Save
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}