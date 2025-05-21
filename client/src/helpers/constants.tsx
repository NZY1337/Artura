import { type Navigation } from '@toolpad/core/AppProvider';
import BarChartIcon from '@mui/icons-material/BarChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import UserIcon from '@mui/icons-material/Person';
import SofaIcon from "@mui/icons-material/Weekend";
import DeleteIcon from "@mui/icons-material/Delete";

// import goodPhoto1 from "../assets/guidelines/goodPhoto1.png"
// import goodPhoto2 from "../assets/guidelines/goodPhoto2.png"
// import goodPhoto3 from "../assets/guidelines/goodPhoto3.png"
// import goodPhoto4 from "../assets/guidelines/goodPhoto4.png"
// import badPhoto1 from "../assets/guidelines/badPhoto1.png"
// import badPhoto2 from "../assets/guidelines/badPhoto2.png"
// import badPhoto3 from "../assets/guidelines/badPhoto3.png"
// import badPhoto4 from "../assets/guidelines/badPhoto4.png"

const BACKEND_URL = "http://localhost:3010/api";

const VIRTUAL_STAGING = {
    label: "Virtual Staging",
    segment: "virtual-staging"
}

const EMPTY_YOUR_SPACE = {
    label: "Empty Your Space",
    segment: "empty-your-space"
}

const SPACE_TYPES = [
    { value: 'ST_livingRoom', label: 'Living Room' },
    { value: 'ST_bedroom', label: 'Bedroom' },
    { value: 'ST_kitchen', label: 'Kitchen' },
    { value: 'ST_bathroom', label: 'Bathroom' },
    { value: 'ST_diningRoom', label: 'Dining Room' },
    { value: 'ST_homeOffice', label: 'Home Office' },
    { value: 'ST_kidsRoom', label: 'Kids Room' },
    { value: 'ST_hallway', label: 'Hallway / Corridor' },
    { value: 'ST_balcony', label: 'Balcony / Terrace' },
    { value: 'ST_gameRoom', label: 'Game Room' },
    { value: 'ST_study', label: 'Study' },
];

const DESIGN_THEMES = [
    { value: 'DT_modern', label: 'Modern' },
    { value: 'DT_contemporary', label: 'Contemporary' },
    { value: 'DT_minimalist', label: 'Minimalist' },
    { value: 'DT_scandinavian', label: 'Scandinavian' },
    { value: 'DT_industrial', label: 'Industrial' },
    { value: 'DT_midCentury', label: 'Mid-Century Modern' },
    { value: 'DT_traditional', label: 'Traditional' },
    { value: 'DT_classic', label: 'Classic' },
    { value: 'DT_baroque', label: 'Baroque' },
    { value: 'DT_japanese', label: 'Japanese Zen' },
    { value: 'DT_wabiSabi', label: 'Wabi-Sabi' },
    { value: 'DT_farmhouse', label: 'Farmhouse' },
    { value: 'DT_rustic', label: 'Rustic' },
    { value: 'DT_bohemian', label: 'Bohemian' },
    { value: 'DT_artDeco', label: 'Art Deco' },
    { value: 'DT_victorian', label: 'Victorian' },
    { value: 'DT_coastal', label: 'Coastal' },
    { value: 'DT_tropical', label: 'Tropical' },
    { value: 'DT_urban', label: 'Urban' },
    { value: 'DT_maximalist', label: 'Maximalist' },
    { value: 'DT_futuristic', label: 'Futuristic' },
];

// const REDESIGN_FURNISHED_ROOMS_LABEL = "Redesign Furnished Rooms";
// const RENDER_EXTERIOR_STRUCTURES_LABEL = "Render Exterior Structures";

const ROTATION = [90, 180, 270, 360];

const solutions = [
    { label: EMPTY_YOUR_SPACE.label, segment: EMPTY_YOUR_SPACE.segment, selected: true, icon: <DeleteIcon /> },
    { label: VIRTUAL_STAGING.label, segment: VIRTUAL_STAGING.segment, icon: <SofaIcon /> },
    // { label: REDESIGN_FURNISHED_ROOMS_LABEL, icon: <ChairIcon /> },
    // { label: LANDSCAPING_LABEL, icon: <ParkIcon /> },
    // { label: RENDER_EXTERIOR_STRUCTURES_LABEL, icon: <HomeIcon /> },
];

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
    SPACE_TYPES,
    DESIGN_THEMES,
    solutions,
    EMPTY_YOUR_SPACE,
};