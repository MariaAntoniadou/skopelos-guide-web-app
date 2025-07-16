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


export default function IntroductionChapters() {
  const { id } = useParams();
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

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

  if (loading) return <Typography>Loading...</Typography>;
  if (!chapter) return <Typography>Not found</Typography>;

  const thumbnailData = chapter.attributes.thumbnail?.data;
  const imageUrl = thumbnailData
    ? (thumbnailData.attributes.formats?.medium?.url || thumbnailData.attributes.url)
    : null;

  const storyboards = chapter.attributes.storyboards?.data || [];

  return (
    <Box
      sx={{
        maxWidth: 1100,
        mx: 'auto',
        mt: 6,
        p: { xs: 1, sm: 3 },
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
          gap: 4,
          alignItems: { md: 'center', xs: 'center' },
          mb: 4,
        }}
      >
        {imageUrl && (
          <Box
            component="img"
            src={`${UPLOADS_BASE_URL}${imageUrl}`}
            alt={chapter.attributes.title}
            sx={{
              width: { xs: '100%', md: 340 },
              height: { xs: 200, md: 240 },
              objectFit: 'cover',
              borderRadius: 3,
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              flexShrink: 0,
            }}
          />
        )}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={typographyStyles.chapterTitle}>
            {chapter.attributes.title}
          </Typography>
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
              mt: 2,
              textAlign: 'justify',
            }}
            component="div"
            dangerouslySetInnerHTML={{ __html: chapter.attributes.description }}
          />
        </Box>
      </Box>

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
            aria-label="Scroll Left"
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
            aria-label="Scroll Right"
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
              gap: 2,
              pb: 1,
              scrollBehavior: 'smooth',
              '&::-webkit-scrollbar': { display: 'none' },
              '-ms-overflow-style': 'none',
              scrollbarWidth: 'none',
            }}
          >
            {storyboards.map((storyboard) => {
              const thumbUrl = storyboard.attributes.thumbnail?.data?.attributes?.url;
              const fullImageUrl = thumbUrl ? UPLOADS_BASE_URL + thumbUrl : '';

              return (
                <Link
                  key={storyboard.id}
                  to={`/storyboard/${storyboard.id}`}
                  style={{ textDecoration: 'none', scrollSnapAlign: 'start' }}
                >
                  <Paper
                    elevation={4}
                    sx={{
                      width: 280,
                      minHeight: 10,
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
                    {fullImageUrl && (
                      <Box
                        component="img"
                        src={fullImageUrl}
                        alt={storyboard.attributes.title}
                        sx={{
                          width: '100%',
                          height: 210,
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
    </Box>
  );
}