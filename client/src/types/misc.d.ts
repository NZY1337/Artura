import { DesignThemeProps, SpaceTypeProps } from "./builder";

export type LabelValueItemProps = {
    label: string;
    value: string;
};

export interface NativeSelectProps {
    optionLabels: DesignThemeProps[] | SpaceTypeProps[] | CategoriesProps[];
    labels: DesignThemeProps[] | SpaceTypeProps[] | CategoriesProps[];
    labelName: string;
    name: string;
    setBuilderState: React.Dispatch<React.SetStateAction<BuilderState>>;
}

export type SpaceTypeProps = 'Living Room' | 'Bedroom' | 'Kitchen' | 'Bathroom' | 'Dining Room' |
    'Home Office' | 'Kids Room' | 'Hallway / Corridor' |
    'Balcony / Terrace' | 'Game Room' | 'Study';

export type CategoriesProps = 'Design Generator' | 'Landscaping' | 'Virtual Staging' | 'Floor Planning'

export type DesignThemeProps = | 'Modern' | 'Contemporary' | 'Minimalist' | 'Scandinavian' | 'Industrial'
    | 'Mid-Century Modern' | 'Traditional' | 'Classic' | 'Baroque' | 'Japanese Zen' | 'Wabi-Sabi' | 'Farmhouse'
    | 'Rustic' | 'Bohemian' | 'Art Deco' | 'Victorian' | 'Coastal' | 'Tropical' | 'Urban' | 'Maximalist' | 'Futuristic';

export type OutputFormatProps = 'png' | 'jpeg' | 'webp';
export type QualityFormatProps = 'high' | 'medium' | 'low';
export type SizeImageProps = "1024x1024" | "1024x1536" | "1536x1024" | "auto";
export type GeneratedImagesCountProps = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;