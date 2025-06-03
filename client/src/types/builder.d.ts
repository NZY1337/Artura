import {
    SpaceTypeProps,
    DesignThemeProps,
    OutputFormatProps,
    GeneratedImagesCountProps,
    SizeImageProps,
    QualityFormatProps,
    CategoriesProps
} from "./index";

export interface AiBuilderStateProps {
    spaceType: SpaceTypeProps;
    designTheme: DesignThemeProps;
    output_format: OutputFormatProps;
    n: GeneratedImagesCountProps;
    categories: CategoriesProps;
    size: SizeImageProps;
    prompt: string;
    quality: QualityFormatProps;
}

// interface BuilderStateProp {
//     size: string;
//     quality: string;
//     [key: string]: any;
// }

interface BuilderOptionsProps {
    builderState: AiBuilderStateProps;
    isLoading: boolean;
    setBuilderState: React.Dispatch<React.SetStateAction<BuilderState>>;
    onHandleSubmit: (stateBuilder: SubmitBuilderProps) => void;
}

export type SubmitBuilderProps = Pick<AiBuilderStateProps, "n" | "prompt" | "size" | "output_format">

export interface AIBuilderProps {
    onHandleSubmit: (stateBuilder: SubmitBuilderProps) => void;
    generatedPreview: string | undefined;
    isLoading: boolean
};

export type QualityAndSizeBuilderProps = Omit<BuilderOptionsProps, 'isLoading', 'onHandleSubmit'>;
export type SpaceTypesBuilderProps = QualityAndSizeBuilderProps;
export type DesignThemesBuilderProps = QualityAndSizeBuilderProps;
export type CategoriesBuilderProps = QualityAndSizeBuilderProps;