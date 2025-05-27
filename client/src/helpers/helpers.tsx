import type { BuilderStateProps, LabelValueItemProps } from "../types";

const formatPrompt = (stateBuilder: BuilderStateProps) => {
    const { spaceType, designTheme, prompt } = stateBuilder;
    const prefixPrompt = `Generate a design for a ${spaceType} in a ${designTheme} style. the design should have: `;
    const finalPrompt = `${prefixPrompt}${prompt}`;

    return [finalPrompt, prefixPrompt];
}

export const extractLabelsAndValues = (items: LabelValueItemProps[]) => {
    const values = items.map(item => item.value);
    const labels = items.map(item => item.label);
    return { values, labels };
};


export { formatPrompt }