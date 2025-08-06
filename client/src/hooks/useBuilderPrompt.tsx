import { useEffect, useState } from "react";
import { useNotifications } from '@toolpad/core';

import type { BuilderOptionsProps } from "../types";
import { CHARS_LIMIT } from "../helpers/constants";

const useBuilderPrompt = ({ builderState, setBuilderState, setCharCount }: 
    Pick<BuilderOptionsProps, 'builderState' | 'setBuilderState'> 
    & { setCharCount: React.Dispatch<React.SetStateAction<number>> }) => {

    const basePrompt = `A beautiful ${builderState.designTheme.toLowerCase().replace(/_/g, ' ')} ${builderState.spaceType.toLowerCase().replace(/_/g, ' ')} interior design`;
    const notifications = useNotifications();
    const [manualPrompt, setManualPrompt] = useState('');

    // the base prompt is set when the space type or design theme changes - but the prompt itself is not updated here
    useEffect(() => {
        console.log('basePrompt:', basePrompt);
        
        setBuilderState(prev => {
            return ({
                ...prev,
                prompt: prev.prompt === "" ? "" : basePrompt + manualPrompt,
            })
        });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [builderState.spaceType, builderState.designTheme]);

    const handlePillClick = (value: string) => {
        const currentLength = builderState.prompt.length;
        const newLength = currentLength + value.length + 2; // +2 for comma and space
        
        if (newLength > CHARS_LIMIT) {
            notifications.show('You have reached the 500 character limit.', {
                severity: 'warning',
                autoHideDuration: 2000,
            });
            return; 
        }

        setManualPrompt(prev => prev ? `${prev}, ${value}` : `, ${value}`);

        setBuilderState(prev => ({
            ...prev,
            prompt: `${prev.prompt === '' ? '' : prev.prompt + ', '}${value}`,
        }));

        setCharCount(prev => {
            const newCharCount = prev + value.length + 2;
            return newCharCount >= CHARS_LIMIT ? CHARS_LIMIT : newCharCount;
        });
    };

    const handleGenerateBaseDesign = () => {
        setManualPrompt('');
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