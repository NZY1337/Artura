import { BACKEND_URL } from '../../helpers/constants';

const getUsers = async () => {
    const response = await fetch(BACKEND_URL + '/users');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

const updateUserRole = async (userId: string, role: string) => {
    const response = await fetch(BACKEND_URL + '/users/' + userId + '/metadata', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role, userId }),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

export { getUsers, updateUserRole };