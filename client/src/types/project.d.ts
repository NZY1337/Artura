interface ApiResponse<T> {
    result: T;
}

interface ProjectImageProps {
    url: string;
    createdAt: string;
    projectId: string;
    id: string;
    projectId: string;
}

export interface ProjectResponseProps {
    images: ProjectImageProps[];
    category: string;
    createdAt: string;
    updatedAt: string;
    prompt: string;
    size: string;
    quality: string;
    id: string;
    userId: string
}

export interface RenderLatestProjectsProps {
    project: ProjectResponseProps
    index: number;
    handleOpenModal: () => void;
    handleSetCurrentIndex: (index: number) => void;
}

export type ProjectResponseProps = ApiResponse<{
    project: ProjectResponseProps;
    images: ProjectImageProps[];
}>;
