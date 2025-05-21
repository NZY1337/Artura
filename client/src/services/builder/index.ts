import { BACKEND_URL } from '../../helpers/constants';

export const createProject = async (data: unknown) => {
    const response = await fetch(BACKEND_URL + '/project', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}