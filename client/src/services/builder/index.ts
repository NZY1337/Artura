import { BACKEND_URL } from '../../helpers/constants';

export const designGenerator = async (data: unknown) => {
    const response = await fetch(BACKEND_URL + '/project/design-generator', {
        method: 'POST',
        credentials: 'include',
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

export const getProjects = async () => {
    const response = await fetch(BACKEND_URL + '/project', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}