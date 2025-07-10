import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DashboardIcon from '@mui/icons-material/Dashboard';
import UserIcon from '@mui/icons-material/Person';

// types
import type { Navigation } from '@toolpad/core/AppProvider';
import type { SpaceTypeProps, DesignThemeProps, CategoryProps, SizeImageProps, QualityFormatProps } from '../types';

const BACKEND_URL = "http://localhost:3010/api";

const EMPTY_YOUR_SPACE = {
    label: "Empty Your Space",
    segment: "empty-your-space"
}

const SPACE_TYPE = [
    { label: "Living room", value: "LIVING_ROOM" },
    { label: "Bedroom", value: "BEDROOM" },
    { label: "Kitchen", value: "KITCHEN" },
    { label: "Bathroom", value: "BATHROOM" },
    { label: "Dining room", value: "DINING_ROOM" },
    { label: "Home office", value: "HOME_OFFICE" },
    { label: "Kids room", value: "KIDS_ROOM" },
    { label: "Hallway / corridor", value: "HALLWAY_CORRIDOR" },
    { label: "Balcony / terrace", value: "BALCONY_TERRACE" },
    { label: "Game room", value: "GAME_ROOM" },
    { label: "Study", value: "STUDY" },
] satisfies Array<{ label: string; value: SpaceTypeProps }>;

const CATEGORY = [
    { label: "Design Generator", value: "DESIGN_GENERATOR" },
    { label: "Virtual Staging", value: "VIRTUAL_STAGING" },
    { label: "Landscaping", value: "LANDSCAPING" },
    { label: "Floor Planning", value: "FLOOR_PLANNING" },
] satisfies Array<{ label: string; value: CategoryProps }>;

const DESIGN_THEME = [
    { label: 'Modern', value: 'MODERN' },
    { label: 'Contemporary', value: 'CONTEMPORARY' },
    { label: 'Minimalist', value: 'MINIMALIST' },
    { label: 'Scandinavian', value: 'SCANDINAVIAN' },
    { label: 'Industrial', value: 'INDUSTRIAL' },
    { label: 'Mid-Century Modern', value: 'MID_CENTURY_MODERN' },
    { label: 'Traditional', value: 'TRADITIONAL' },
    { label: 'Classic', value: 'CLASSIC' },
    { label: 'Baroque', value: 'BAROQUE' },
    { label: 'Japanese Zen', value: 'JAPANESE_ZEN' },
    { label: 'Wabi-Sabi', value: 'WABI_SABI' },
    { label: 'Farmhouse', value: 'FARMHOUSE' },
    { label: 'Rustic', value: 'RUSTIC' },
    { label: 'Bohemian', value: 'BOHEMIAN' },
    { label: 'Art Deco', value: 'ART_DECO' },
    { label: 'Victorian', value: 'VICTORIAN' },
    { label: 'Coastal', value: 'COASTAL' },
    { label: 'Tropical', value: 'TROPICAL' },
    { label: 'Urban', value: 'URBAN' },
    { label: 'Maximalist', value: 'MAXIMALIST' },
    { label: 'Futuristic', value: 'FUTURISTIC' },
] satisfies Array<{ label: string; value: DesignThemeProps }>

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

const CHARS_LIMIT: number = 500;

const DASHBOARD_NAVIGATION: Navigation = [
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
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