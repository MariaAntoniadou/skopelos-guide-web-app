import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { fetchFromAPI } from '../api/fetchFromAPI';
import { ENDPOINTS, UPLOADS_BASE_URL } from '../config/api';
import { skopelosFonts } from '../styles/typographyStyles';

export default function StoryboardPoints() {
  const { id } = useParams();
  const [point, setPoint] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFromAPI(ENDPOINTS.getPointById(id)).then((data) => {
      setPoint(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  if (loading) return <Box sx={{ textAlign: 'center', mt: 6 }}><CircularProgress /></Box>;
  if (!point) return <Typography sx={{ textAlign: 'center', mt: 6 }}>Not found</Typography>;

  const thumbUrl = point.attributes.thumbnail?.data?.attributes?.url
    ? UPLOADS_BASE_URL + point.attributes.thumbnail.data.attributes.url
    : null;

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 6, p: 3 }}>
      <Typography
        variant="h4"
        sx={{
          mb: 2,
          fontFamily: skopelosFonts.titles,
          fontWeight: 600,
          color: '#1a365d',
        }}
      >
        {point.attributes.title}
      </Typography>
      {thumbUrl && (
        <Box
          component="img"
          src={thumbUrl}
          alt={point.attributes.title}
          sx={{
            width: '100%',
            maxHeight: 340,
            objectFit: 'cover',
            borderRadius: 4,
            mb: 3,
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          }}
        />
      )}
      <Typography
        sx={{
          fontFamily: skopelosFonts.text,
          fontSize: { xs: '1.1rem', md: '1.2rem' },
          color: '#444',
          lineHeight: 1.7,
        }}
      >
        {point.attributes.description}
      </Typography>
    </Box>
  );
}