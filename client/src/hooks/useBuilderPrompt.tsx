import { useEffect } from "react";
import type { BuilderOptionsProps } from "../types";

const useBuilderPrompt = ({ builderState, setBuilderState }: Pick<BuilderOptionsProps, 'builderState' | 'setBuilderState'>) => {
    const basePrompt = `A beautiful ${builderState.designTheme.toLowerCase().replace(/_/g, ' ')} ${builderState.spaceType.toLowerCase().replace(/_/g, ' ')} interior design`;

    useEffect(() => {
        setBuilderState(prev => ({
            ...prev,
            prompt: prev.prompt === "" ? "":  basePrompt,
        }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [builderState.spaceType, builderState.designTheme]);

    const handlePillClick = (value: string) => {
        setBuilderState(prev => ({
            ...prev,
            prompt: `${prev.prompt === '' ? '' : prev.prompt + ', '}${value}`,
        }));
    };

    const handleGenerateBaseDesign = () => {
        setBuilderState((prev: typeof builderState) => ({
            ...prev,
            prompt: basePrompt,
        }));
    };

    return { 
        handlePillClick, 
        handleGenerateBaseDesign 
    };
}

export default useBuilderPrompt;