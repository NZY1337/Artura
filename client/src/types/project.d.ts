interface ProjectImageProps {
    url: string;
    createdAt: string;
    projectId: string;
    id: string;
}

export interface ProjectProps {
    images: ProjectImageProps[];
    category: string;
    createdAt: string;
    title: string;
    description: string;
}

export interface RenderLatestProjectsProps {
    project: ProjectProps
    index: number;
    handleOpenModal: () => void;
    handleSetCurrentIndex: (index: number) => void;
}
