import { useEffect, useState, useRef } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Box, Typography, CircularProgress, Chip, IconButton, Paper } from '@mui/material';
import { fetchFromAPI } from '../api/fetchFromAPI';
import { ENDPOINTS, UPLOADS_BASE_URL } from '../config/api';
import { pageStyles } from '../styles/componentsStyles';
import { storyboardDetailsStyles } from '../styles/storyboardDetailsStyles';
import { skopelosFonts } from '../styles/typographyStyles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function StoryboardDetails() {
  const [storyboard, setStoryboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const chapterId = searchParams.get('chapter');
  const [chapterTitle, setChapterTitle] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    fetchFromAPI(ENDPOINTS.getStoryboardById(id)).then((data) => {
      setStoryboard(data);
      setLoading(false);
    }).catch((err) => {
      console.error('Error fetching storyboard:', err);
      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    if (chapterId) {
      fetchFromAPI(ENDPOINTS.getChapterById(chapterId)).then((data) => {
        setChapterTitle(data?.attributes?.title || '');
      }).catch(() => setChapterTitle(''));
    }
  }, [chapterId]);

  useEffect(() => {
    if (storyboard?.attributes?.title) {
      document.title = `${storyboard.attributes.title} - Σκόπελος`;
    }
  }, [storyboard]);

  if (loading) {
    return (
      <Box sx={storyboardDetailsStyles.loadingContainer}>
        <CircularProgress sx={storyboardDetailsStyles.loadingSpinner} />
      </Box>
    );
  }

  if (!storyboard) {
    return (
      <Box sx={storyboardDetailsStyles.errorContainer}>
        <Typography variant="h6">Δεν βρέθηκε το storyboard</Typography>
      </Box>
    );
  }

  const { title, topbarTitle, tags } = storyboard.attributes;
  const sb = storyboard.attributes;

  const thumbUrl = sb.thumbnail?.data?.attributes?.url 
    ? UPLOADS_BASE_URL + sb.thumbnail.data.attributes.url
    : null;

  const getBackButtonInfo = () => {
    if (chapterId) {
      if (chapterTitle) {
        return {
          text: `Επιστροφή σε "${chapterTitle}"`,
          link: `/chapters/${chapterId}`,
        };
      } else {
        return { text: 'Φόρτωση κεφαλαίου…', link: '#' };
      }
    }
    return { text: 'Επιστροφή στην αρχική', link: '/' };
  };

  const backButtonInfo = getBackButtonInfo();

  const scrollPoints = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      const container = scrollRef.current;
      const newScrollLeft = direction === 'left'
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;
      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  const points = storyboard.attributes.points?.data || [];

  return (
    <Box sx={pageStyles.container}>
      <Box sx={storyboardDetailsStyles.contentWrapper}>
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 4, md: 6 },
          marginBottom: { xs: 4, md: 6 },
          alignItems: { xs: 'center', md: 'flex-start' }
        }}>
          {/* LEFT: Text */}
          <Box sx={{
            flex: 1,
            textAlign: { xs: 'center', md: 'left' },
            padding: { xs: 2, md: 3 }
          }}>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontFamily: skopelosFonts.titles,
                fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.8rem' },
                fontWeight: 400,
                color: '#1a365d',
                lineHeight: 1.2,
                marginBottom: { xs: 2, md: 3 },
                letterSpacing: '0.02em',
              }}
            >
              {title}
            </Typography>

            <Box sx={{
              width: { xs: '80px', md: '100px' },
              height: '3px',
              backgroundColor: '#3182ce',
              margin: { xs: '0 auto 2rem', md: '0 0 2rem 0' },
              borderRadius: '2px',
            }} />

            {topbarTitle && (
              <Typography
                variant="h2"
                sx={{
                  fontFamily: skopelosFonts.text,
                  fontSize: { xs: '1.1rem', md: '1.3rem' },
                  fontWeight: 300,
                  color: '#4a5568',
                  lineHeight: 1.6,
                  marginBottom: { xs: 3, md: 4 },
                  fontStyle: 'italic',
                }}
              >
                {topbarTitle}
              </Typography>
            )}

            {sb.description && (
              <Box sx={{
                backgroundColor: 'rgba(245, 245, 245, 0.7)',
                padding: { xs: 2, md: 3 },
                borderRadius: '12px',
                marginBottom: { xs: 3, md: 4 },
                border: '1px solid rgba(0,0,0,0.05)'
              }}>
                <Typography sx={{
                  fontFamily: skopelosFonts.text,
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  lineHeight: 1.7,
                  color: '#2d3748',
                  textAlign: { xs: 'center', md: 'left' }
                }}>
                  {sb.description}
                </Typography>
              </Box>
            )}

            {/* POINTS SCROLLER */}
            {points.length > 0 && (
              <Box sx={{ width: '100%', mt: 4, position: 'relative', minHeight: 180 }}>
                <IconButton
                  onClick={() => scrollPoints('left')}
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
                  aria-label="Scroll Left"
                >
                  <ChevronLeftIcon />
                </IconButton>
                <IconButton
                  onClick={() => scrollPoints('right')}
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
                  aria-label="Scroll Right"
                >
                  <ChevronRightIcon />
                </IconButton>
                <Box
                  ref={scrollRef}
                  sx={{
                    display: 'flex',
                    overflowX: 'auto', // always scrollable
                    justifyContent: 'flex-start', // align left, allow overflow
                    scrollSnapType: points.length <= 3 ? 'none' : 'x mandatory',
                    gap: 2,
                    pb: 1,
                    scrollBehavior: 'smooth',
                    maxWidth: { xs: '100%', md: 600 }, // set a max width for scroll area
                    '&::-webkit-scrollbar': { display: 'none' },
                    msoverflowstyle: 'none',
                    scrollbarWidth: 'none',
                  }}
                >
                  {points.map((point) => {
                    const pointThumb = point.attributes.thumbnail?.data?.attributes?.url
                      ? UPLOADS_BASE_URL + point.attributes.thumbnail.data.attributes.url
                      : null;
                    return (
                      <Link
                        key={point.id}
                        to={`/point/${point.id}`}
                        style={{ textDecoration: 'none', scrollSnapAlign: 'start' }}
                      >
                        <Paper
                          elevation={4}
                          sx={{
                            width: 180,
                            minHeight: 140,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            p: 0,
                            borderRadius: 4,
                            boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
                            overflow: 'hidden',
                            transition: 'box-shadow 0.2s, transform 0.2s',
                            '&:hover': {
                              boxShadow: '0 8px 32px rgba(0,0,0,0.16)',
                              transform: 'translateY(-2px) scale(1.03)',
                            },
                            background: '#fff',
                            m: 1,
                          }}
                        >
                          {pointThumb && (
                            <Box
                              component="img"
                              src={pointThumb}
                              alt={point.attributes.title}
                              sx={{
                                width: '100%',
                                height: 90,
                                objectFit: 'cover',
                                borderTopLeftRadius: 4,
                                borderTopRightRadius: 4,
                                boxShadow: 'none',
                                mb: 0,
                                transition: 'filter 0.2s',
                                '&:hover': { filter: 'brightness(0.97)' },
                              }}
                            />
                          )}
                          <Box sx={{ width: '100%', p: 2, textAlign: 'center', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography
                              sx={{
                                fontFamily: skopelosFonts.text,
                                fontWeight: 500,
                                fontSize: { xs: '1rem', md: '1.08rem' },
                                color: '#232323',
                                lineHeight: 1.3,
                                wordBreak: 'break-word',
                              }}
                            >
                              {point.attributes.title}
                            </Typography>
                          </Box>
                        </Paper>
                      </Link>
                    );
                  })}
                </Box>
              </Box>
            )}
            {/* END POINTS SCROLLER */}
          </Box>
          {/* RIGHT: Main Image */}
          <Box sx={{
            flex: 1,
            maxWidth: { xs: '100%', md: '50%' },
            height: { xs: '280px', sm: '350px', md: '450px' },
            borderRadius: '16px',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
          }}>
            {thumbUrl ? (
              <>
                <Box
                  component="img"
                  src={thumbUrl}
                  alt={title}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    }
                  }}
                />
                <Box sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.3) 100%)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  '&:hover': {
                    opacity: 1,
                  }
                }} />
              </>
            ) : (
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                backgroundColor: '#f7fafc',
                borderRadius: '16px',
                border: '2px dashed #cbd5e0',
                color: '#a0aec0'
              }}>
                <Typography sx={{
                  fontFamily: skopelosFonts.text,
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  fontStyle: 'italic'
                }}>
                  Δεν υπάρχει εικόνα
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        {/* Tags */}
        {tags?.data?.length > 0 && (
          <Box sx={{
            marginTop: { xs: 5, md: 7 },
            marginBottom: { xs: 5, md: 7 },
            textAlign: 'center'
          }}>
            <Typography
              variant="h3"
              sx={{
                fontFamily: skopelosFonts.text,
                fontSize: { xs: '1.1rem', md: '1.3rem' },
                fontWeight: 600,
                color: '#1a365d',
                marginBottom: { xs: 3, md: 4 },
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Χαρακτηριστικά
            </Typography>

            <Box sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: { xs: 1.5, md: 2 },
              justifyContent: 'center',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              {tags.data.map((tag) => {
                const tagTitle = tag.attributes.title;
                const tagColor = tag.attributes.color || '#3182ce';
                const iconUrl = tag.attributes.icon?.data?.attributes?.url 
                  ? UPLOADS_BASE_URL + tag.attributes.icon.data.attributes.url 
                  : null;

                return (
                  <Chip
                    key={tag.id}
                    label={tagTitle}
                    icon={iconUrl ? (
                      <Box
                        component="img"
                        src={iconUrl}
                        alt={tagTitle}
                        sx={{
                          width: '20px',
                          height: '20px',
                          objectFit: 'contain',
                          filter: 'brightness(0) invert(1)', // Make icon white
                        }}
                      />
                    ) : null}
                    sx={{
                      backgroundColor: tagColor,
                      color: 'white',
                      fontFamily: skopelosFonts.text,
                      fontSize: { xs: '0.8rem', md: '0.9rem' },
                      fontWeight: 500,
                      height: { xs: '32px', md: '36px' },
                      borderRadius: '18px',
                      padding: '0 12px',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: tagColor,
                        transform: 'translateY(-2px)',
                        boxShadow: `0 4px 12px ${tagColor}40`,
                      },
                    }}
                  />
                );
              })}
            </Box>
          </Box>
        )}

        {/* Back Button */}
        <Box sx={{
          textAlign: 'center',
          marginTop: { xs: 6, md: 8 }
        }}>
          <Link to={backButtonInfo.link} style={{ textDecoration: 'none' }}>
            <Typography sx={{
              fontFamily: skopelosFonts.text,
              fontSize: { xs: '0.9rem', md: '1rem' },
              fontWeight: 500,
              color: '#3182ce',
              padding: { xs: '10px 20px', md: '12px 24px' },
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              transition: 'all 0.3s ease',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#3182ce',
                color: 'white',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(49, 130, 206, 0.3)',
              },
            }}>
              {backButtonInfo.text}
            </Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}