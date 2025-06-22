import {
    SpaceTypeProps,
    DesignThemeProps,
    OutputFormatProps,
    GeneratedImagesCountProps,
    SizeImageProps,
    QualityFormatProps,
    CategoryProps
} from "./index";

export interface AiBuilderStateProps {
    spaceType: SpaceTypeProps[];
    designTheme: DesignThemeProps[];
    output_format: OutputFormatProps;
    n: GeneratedImagesCountProps;
    category: CategoryProps[];
    size: SizeImageProps;
    prompt: string;
    quality: QualityFormatProps;
    images: string[{ file: File; preview: string }]
}

interface BuilderOptionsProps {
    builderState: AiBuilderStateProps;
    isLoading: boolean;
    setBuilderState: React.Dispatch<React.SetStateAction<BuilderState>>;
    onHandleSubmit: (stateBuilder: SubmitBuilderProps) => void;
}

export type SubmitBuilderProps = Pick<AiBuilderStateProps, "n" | "prompt" | "size" | "output_format" | "images" | "quality" | "category">

export interface AIBuilderProps {
    onHandleSubmit: (stateBuilder: SubmitBuilderProps) => void;
    isLoading: boolean
};

export type QualityAndSizeBuilderProps = Omit<BuilderOptionsProps, 'isLoading', 'onHandleSubmit'>;
export type SpaceTypesBuilderProps = QualityAndSizeBuilderProps;
export type DesignThemesBuilderProps = QualityAndSizeBuilderProps;
export type CategoriesBuilderProps = QualityAndSizeBuilderProps;
export type FileUploadProps = QualityAndSizeBuilderProps