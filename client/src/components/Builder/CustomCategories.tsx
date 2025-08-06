import { Box, Chip } from '@mui/material';

type DesignFeature = 
    | 'NATURAL_LIGHTING'
    | 'LARGE_WINDOWS'
    | 'HIGH_CEILINGS'
    | 'HARDWOOD_FLOORS'
    | 'MARBLE_COUNTERTOPS'
    | 'BUILT_IN_STORAGE'
    | 'STATEMENT_LIGHTING'
    | 'COZY_ATMOSPHERE'
    | 'OPEN_FLOOR_PLAN'
    | 'NEUTRAL_COLOR_PALETTE'
    | 'TEXTURED_WALLS'
    | 'INDOOR_PLANTS'
    | 'ARCHITECTURAL_DETAILS'
    | 'LUXURY_FINISHES';

interface CustomCategoriesProps {
    onPillClick: (value: string) => void;
}

const designFeatures: DesignFeature[] = [
    'NATURAL_LIGHTING', 'LARGE_WINDOWS', 'HIGH_CEILINGS', 'HARDWOOD_FLOORS',
    'MARBLE_COUNTERTOPS', 'BUILT_IN_STORAGE', 'STATEMENT_LIGHTING', 'COZY_ATMOSPHERE',
    'OPEN_FLOOR_PLAN', 'NEUTRAL_COLOR_PALETTE', 'TEXTURED_WALLS', 'INDOOR_PLANTS',
    'ARCHITECTURAL_DETAILS', 'LUXURY_FINISHES'
];

const allPills = [...designFeatures];
const formatLabel = (value: string): string => {
    return value.toLowerCase().replace(/_/g, ' ').replace(/\b\w/g, l => l.toLocaleLowerCase());
};

const CustomCategories = ({ onPillClick }: CustomCategoriesProps) => {
    return (
        <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 4}}>
                {allPills.map((theme) => (
                    <Chip
                        key={theme}
                        label={`+ ${formatLabel(theme)}`}
                        onClick={() => onPillClick(formatLabel(theme))}
                        variant="outlined"
                        clickable
                        sx={{
                            fontSize: '0.75rem',
                            '&:hover': {
                                backgroundColor: 'primary.main',
                                color: 'orange',
                            },
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default CustomCategories;