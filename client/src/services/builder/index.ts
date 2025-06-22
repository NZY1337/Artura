import { BACKEND_URL } from '../../helpers/constants';

import type { SubmitBuilderProps } from '../../types';

export const designGenerator = async (project: SubmitBuilderProps) => {
    const formData = new FormData();
    formData.append('prompt', project.prompt);
    formData.append('size', project.size);
    formData.append('output_format', project.output_format);
    formData.append('n', String(project.n));
    formData.append('quality', String(project.quality));
    formData.append('category', String(project.category));

    console.log(project.images)
    project.images.forEach(({ file }: { file: File }) => {
        formData.append('images', file);
    });

    const response = await fetch(BACKEND_URL + '/project/design-generator/upload', {
        method: 'POST',
        credentials: 'include',
        body: formData,
    });

    // error from errorMiddleware - result from the backend res.send({result: project })
    const { error, result } = await response.json();
    console.log(result);
    if (result) return result;

    if (error) throw new Error(error || 'Failed to generate design');
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