
export type SpaceTypeProps = typeof SPACE_TYPES[number]['value'];
export type DesignThemeProps = typeof DESIGN_THEMES[number]['value'];
export type OutputFormatProps = 'png' | 'jpeg' | 'webp';
export type SizeImageProps = "1024x1024" | "1024x1536" | "1536x1024" | "auto";
export type GeneratedImagesCountProps = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface BuilderStateProps {
    spaceType: SpaceTypeProps;
    designTheme: DesignTheme;
    output_format: OutputFormat;
    n: GeneratedImagesCountProps;
    size: string;
    prompt: string;
}

export type SubmitBuilderProps = Pick<BuilderStateProps, "n" | "prompt" | "size" | "output_format">

export interface AIBuilderProps {
    onHandleSubmit: (event: React.FormEvent<HTMLFormElement>, stateBuilder: SubmitBuilderProps) => void;
    generatedPreview: string | undefined;
    isLoading: boolean
};
