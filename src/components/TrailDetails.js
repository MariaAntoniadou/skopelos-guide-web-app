import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Paper, Chip } from '@mui/material';
import TrailMap from './TrailMap';
import { fetchFromAPI } from '../api/fetchFromAPI';
import { ENDPOINTS } from '../config/api';

export default function TrailDetails() {
  const { id } = useParams();
  const [trail, setTrail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFromAPI(ENDPOINTS.getTrailById(id)).then(data => {
      setTrail(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <CircularProgress />;
  if (!trail) return <Typography>Trail not found</Typography>;

 const trailAttributes = trail.attributes || {};
  const { title, duration, distance, difficulty, points, thumbnail } = trailAttributes;

  const pointsArray = Array.isArray(points?.data) ? points.data : [];
  
  const UPLOADS_BASE_URL = process.env.REACT_APP_UPLOADS_BASE_URL || '';
  const trailThumb = thumbnail?.data?.attributes?.url
    ? UPLOADS_BASE_URL + thumbnail.data.attributes.url
    : null;

  return (
  <Box sx={{ mx: 'auto', mt: 5 }}>
    <Paper elevation={4} sx={{ p: { xs: 2, md: 4 }, borderRadius: 4 }}>
      {trailThumb && (
        <Box
          component="img"
          src={trailThumb}
          alt={title}
          sx={{
            width: '100%',
            height: 260,
            objectFit: 'cover',
            borderRadius: 3,
            mb: 3,
            boxShadow: 2,
          }}
        />
      )}
      <Typography variant="h4" sx={{ fontWeight: 600, mb: 4,mt:4, color: '#000000ff' }}>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 2}}>
        <Chip label={`Διάρκεια: ${duration} λεπτά`} color="default"  />
        <Chip label={`Απόσταση: ${distance} χλμ`} color="deafult" />
        <Chip label={`Δυσκολία: ${difficulty}`} color="default" />
      </Box>
      <TrailMap trails={[trail]} points={pointsArray} />

    </Paper>
  </Box>
);
}