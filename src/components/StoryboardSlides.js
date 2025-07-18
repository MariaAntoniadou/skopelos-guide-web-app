import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchFromAPI } from '../api/fetchFromAPI';
import { ENDPOINTS, UPLOADS_BASE_URL } from '../config/api';
import { Box, Typography, Paper, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { typographyStyles } from '../styles/typographyStyles';
import { skopelosFonts } from '../styles/typographyStyles';
import { mainChaptersStyles } from '../styles/mainChaptersStyles';

function cleanDescription(html) {
  // Remove underscores and asterisks inside HTML tags
  return html
    .replace(/[_*]+/g, '') // Remove all _ and *
}
export default function StoryboardSlides() {
  const { id } = useParams();
  const [storyboard, setStoryboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);

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

  const handlePrev = () => setCurrent((prev) => Math.max(prev - 1, 0));
  const handleNext = () => setCurrent((prev) => Math.min(prev + 1, slides.length - 1));

  return (
    <Box sx={{ maxWidth: 1300, mx: 'auto', p: 4, position: 'relative' }}>
      
        <Typography  sx={mainChaptersStyles.chapterTitle}>
          {storyboard.attributes.title}
        </Typography>
      
      {slides.length === 0 ? (
        <Typography sx={{ fontStyle: 'italic', color: '#888' }}>
          No slides found.
        </Typography>
      ) : (
        <Box sx={{ position: 'relative', minHeight: 350 }}>
          <IconButton
            onClick={handlePrev}
            disabled={current === 0}
            sx={{
              position: 'absolute',
              left: 0,
              top: '50%',
              zIndex: 10,
              opacity: 1,
              transform: 'translateY(-50%)',
              background: '#fff',
              boxShadow: 2,
            }}
            aria-label="Previous Slide"
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            onClick={handleNext}
            disabled={current === slides.length - 1}
            sx={{
              position: 'absolute',
              right: 0,
              top: '50%',
              zIndex: 10,
              opacity: 1,
              transform: 'translateY(-50%)',
              background: '#fff',
              boxShadow: 2,
            }}
            aria-label="Next Slide"
          >
            <ChevronRightIcon />
          </IconButton>
          
            {slides.length > 0 && (
              <Paper sx={{ p: 1, borderRadius: 3, width: '100%' }}>
                {(() => {
                  const slide = slides[current];
                  
                  return (
                    <>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                      <Box sx={{ width: '100%', height: 6, background: '#29406b', borderRadius: 2, mb: 2 }} />
                      <Typography variant="h5" sx={typographyStyles.storTitle}>
                        {slide.attributes.title}
                      </Typography>
                      <Box
                        sx={{
                          borderRadius: 2,
                          p: 2,
                          mb: 1,
                          width: '100%',
                          maxWidth: '100%',
                          display: 'block',
                        }}
                      >
                        <Typography
                          variant="h2"
                          sx={{
                            fontFamily: skopelosFonts.text,
                            fontSize: { xs: '1.1rem', md: '1rem' },
                            fontWeight: 300,
                            color: '#4a5568',
                            lineHeight: 1.6,
                            marginBottom: { xs: 3, md: 4 },
                            fontStyle: 'normal',
                            mt: 2,
                            textAlign: 'justify',
                          }}
                          dangerouslySetInnerHTML={{ __html: cleanDescription(slide.attributes.description) }}
                        />
                      </Box>
                      {/* Show all media images for this slide */}
                      {(() => {
                        const slide = slides[current];
                        const media = slide.attributes.medias?.data?.[0];
                        const thumbData = media?.attributes?.thumbnail?.data?.attributes;
                        const smallUrl = thumbData?.formats?.small?.url || thumbData?.url || null;
                        const smallImageUrl = smallUrl ? UPLOADS_BASE_URL + smallUrl : null;

                        return (
                          <>
                            {smallImageUrl && (
                              <Box
                                component="img"
                                src={smallImageUrl}
                                alt={slide.attributes.title}
                                sx={{
                                  width: 500,
                                  height: 281,
                                  objectFit: 'cover',
                                  borderRadius: 2,
                                  mb: 2,
                                }}
                              />
                            )}
                          </>
                        );
                      })()}
                      </Box>
                      <Box sx={{ width: '100%', height: 6, background: '#29406b', borderRadius: 2, mb: 2 }} />

                     
                    </>
                    
                  );
                })()}
              
              </Paper>
            )}
          
        </Box>
      )}
    </Box>
  );
}