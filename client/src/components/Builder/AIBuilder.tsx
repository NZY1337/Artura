// hooks
import { useState } from "react";
import useBuilderPrompt from "../../hooks/useBuilderPrompt";

// components
import BuilderOptions from "./BuilderOptions";
import BuilderOptionsPreview from "./BuilderOptionsPreview";
import CustomCategories from "./CustomCategories";
import UploadedImagesGallery from "./UploadedImagesGallery";

// types
import type { EditableProjectProps } from "../../types";
import type { Dispatch, SetStateAction } from "react";

export interface AIBuilderProps {
    isLoading: boolean;
    builderState: EditableProjectProps;
    setBuilderState: Dispatch<SetStateAction<EditableProjectProps>>;
    onHandleSubmit: (stateBuilder: EditableProjectProps) => void;
};

const AIBuilder = ({ onHandleSubmit, isLoading, builderState, setBuilderState }: AIBuilderProps) => {
    const [charCount, setCharCount] = useState<number>(0);

    const { handleClickCategory, handleGenerateBaseDesign, handlePromptChange } = useBuilderPrompt({
        builderState,
        setBuilderState,
        setCharCount,
    });

    const handleRemoveImage = (index: number) => {
        const newImages = [...builderState.images];
        newImages.splice(index, 1);
        setBuilderState({ ...builderState, images: newImages });
    };

    return (
        <>
            {builderState.images.length > 0 ? <UploadedImagesGallery images={builderState.images} onRemove={handleRemoveImage} /> : null}
            <BuilderOptions
                builderState={builderState}
                isLoading={isLoading}
                charCount={charCount}
                handleGenerateBaseDesign={handleGenerateBaseDesign}
                onHandleSubmit={onHandleSubmit}
                setBuilderState={setBuilderState}
                handlePromptChange={handlePromptChange}
            />
            <BuilderOptionsPreview builderState={builderState} />
            <CustomCategories onPillClick={handleClickCategory} />
        </>
    );
};

export default AIBuilder;



