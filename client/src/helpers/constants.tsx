import { type Navigation } from '@toolpad/core/AppProvider';
import BarChartIcon from '@mui/icons-material/BarChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
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

import type { SpaceTypeProps, DesignThemeProps } from '../types';
const BACKEND_URL = "http://localhost:3010/api";

const EMPTY_YOUR_SPACE = {
    label: "Empty Your Space",
    segment: "empty-your-space"
}

const SPACE_TYPE: SpaceTypeProps[] = [
    'Living Room',
    'Bedroom',
    'Kitchen',
    'Bathroom',
    'Dining Room',
    'Home Office',
    'Kids Room',
    'Hallway / Corridor',
    'Balcony / Terrace',
    'Game Room',
    'Study',
];

const DESIGN_THEME: DesignThemeProps[] = [
    'Modern',
    'Contemporary',
    'Minimalist',
    'Scandinavian',
    'Industrial',
    'Mid-Century Modern',
    'Traditional',
    'Classic',
    'Baroque',
    'Japanese Zen',
    'Wabi-Sabi',
    'Farmhouse',
    'Rustic',
    'Bohemian',
    'Art Deco',
    'Victorian',
    'Coastal',
    'Tropical',
    'Urban',
    'Maximalist',
    'Futuristic'
];


// const REDESIGN_FURNISHED_ROOMS_LABEL = "Redesign Furnished Rooms";
// const RENDER_EXTERIOR_STRUCTURES_LABEL = "Render Exterior Structures";

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
        segment: 'dashboard/design-generator',
        title: 'Design Generator',
        icon: <ShoppingCartIcon />,
    },
    {
        segment: 'dashboard/virtual-staging',
        title: 'Virtual Staging',
        icon: <ShoppingCartIcon />,
    },
    {
        segment: 'dashboard/landscaping',
        title: 'Landscaping',
        icon: <BarChartIcon />,
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

// // Example data arrays
// const badPhotosData = [
//     {
//       label: "People in the photo",
//       src: badPhoto1
//     },
//     {
//       label: "Close-up shots",
//       src: badPhoto2
//     },
//     {
//       label: "Tilted angles",
//       src: badPhoto3
//     },
//     {
//       label: "Floor plans",
//       src: badPhoto4
//     }
// ];

//   const goodPhotosData = [
//     {
//       label: "Wide angle photo",
//       src: goodPhoto1
//     },
//     {
//       label: "Straightened photo",
//       src: goodPhoto2
//     },
//     {
//       label: "Good resolution",
//       src: goodPhoto3
//     },
//     {
//       label: "Better depth",
//       src: goodPhoto4
//     }
// ];

const builderHouseAngle = ["side of house", "front of house", "back of house"];
const builderModeOptions = ["Beautiful Redesign", "Minimalist", "Luxury"];
const builderModeStyle = ["Modern", "Traditional", "Contemporary"];
const builderNumberOfDesigns = [1, 2, 3, 4];
const builderAiIntervention = [1, 2, 3, 4];

const BUILDER_SIZES = [
    { value: '1024x1024', label: 'Square (1024×1024)' },
    { value: '1024x1536', label: 'Portrait (1024×1536)' },
    { value: '1536x1024', label: 'Landscape (1536x1024)' },
    { value: 'auto', label: 'Auto (let AI decide)' },
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

const BUILDER_QUALITIES = [
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
];

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
    EMPTY_YOUR_SPACE,
    BUILDER_SIZES,
    BUILDER_QUALITIES,
    DASHBOARD_NAV_BACKGROUND, CHARS_LIMIT
};