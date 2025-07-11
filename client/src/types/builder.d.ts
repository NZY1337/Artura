import {
    EditableProjectProps,
    type ProjectApiProps
} from "./index";

interface BuilderOptionsProps {
    builderState: EditableProjectProps;
    isLoading: boolean;
    setBuilderState: React.Dispatch<React.SetStateAction<EditableProjectProps>>;
    onHandleSubmit: (stateBuilder: EditableProjectProps) => void;
}

export type SubmitBuilderProps = Pick<ProjectApiProps, "n" | "prompt" | "size" | "output_format" | "images" | "quality" | "category">

export type QualityAndSizeBuilderProps = Omit<BuilderOptionsProps, 'isLoading', 'onHandleSubmit'>;
export type SpaceTypesBuilderProps = QualityAndSizeBuilderProps;
export type DesignThemesBuilderProps = QualityAndSizeBuilderProps;
export type CategoriesBuilderProps = QualityAndSizeBuilderProps;
export type FileUploadProps = QualityAndSizeBuilderProps