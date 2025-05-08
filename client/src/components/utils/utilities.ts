// design theme options
interface Design {
    option: string; 
}

interface DesignTypeData {
    interior_themes: Design[],
    exterior_themes: Design[]
}

export interface DesignThemeInterface {
    status: string;
    data: DesignTypeData;
}

// space theme options
interface Space {
    option: string;
}

interface SpaceTypeData {
    interior_spaces: Space[];
    exterior_spaces: Space[];
}
 
export interface SpaceTypeInterface {
    status: string;
    data: SpaceTypeData;
}

export interface SpaceTypeProps {
    interior: { spaceTypeKeys: string[] | undefined; spaceTypeValues: string[] | undefined },
    exterior: { spaceTypeKeys: string[] | undefined; spaceTypeValues: string[] | undefined }
}

export interface DesignThemeProps {
    interior: { designThemeKeys: string[] | undefined; designThemeValues: string[] | undefined },
    exterior: { designThemeKeys: string[] | undefined; designThemeValues: string[] | undefined }  
}

export const mapSpaceOptions = (option: SpaceTypeInterface) => {
    if (!option?.data?.interior_spaces || !option?.data?.exterior_spaces) {
        return { interior: { spaceTypeKeys: [], spaceTypeValues: [] }, exterior: { spaceTypeKeys: [], spaceTypeValues: [] } };
    }

    const { data } = option;

    return {
        interior: {
            spaceTypeKeys: data.interior_spaces.map(item => Object.keys(item)[0]),
            spaceTypeValues: data.interior_spaces.map(item => Object.values(item)[0])
        },
        exterior: {
            spaceTypeKeys: data.exterior_spaces.map(item => Object.keys(item)[0]),
            spaceTypeValues: data.exterior_spaces.map(item => Object.values(item)[0])
        }
    } as SpaceTypeProps;
}

export const mapThemeOptions = (option: DesignThemeInterface) => {
    if (!option?.data?.interior_themes || !option?.data?.exterior_themes) {
        return { interior: { designThemeKeys: [], designThemeValues: [] }, exterior: { designThemeKeys: [], designThemeValues: [] } };
    }

    const { data } = option;

    return {
        interior: {
            designThemeKeys: data.interior_themes.map(item => Object.keys(item)[0]),
            designThemeValues: data.interior_themes.map(item => Object.values(item)[0])
        },
        exterior: {
            designThemeKeys: data.exterior_themes.map(item => Object.keys(item)[0]),
            designThemeValues: data.exterior_themes.map(item => Object.values(item)[0])
        }
    } as DesignThemeProps;
}
