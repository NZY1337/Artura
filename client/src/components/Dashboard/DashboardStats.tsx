import { useMemo, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import ButtonBase from '@mui/material/ButtonBase';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import fallbackImg from '../../assets/artura.png';
import useProjects from '../../hooks/useProjects';

// types
import type { SelectChangeEvent } from '@mui/material/Select';
import type { ProjectProps, ImageGenerationResponseProps, Image } from '../../types/project.d.ts';


interface ProjectWithResponse extends ProjectProps {
    response?: ImageGenerationResponseProps;
}

function formatCurrency(value: number) {
    return value.toLocaleString(undefined, { style: 'currency', currency: 'USD' });
}

export default function DashboardStats() {
    const { data, isPending, error } = useProjects();
    const [query, setQuery] = useState('');
    const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'costDesc' | 'costAsc'>('newest');
    const [designType, setDesignType] = useState<'DESIGN_GENERATOR' | 'DESIGN_EDITOR' | 'GENERATED_OR_EDITED'>('GENERATED_OR_EDITED');
    const projectsAll = useMemo(() => (data?.projects as ProjectWithResponse[]) ?? [], [data?.projects]);

    const stats = useMemo(() => {
        let totalImageCost = 0;
        let totalTokenCost = 0;
        let totalCost = 0;
        
        for (const p of projectsAll) {
            const resp = p.response;
            if (resp) {
                totalImageCost += Number(resp.imageCost || 0);
                totalTokenCost += Number(resp.tokenCost || 0);
                totalCost += Number(resp.totalCost || 0);
            }
        }
        
        return { totalProjects: projectsAll.length, totalImageCost, totalTokenCost, totalCost };
    }, [projectsAll]);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();

        let list = projectsAll.filter((p: ProjectWithResponse) => {
            const prompt = p.prompt ?? '';
            return q === '' || prompt.toLowerCase().includes(q);
        });

        list = list.filter((p: ProjectWithResponse) => {
            if (designType === 'GENERATED_OR_EDITED') return p;
            return p.category === designType;
        });

        list.sort((a: ProjectWithResponse, b: ProjectWithResponse) => {
            const aResp = a.response;
            const bResp = b.response;
            const aCost = Number(aResp?.totalCost || 0);
            const bCost = Number(bResp?.totalCost || 0);
            
            if (sortBy === 'newest') return new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime();
            if (sortBy === 'oldest') return new Date(a.createdAt ?? 0).getTime() - new Date(b.createdAt ?? 0).getTime();
            if (sortBy === 'costDesc') return bCost - aCost;
            if (sortBy === 'costAsc') return aCost - bCost;
            return 0;
        });
        
        return list;
    }, [projectsAll, query, sortBy, designType]);

    const getThumb = (p: ProjectWithResponse) => {
        const images = p?.images as Image[] | undefined;
        const firstImage = images?.[0];
        if (firstImage && 'url' in firstImage) {
            return firstImage.url;
        }
        return fallbackImg;
    };

    const handleSortChange = (event: SelectChangeEvent<string>) => {
        setSortBy(event.target.value as 'newest' | 'oldest' | 'costDesc' | 'costAsc');
    };

    if (isPending) return <Container><Typography>Loading stats...</Typography></Container>;
    if (error) return <Container><Typography color="error">Failed to load projects</Typography></Container>;

    return (
        <Container>
            <Typography variant="h4" mb={2}>Statistics</Typography>

            <Box display="flex" alignItems="center" mb={3}>
                <Box flex={1}>
                    <Box display="flex" gap={2} alignItems="center">
                        <TextField size="small" placeholder="Search prompts" value={query} onChange={(e) => setQuery(e.target.value)} />
                        <Select size="small" value={sortBy} onChange={handleSortChange}>
                            <MenuItem value="newest">Newest</MenuItem>
                            <MenuItem value="oldest">Oldest</MenuItem>
                            <MenuItem value="costDesc">Cost (high → low)</MenuItem>
                            <MenuItem value="costAsc">Cost (low → high)</MenuItem>
                        </Select>
                        <Select size="small" value={designType} onChange={(e) => setDesignType(e.target.value as 'DESIGN_GENERATOR' | 'DESIGN_EDITOR' | 'GENERATED_OR_EDITED')}>
                            <MenuItem value="GENERATED_OR_EDITED">Generated Or Edited</MenuItem>
                            <MenuItem value="DESIGN_GENERATOR">Generated</MenuItem>
                            <MenuItem value="DESIGN_EDITOR">Edited</MenuItem>
                        </Select>
                        <IconButton onClick={() => window.location.reload()}><RefreshIcon /></IconButton>
                    </Box>
                    

                    <Box mt={2}>
                        <Typography variant="subtitle2">Total projects: {stats.totalProjects}</Typography>
                        <Typography variant="body2">Images cost: {formatCurrency(stats.totalImageCost)} · Token cost: {formatCurrency(stats.totalTokenCost)} · Grand total: {formatCurrency(stats.totalCost)}</Typography>
                    </Box>
                </Box>
            </Box>

            <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, mb: 3 }}>
                <Card>
                    <CardContent>
                        <Typography variant="subtitle2">Total Projects</Typography>
                        <Typography variant="h5">{stats.totalProjects}</Typography>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Typography variant="subtitle2">Total Image Cost</Typography>
                        <Typography variant="h5">{formatCurrency(stats.totalImageCost)}</Typography>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Typography variant="subtitle2">Total Token Cost</Typography>
                        <Typography variant="h5">{formatCurrency(stats.totalTokenCost)}</Typography>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Typography variant="subtitle2">Total Costs</Typography>
                        <Typography variant="h5">{formatCurrency(stats.totalCost)}</Typography>
                    </CardContent>
                </Card>
            </Box>

            <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', lg: 'repeat(3, 1fr)' }, gridAutoRows: '1fr' }}>
                {filtered.map((p: ProjectWithResponse) => {
                    const resp = p.response;
                    const cost = Number(resp?.totalCost || 0);
                    const thumb = getThumb(p);

                    return (
                        <Box key={String(p.id ?? Math.random())}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardMedia component="img" height="200" image={String(thumb)} alt={String(p.prompt ?? 'Project image')} />
                                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant="subtitle1" sx={{ flexGrow: 1, mb: 1 }}>
                                        {String(p.prompt ?? '').length > 80 
                                            ? String(p.prompt ?? '').slice(0, 80) + '...' 
                                            : String(p.prompt ?? '')
                                        }
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">Created: {p.createdAt ? new Date(String(p.createdAt)).toLocaleString() : '—'}</Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'space-between', mt: 'auto' }}>
                                    <Chip label={formatCurrency(cost)} size="small" />
                                    <ButtonBase component="a" href={`/dashboard/project/${String(p.id ?? '')}`}>Open</ButtonBase>
                                </CardActions>
                            </Card>
                        </Box>
                    );
                })}
            </Box>
        </Container>
    );
}
