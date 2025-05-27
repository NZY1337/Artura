import {
    SpaceTypeProps,
    DesignThemeProps,
    OutputFormatProps,
    GeneratedImagesCountProps,
    SizeImageProps,
    QualityFormatProps
} from "./index";

export interface AiBuilderStateProps {
    spaceType: SpaceTypesProps[];
    designTheme: DesignThemeProps[];
    output_format: OutputFormatProps;
    n: GeneratedImagesCountProps;
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
}

export type SubmitBuilderProps = Pick<AiBuilderStateProps, "n" | "prompt" | "size" | "output_format">

export interface AIBuilderProps {
    onHandleSubmit: (event: React.FormEvent<HTMLFormElement>, stateBuilder: SubmitBuilderProps) => void;
    generatedPreview: string | undefined;
    isLoading: boolean
};

export type QualityAndSizeBuilderProps = Omit<BuilderOptionsProps, 'isLoading'>;
export type SpaceTypesBuilderProps = QualityAndSizeBuilderProps;
export type DesignThemesBuilderProps = QualityAndSizeBuilderProps;