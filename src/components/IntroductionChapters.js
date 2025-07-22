import { useParams, Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { Box, Typography, Paper, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { skopelosFonts } from '../styles/typographyStyles';
import { getIntroductionChaptersDeep } from '../api/apiService';
import { UPLOADS_BASE_URL } from '../config/api';
import { typographyStyles } from '../styles/typographyStyles';
import { cardStyles } from '../styles/componentsStyles';
import { useTranslation } from "react-i18next"; 
import { mainChaptersStyles } from '../styles/mainChaptersStyles';

export default function IntroductionChapters() {
  const { id } = useParams();
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const { t } = useTranslation(); 

  useEffect(() => {
    async function fetchData() {
      const data = await getIntroductionChaptersDeep('en');
      const found = data.find((c) => String(c.id) === String(id));
      setChapter(found);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  const scrollStoryboards = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      const container = scrollRef.current;
      const newScrollLeft = direction === 'left' ? container.scrollLeft - scrollAmount : container.scrollLeft + scrollAmount;
      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  if (loading) return <Typography>{t('loadingIntro', { defaultValue: 'Loading...' })}</Typography>;
  if (!chapter) return <Typography>{t('chapterNotFound', { defaultValue: 'Not found' })}</Typography>;

  const storyboards = chapter.attributes.storyboards?.data || [];

  return (
    <Box
      sx={{
        maxWidth: 1100,
        mx: 'auto',
        p: { xs: 1, sm: 2, md:4 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
      }}
    >
      {/* Main content: image left, text right */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'column' },
          alignItems: { md: 'center', xs: 'center' },
        }}
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={typographyStyles.chapterTitle}>
            {chapter.attributes.title}
          </Typography>
          
        </Box>
      </Box>
      <Box sx={mainChaptersStyles.decorativeLine} />

      {/* Storyboards below */}
      {storyboards.length > 0 && (
        <Box sx={{ width: '100%', mt: 4, position: 'relative', minHeight: 220 }}>
          <IconButton
            onClick={() => scrollStoryboards('left')}
            sx={{
              ...cardStyles.arrowButton,
              position: 'absolute',
              left: 0,
              top: '50%',
              zIndex: 10,
              opacity: 1,
              transform: 'translateY(-50%)',
            }}
            aria-label={t('scrollLeft', { defaultValue: "Scroll Left" })}
          >
            <ChevronLeftIcon />
          </IconButton>

          <IconButton
            onClick={() => scrollStoryboards('right')}
            sx={{
              ...cardStyles.arrowButton,
              position: 'absolute',
              right: 0,
              top: '50%',
              zIndex: 10,
              opacity: 1,
              transform: 'translateY(-50%)',
            }}
            aria-label={t('scrollRight', { defaultValue: "Scroll Right" })}
          >
            <ChevronRightIcon />
          </IconButton>

          <Box
            ref={scrollRef}
            sx={{
              display: 'flex',
              overflowX: storyboards.length <= 3 ? 'visible' : 'auto',
              justifyContent: storyboards.length <= 3 ? 'center' : 'flex-start',
              scrollSnapType: storyboards.length <= 3 ? 'none' : 'x mandatory',
              gap: 3,
              pb: 2,
              scrollBehavior: 'smooth',
              '&::-webkit-scrollbar': { display: 'none' },
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
              background: 'rgba(255,255,255,0.6)',
              backdropFilter: 'blur(8px)',
              borderRadius: 16,
              boxShadow: '0 4px 32px rgba(44,62,80,0.10)',
            }}
          >
            {storyboards.map((storyboard) => {
              const thumbUrl = storyboard.attributes.thumbnail?.data?.attributes?.url;
              const fullImageUrl = thumbUrl ? UPLOADS_BASE_URL + thumbUrl : '';

              return (
                <Link
                  key={storyboard.id}
                  to={`/introduction-storyboard/${storyboard.id}`}
                  style={{ textDecoration: 'none', scrollSnapAlign: 'start' }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      width: 280,
                      minHeight: 10,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      p: 0,
                      borderRadius: 12,
                      boxShadow: '0 2px 16px rgba(44,62,80,0.10)',
                      overflow: 'hidden',
                      transition: 'box-shadow 0.3s, transform 0.3s, background 0.3s',
                      background: 'rgba(255,255,255,0.85)',
                      backdropFilter: 'blur(4px)',
                      m: 1,
                      '&:hover': {
                        boxShadow: '0 8px 32px rgba(44,62,80,0.18)',
                        transform: 'translateY(-4px) scale(1.04)',
                        background: 'linear-gradient(135deg, #e3ecf7 0%, #f7fafc 100%)',
                      },
                    }}
                  >
                    {fullImageUrl && (
                      <Box
                        component="img"
                        src={fullImageUrl}
                        alt={storyboard.attributes.title}
                        sx={{
                          width: '100%',
                          height: 210,
                          objectFit: 'cover',
                          borderTopLeftRadius: 12,
                          borderTopRightRadius: 12,
                          boxShadow: '0 2px 8px rgba(44,62,80,0.10)',
                          mb: 0,
                          transition: 'filter 0.2s, transform 0.3s',
                          '&:hover': { filter: 'brightness(0.97)', transform: 'scale(1.03)' },
                        }}
                      />
                    )}
                    <Box sx={{
                      width: '100%',
                      p: 2,
                      textAlign: 'center',
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(245,247,250,0.7)',
                      borderBottomLeftRadius: 12,
                      borderBottomRightRadius: 12,
                    }}>
                      <Typography
                        sx={{
                          fontFamily: skopelosFonts.text,
                          fontWeight: 700,
                          fontSize: { xs: '1.08rem', md: '1.15rem' },
                          color: '#232323',
                          lineHeight: 1.3,
                          wordBreak: 'break-word',
                          letterSpacing: 0.5,
                          }}
                        >
                        {storyboard.attributes.title}
                      </Typography>
                    </Box>
                  </Paper>
                </Link>
              );
            })}
          </Box>
        </Box>
      )}
      <Typography
            variant="h2"
            sx={{
              fontFamily: skopelosFonts.text,
              fontSize: { xs: '1.1rem', md: '1.3rem' },
              fontWeight: 300,
              color: '#4a5568',
              lineHeight: 1.6,
              marginBottom: { xs: 3, md: 4 },
              mt: 2,
              textAlign: 'justify',
            }}
            component="div"
            dangerouslySetInnerHTML={{ __html: chapter.attributes.description }}
          />
    </Box>
  );
}