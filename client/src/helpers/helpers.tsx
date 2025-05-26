import type { BuilderStateProps } from "../types";

const formatPrompt = (stateBuilder: BuilderStateProps) => {
    const { spaceType, designTheme, prompt } = stateBuilder;
    const prefixPrompt = `Generate a design for a ${spaceType} in a ${designTheme} style. the design should have: `;
    const finalPrompt = `${prefixPrompt}${prompt}`;

    return finalPrompt
}

export { formatPrompt }