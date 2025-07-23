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
  return html.replace(/[_*]+/g, '');
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
    <Box
      sx={{
        width:'100%',
        maxWidth: '1600px',
        mx: 'auto',
        p: { xs: 1, md: 2 },
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'linear-gradient(120deg, #f7fafc 0%, #e3ecf7 100%)',
        justifyContent: 'center',
      }}
    >
      <Typography sx={{ ...mainChaptersStyles.chapterTitle, mb: 4, textAlign: 'center' }}>
        {storyboard.attributes.title}
      </Typography>
      {slides.length === 0 ? (
        <Typography sx={{ fontStyle: 'italic', color: '#888' }}>
          No slides found.
        </Typography>
      ) : (
        <Box sx={{ position: 'relative', width: '100%', maxWidth: 1100, minHeight: 350  ,mx: 'auto', display: 'flex', justifyContent: 'center'}}>
          <IconButton
            onClick={handlePrev}
            disabled={current === 0}
            sx={{
              position: 'absolute',
              left: -56,
              top: '50%',
              zIndex: 10,
              opacity: 1,
              transform: 'translateY(-50%)',
              background: '#29406b',
              color: '#fff',
              boxShadow: '0 2px 8px rgba(44,62,80,0.12)',
              width: 48,
              height: 48,
              borderRadius: '50%',
              transition: 'background 0.2s, transform 0.2s',
              '&:hover': {
                background: '#3b5998',
                transform: 'scale(1.1) translateY(-50%)',
              },
              fontSize: 32,
            }}
            aria-label="Previous Slide"
          >
            <ChevronLeftIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            onClick={handleNext}
            disabled={current === slides.length - 1}
            sx={{
              position: 'absolute',
              right: -56,
              top: '50%',
              zIndex: 10,
              opacity: 1,
              transform: 'translateY(-50%)',
              background: '#29406b',
              color: '#fff',
              boxShadow: '0 2px 8px rgba(44,62,80,0.12)',
              width: 48,
              height: 48,
              borderRadius: '50%',
              transition: 'background 0.2s, transform 0.2s',
              '&:hover': {
                background: '#3b5998',
                transform: 'scale(1.1) translateY(-50%)',
              },
              fontSize: 32,
            }}
            aria-label="Next Slide"
          >
            <ChevronRightIcon fontSize="inherit" />
          </IconButton>
          {slides.length > 0 && (
            <Paper
              sx={{
                p: { xs: 1, md: 3 },
                borderRadius: 6,
                width: 1200,
                mx: 'auto',
                background: 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 8px 32px rgba(44,62,80,0.12)',
                transition: 'box-shadow 0.3s, background 0.3s',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                textAlign:'center',
                gap: 6,
                minHeight: 220,
                animation: 'fadeInSlide 0.5s',
              }}
            >
              {(() => {
                const slide = slides[current];
                const media = slide.attributes.medias?.data?.[0];
                const thumbData = media?.attributes?.thumbnail?.data?.attributes;
                const smallUrl = thumbData?.formats?.small?.url || thumbData?.url || null;
                const smallImageUrl = smallUrl ? UPLOADS_BASE_URL + smallUrl : null;

                return (
                  <>
                    {/* Image on the left */}
                    <Box
                      sx={{
                        flex: { xs: 'none', md: '0 0 340px' },
                        width: { xs: '100%', md: 340 },
                        height: { xs: 180, md: 220 },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 4,
                        overflow: 'hidden',
                        boxShadow: '0 4px 24px rgba(44,62,80,0.10)',
                        background: '#f7fafc',
                        mr: { md: 4 },
                        mb: { xs: 2, md: 0 },
                        transition: 'box-shadow 0.3s',
                        '&:hover img': { transform: 'scale(1.04)' },
                      }}
                    >
                      {smallImageUrl && (
                        <Box
                          component="img"
                          src={smallImageUrl}
                          alt={slide.attributes.title}
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: 4,
                            transition: 'transform 0.4s cubic-bezier(.4,0,.2,1)',
                          }}
                        />
                      )}
                    </Box>
                    {/* Text on the right */}
                    <Box
                      sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        minWidth: 0,
                        px: { xs: 0, md: 2 },
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{
                          ...typographyStyles.storTitle,
                          fontWeight: 700,
                          fontSize: { xs: '1.3rem', md: '1.6rem' },
                          color: '#29406b',
                          mb: 2,
                          letterSpacing: 1,
                        }}
                      >
                        {slide.attributes.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: skopelosFonts.text,
                          fontSize: { xs: '1.1rem', md: '1.2rem' },
                          color: '#444',
                          lineHeight: 1.7,
                          textAlign: 'justify',
                          opacity: 0.95,
                          '& p': { marginBottom: 2 },
                          maxHeight: { xs: 380, md: 520 }, // less height
                          overflowY: 'auto',
                        }}
                        component="div"
                        dangerouslySetInnerHTML={{ __html: cleanDescription(slide.attributes.description) }}
                      />
                    </Box>
                  </>
                );
              })()}
            </Paper>
          )}
        </Box>
      )}
      {/* Animation keyframes */}
      <style>
        {`
          @keyframes fadeInSlide {
            from { opacity: 0; transform: translateY(30px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </Box>
  );
}