import { BACKEND_URL } from '../../helpers/constants';

import type { EditableProjectProps } from '../../types';

export const designGenerator = async (project: EditableProjectProps) => {
    // Use JSON for design generator since no file uploads are needed
    const requestBody = {
        prompt: project.prompt,
        size: project.size,
        outputFormat: project.outputFormat,
        n: String(project.n),
        quality: String(project.quality),
        category: String(project.category),
        spaceType: String(project.spaceType),
        designTheme: String(project.designTheme),
    };

    const response = await fetch(BACKEND_URL + '/project/design-generator', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    });

    // error from errorMiddleware - result from the backend res.send({result: project })
    const { error, result } = await response.json();
    if (result) return result;
    if (error) throw new Error(error || 'Failed to generate design');
};

export const designEditor = async (project: EditableProjectProps) => {
    const formData = new FormData();
    formData.append('prompt', project.prompt);
    formData.append('size', project.size);
    formData.append('outputFormat', project.outputFormat);
    formData.append('n', String(project.n));
    formData.append('quality', String(project.quality));
    formData.append('category', String(project.category));
    formData.append('spaceType', String(project.spaceType));
    formData.append('designTheme', String(project.designTheme));

    // File uploads are required for editor endpoint
    if (!project.images || project.images.length === 0) {
        throw new Error('Images are required for design editing');
    }

    project.images.forEach((image) => {
        console.log(image);
        if ('file' in image && image.file) {
            formData.append('images', image.file);
        } else {
            throw new Error('All images must have valid file objects for editing');
        }
    });

    const response = await fetch(BACKEND_URL + '/project/design-editor', {
        method: 'POST',
        credentials: 'include',
        body: formData,
    });

    // error from errorMiddleware - result from the backend res.send({result: project })
    const { error, result } = await response.json();
    if (result) return result;

    if (error) throw new Error(error || 'Failed to edit design');
};

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