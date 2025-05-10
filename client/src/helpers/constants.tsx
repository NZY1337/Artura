import { type Navigation } from '@toolpad/core/AppProvider';
import BarChartIcon from '@mui/icons-material/BarChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import UserIcon from '@mui/icons-material/Person';
import { DescriptionOutlined } from '@mui/icons-material';

// import goodPhoto1 from "../assets/guidelines/goodPhoto1.png"
// import goodPhoto2 from "../assets/guidelines/goodPhoto2.png"
// import goodPhoto3 from "../assets/guidelines/goodPhoto3.png"
// import goodPhoto4 from "../assets/guidelines/goodPhoto4.png"
// import badPhoto1 from "../assets/guidelines/badPhoto1.png"
// import badPhoto2 from "../assets/guidelines/badPhoto2.png"
// import badPhoto3 from "../assets/guidelines/badPhoto3.png"
// import badPhoto4 from "../assets/guidelines/badPhoto4.png"

import SofaIcon from "@mui/icons-material/Weekend";
import DeleteIcon from "@mui/icons-material/Delete";

const VIRTUAL_STAGING = {
    label: "Virtual Staging",
    segment: "virtual-staging"
}

const EMPTY_YOUR_SPACE = {
    label: "Empty Your Space",
    segment: "empty-your-space"
}

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
        title: 'Overview',
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
    solutions,
    EMPTY_YOUR_SPACE,
};