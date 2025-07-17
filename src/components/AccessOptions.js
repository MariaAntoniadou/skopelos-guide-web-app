import { useEffect, useState } from 'react';
import { fetchFromAPI } from '../api/fetchFromAPI';
import { ENDPOINTS, UPLOADS_BASE_URL } from '../config/api';
import { Box, Typography, Paper } from '@mui/material';

export default function AccessOptions() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFromAPI(ENDPOINTS.getIntroductionChaptersDeep('en')).then((res) => {
      const chapters = Array.isArray(res) ? res : [];
      let foundStoryboard = null;
      for (const chapter of chapters) {
        const storyboards = chapter.attributes?.storyboards?.data ?? [];
        for (const sb of storyboards) {
          if (String(sb.id) === '22') {
            foundStoryboard = sb;
            break;
          }
        }
        if (foundStoryboard) break;
      }
      setSlides(foundStoryboard?.attributes?.slides?.data || []);
      setLoading(false);
    });
  }, []);

  if (loading) return <Typography>Loading...</Typography>;
  if (!slides.length) return <Typography>No access options found.</Typography>;

  return (
    <Box sx={{ maxWidth: 1300, mx: 'auto', p: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
        Επιλογές Πρόσβασης στο Νησί
      </Typography>
      {slides.map((slide) => {
        const media = slide.attributes.medias?.data?.[0];
        const thumbData = media?.attributes?.thumbnail?.data?.attributes;
        const smallUrl = thumbData?.formats?.small?.url || thumbData?.url || null;
        const smallImageUrl = smallUrl ? UPLOADS_BASE_URL + smallUrl : null;

        return (
          <Paper key={slide.id} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                {slide.attributes.title}
              </Typography>
              {smallImageUrl && (
                <Box
                  component="img"
                  src={smallImageUrl}
                  alt={slide.attributes.title}
                  sx={{
                    width: 400,
                    maxWidth: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                    borderRadius: 2,
                    mb: 2,
                  }}
                />
              )}
              <Typography
                sx={{
                  fontSize: '0.95rem',
                  lineHeight: 1.5,
                  p: 0,
                  m: 0,
                  textAlign: 'center',
                }}
                dangerouslySetInnerHTML={{ __html: slide.attributes.description || '' }}
              />
            </Box>
          </Paper>
        );
      })}
    </Box>
  );
}