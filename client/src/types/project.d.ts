import type { CategoryProps, DesignThemeProps, SpaceTypeProps, SizeImageProps, QualityFormatProps, OutputFormatProps, GeneratedImagesCountProps } from "./misc";

// interface ApiResponse<T> {
//     result: T;
// }

interface ImageProps {
    url: string;
    id: string;
    createdAt: string;
    projectId: string;
}

interface PreviewImageProps {
    file: File;
    preview: string
}

export interface ProjectProps {
    id: string;
    userId: string;
    category: CategoryProps;
    createdAt: string;
    updatedAt: string;
    prompt: string;
    background: string;
    images: (ImageProps | PreviewImageProps);
    outputFormat: OutputFormatProps;
    quality: QualityFormatProps;
    size: string;
    designTheme: DesignThemeProps;
    spaceType: SpaceTypeProps;
    n: GeneratedImagesCountProps;
}

// EditableProjectProps
export type EditableProjectProps = Omit<ProjectProps, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'background'> &
    Partial<Pick<ProjectProps, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'background'>>;

export interface ImageGenerationResponseProps {
    id: string;
    projectId: string;
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

export type GridCell = null | { loading: true } | ProjectProps

