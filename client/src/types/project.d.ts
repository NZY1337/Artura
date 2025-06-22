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

export interface ProjectProps {
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

export interface ImageGenerationResponseProps {
    id: string;
    projectId: string;
    background: string;
    outputFormat: string;
    quality: string;
    size: string;
    inputTokens: number;
    imageTokens: number;
    textTokens: number;
    outputTokens: number;
    totalTokens: number;
    imageCost: number;
    tokenCost: number;
    totalCost: number;
    createdAt: string;
    updatedAt: string;
}

export interface RenderLatestProjectsProps {
    project: ProjectProps
    index: number;
    handleOpenModal: () => void;
    handleSetCurrentIndex: (index: number) => void;
}

export type ProjectResponseProps = {
    project: ProjectProps;
    images: ProjectImageProps[];
    imageGenerationResponse: ImageGenerationResponseProps
};

export type GridCell = null | { loading: true } | ProjectProps;

