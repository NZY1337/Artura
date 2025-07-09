import { type Navigation } from '@toolpad/core/AppProvider';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DashboardIcon from '@mui/icons-material/Dashboard';
import UserIcon from '@mui/icons-material/Person';
// import SofaIcon from "@mui/icons-material/Weekend";
// import DeleteIcon from "@mui/icons-material/Delete";
// import goodPhoto1 from "../assets/guidelines/goodPhoto1.png"
// import goodPhoto2 from "../assets/guidelines/goodPhoto2.png"
// import goodPhoto3 from "../assets/guidelines/goodPhoto3.png"
// import goodPhoto4 from "../assets/guidelines/goodPhoto4.png"
// import badPhoto1 from "../assets/guidelines/badPhoto1.png"
// import badPhoto2 from "../assets/guidelines/badPhoto2.png"
// import badPhoto3 from "../assets/guidelines/badPhoto3.png"
// import badPhoto4 from "../assets/guidelines/badPhoto4.png"

import type { SpaceTypeProps, DesignThemeProps, CategoryProps, SizeImageProps, QualityFormatProps } from '../types';
const BACKEND_URL = "http://localhost:3010/api";

const EMPTY_YOUR_SPACE = {
    label: "Empty Your Space",
    segment: "empty-your-space"
}

const SPACE_TYPE: Record<string, SpaceTypeProps> = {
    "Living Room": "LIVING_ROOM",
    "Bedroom": "BEDROOM",
    "Kitchen": "KITCHEN",
    "Bathroom": "BATHROOM",
    "Dining Room": "DINING_ROOM",
    "Home Office": "HOME_OFFICE",
    "Kids Room": "KIDS_ROOM",
    "Hallway / Corridor": "HALLWAY_CORRIDOR",
    "Balcony / Terrace": "BALCONY_TERRACE",
    "Game Room": "GAME_ROOM",
    "Study": "STUDY"
};

const CATEGORY: Record<string, CategoryProps> = {
    'Design Generator': 'DESIGN_GENERATOR',
    'Virtual Staging': 'VIRTUAL_STAGING',
    'Landscaping': 'LANDSCAPING',
    'Floor Planning': 'FLOOR_PLANNING',
};

const DESIGN_THEME: Record<string, DesignThemeProps> = {
    'Modern': 'MODERN',
    'Contemporary': 'CONTEMPORARY',
    'Minimalist': 'MINIMALIST',
    'Scandinavian': 'SCANDINAVIAN',
    'Industrial': 'INDUSTRIAL',
    'Mid-Century Modern': 'MID_CENTURY_MODERN',
    'Traditional': 'TRADITIONAL',
    'Classic': 'CLASSIC',
    'Baroque': 'BAROQUE',
    'Japanese Zen': 'JAPANESE_ZEN',
    'Wabi-Sabi': 'WABI_SABI',
    'Farmhouse': 'FARMHOUSE',
    'Rustic': 'RUSTIC',
    'Bohemian': 'BOHEMIAN',
    'Art Deco': 'ART_DECO',
    'Victorian': 'VICTORIAN',
    'Coastal': 'COASTAL',
    'Tropical': 'TROPICAL',
    'Urban': 'URBAN',
    'Maximalist': 'MAXIMALIST',
    'Futuristic': 'FUTURISTIC',
};

const BUILDER_SIZES: { value: SizeImageProps; label: string }[] = [
    { value: 'SIZE_1024x1024', label: 'Square (1024×1024)' },
    { value: 'SIZE_1024x1536', label: 'Portrait (1024×1536)' },
    { value: 'SIZE_1536x1024', label: 'Landscape (1536x1024)' },
    { value: 'AUTO', label: 'Auto (let AI decide)' },
];

const BUILDER_QUALITIES: { value: QualityFormatProps; label: string }[] = [
    { value: 'HIGH', label: 'High' },
    { value: 'MEDIUM', label: 'Medium' },
    { value: 'LOW', label: 'Low' },
];

const ROTATION: number[] = [90, 180, 270, 360];
const CHARS_LIMIT: number = 500;
const DASHBOARD_NAVIGATION: Navigation = [
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
        // children: [
        //     {
        //         segment: 'overview',  // 👈 Add an empty segment to allow navigating back to /builder
        //         title: 'Overview',
        //         icon: <DashboardIcon />,
        //     },
        //     {
        //         segment: EMPTY_YOUR_SPACE.segment,
        //         title: EMPTY_YOUR_SPACE.label,
        //         icon: <DescriptionOutlined />,
        //     },
        //     {
        //         segment: VIRTUAL_STAGING.segment,
        //         title: VIRTUAL_STAGING.label,
        //         icon: <DescriptionOutlined />,
        //     },
        // ],
    },
    {
        segment: 'dashboard/playground',
        title: 'Playground',
        icon: <AutoAwesomeIcon />,
    },
    {
        segment: 'dashboard/profile',
        title: 'Profile',
        icon: <UserIcon />,
    },
    {
        segment: 'dashboard/users',
        title: 'Users',
        icon: <UserIcon />,
    },
];




const builderHouseAngle = ["side of house", "front of house", "back of house"];
const builderModeOptions = ["Beautiful Redesign", "Minimalist", "Luxury"];
const builderModeStyle = ["Modern", "Traditional", "Contemporary"];
const builderNumberOfDesigns = [1, 2, 3, 4];
const builderAiIntervention = [1, 2, 3, 4];






const DASHBOARD_NAV_BACKGROUND = {
    dark: {
        backgroundColor: '#e5e5f7',
        backgroundImage: `repeating-radial-gradient(circle at 0 0, transparent 0, #212121 150px), repeating-linear-gradient(#212121, #000000)`
    },
    light: {
        backgroundColor: '#e5e5f7',
        backgroundImage: `repeating-radial-gradient(circle at 0 0, transparent 0, #efefef 150px), repeating-linear-gradient(#ffffff, #ffffff)`
    },
    setBackgroundNav: function (mode: "light" | "dark") {
        return this[mode];
    },
}



export {
    DASHBOARD_NAVIGATION,
    ROTATION,
    builderAiIntervention,
    builderModeOptions,
    builderHouseAngle,
    builderModeStyle,
    builderNumberOfDesigns,
    // goodPhotosData,
    // badPhotosData,
    BACKEND_URL,
    SPACE_TYPE,
    DESIGN_THEME,
    CATEGORY,
    EMPTY_YOUR_SPACE,
    BUILDER_SIZES,
    BUILDER_QUALITIES,
    DASHBOARD_NAV_BACKGROUND,
    CHARS_LIMIT
};