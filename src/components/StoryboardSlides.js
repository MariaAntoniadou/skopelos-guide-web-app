import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchFromAPI } from '../api/fetchFromAPI';
import { ENDPOINTS, UPLOADS_BASE_URL } from '../config/api';
import { Box, Typography, Paper} from '@mui/material';
import { typographyStyles } from '../styles/typographyStyles';
import { skopelosFonts } from '../styles/typographyStyles';
import { mainChaptersStyles } from '../styles/mainChaptersStyles';
import { skopelosColors } from '../styles/colors';

function cleanDescription(html) {
  // Remove underscores and asterisks inside HTML tags
  return html.replace(/[_*]+/g, '');
}

export default function StoryboardSlides() {
  const { id } = useParams();
  const [storyboard, setStoryboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFromAPI(ENDPOINTS.getIntroductionChaptersDeep('en')).then((res) => {
      const chapters = Array.isArray(res) ? res : [];
      let foundStoryboard = null;
      for (const chapter of chapters) {
        const storyboards = chapter.attributes?.storyboards?.data ?? [];
        for (const sb of storyboards) {
          if (String(sb.id) === String(id)) {
            foundStoryboard = sb;
            break;
          }
        }
        if (foundStoryboard) break;
      }
      setStoryboard(foundStoryboard);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <Typography>Loading...</Typography>;
  if (!storyboard) return <Typography>Storyboard not found</Typography>;

  const slides = storyboard.attributes.slides?.data || [];

  return (
    <Box
      sx={{
        width:'100%',
        maxWidth: '1600px',
        mx: 'auto',
        p: { xs: 1, sm:2,md: 3 },
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        mt:{xs:5,}
      }}
    >
      <Typography sx={{ ...mainChaptersStyles.chapterTitle, mb: 4, textAlign: 'center' }}>
        {storyboard.attributes.title}
      </Typography>
      {slides.length === 0 ? (
        <Typography sx={{ fontStyle: 'italic', color: skopelosColors.oceanBlue }}>
          No slides found.
        </Typography>
      ) : (
        <Box sx={{
          width: '100%',
          maxWidth: '1100px',
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          mt: 6,
        }}>
          {slides.map((slide, index) => {
          const media = slide.attributes.medias?.data?.[0];
          const thumbData = media?.attributes?.thumbnail?.data?.attributes;
          const smallUrl = thumbData?.formats?.small?.url || thumbData?.url || null;
          const smallImageUrl = smallUrl ? UPLOADS_BASE_URL + smallUrl : null;

          return (
            <Paper
              key={index}
              sx={{
                p: { xs: 1, md: 3 },
                borderRadius: 6,
                my: 3,
                width: '100%',
                maxWidth: 1100,
                mx: 'auto',
                background: 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 8px 32px rgba(44,62,80,0.12)',
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'column', md: 'column' },
                alignItems: 'center',
                textAlign: 'center',
                gap: 4,
              }}
            >
              {smallImageUrl && (
                <Box
                  sx={{
                    width: { xs: '100%', sm: 500, md: 340 },
                    height: { xs: 180, sm: 220, md: 220 },
                    borderRadius: 4,
                    overflow: 'hidden',
                    boxShadow: '0 4px 24px rgba(44,62,80,0.10)',
                    background: '#f7fafc',
                  }}
                >
                  <Box
                    component="img"
                    src={smallImageUrl}
                    alt={slide.attributes.title}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s',
                    }}
                  />
                </Box>
              )}
              <Typography
                variant="h5"
                sx={{
                  ...typographyStyles.storTitle,
                  fontWeight: 700,
                  fontSize: { xs: '1.3rem', md: '1.6rem' },
                  color: skopelosColors.oceanBlue,
                  mt: 2,
                }}
              >
                {slide.attributes.title}
              </Typography>
              <Typography
                component="div"
                sx={{
                  fontFamily: skopelosFonts.text,
                  fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.2rem' },
                  color: '#444',
                  textAlign: 'justify',
                  opacity: 0.95,
                  lineHeight: 1.7,
                  '& p': { marginBottom: 2 },
                }}
                dangerouslySetInnerHTML={{ __html: cleanDescription(slide.attributes.description) }}
              />
            </Paper>
          );
        })}

        </Box>
      )}
    </Box>
  );
}