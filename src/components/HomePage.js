import { useEffect, useState, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { getIntroductionChaptersDeep } from '../api/apiService';
import { UPLOADS_BASE_URL } from '../config/api';
import { mainChaptersStyles } from '../styles/mainChaptersStyles';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { pageStyles, cardStyles } from '../styles/componentsStyles';
import { getAllMainChapters } from "../api/apiService";
import { useTranslation } from "react-i18next";
import { skopelosFonts } from '../styles/typographyStyles';


export default function HomePage({ searchTerm }) {
  const [introChapters, setIntroChapters] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chapters, setChapters] = useState([]);
  const scrollRefs = useRef({});
  const { t, i18n } = useTranslation();
  const [locale] = useState(i18n.language || 'en');
  const cardRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getIntroductionChaptersDeep('en');
        setIntroChapters(data);
      } catch (err) {
        setError(t('failedToFetchIntro', { defaultValue: 'Failed to fetch introduction chapters.' }));
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [t]);

  useEffect(() => {
    async function fetchMainChapters() {
      try {
        const response = await getAllMainChapters(locale);
        setChapters(response || []);
      } catch (err) {
        console.error('Error fetching main chapters:', err);
      }
    }
    fetchMainChapters();
  }, [locale]);

  const introSlides = introChapters
    ? introChapters.filter(ch => ch.id === 18 || ch.id === 30)
    : [];

  const filteredChapters = chapters.filter(chapter =>
    !searchTerm ||
    chapter.attributes.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const scrollStoryboards = (chapterId, direction) => {
  const container = scrollRefs.current[chapterId];
  const scrollAmount = 300; 

  if (container) {
    const newScrollLeft = direction === 'left'
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    });
  }
};


  if (loading) return <Typography>{t('loadingIntro', { defaultValue: 'Loading introduction chapters...' })}</Typography>;
  if (error) return <Typography>{error}</Typography>;

  return (
    <Box>
      {introSlides.length > 0 && (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: { xs: '100vh', md: '100vh' },
            backgroundImage: `url(/skopelos4.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: 2,
            py: 4,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.41)',
              zIndex: 1,
            }}
          />
          

          <Box
            sx={{
              zIndex: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '90%',
            }}
          >
            
            <Typography
              variant="h4"
              sx={{
                fontFamily: skopelosFonts.text,
                color: 'white',
                mt: 55,
                textAlign: 'center',
                fontSize: { xs: '1rem', md: '1.5rem' },
                maxWidth: '800px',
                fontWeight: 500,
              }}
            >
              {t('discoverSkopelos')}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: 2,
                mt: 5
              }}
            >
              {introSlides.map((slide) => (
                <Link
                  key={slide.id}
                  to={`/chapter/${slide.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Box
                    sx={{
                      border: '1px solid white',
                      borderRadius: '12px',
                      px: 4,
                      py: 2,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(6px)',
                      transition: '0.3s',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: skopelosFonts.text,
                        color: 'white',
                        textAlign: 'center',
                        textTransform: 'uppercase',
                        fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                      }}
                    >
                      {slide.attributes.title}
                    </Typography>
                  </Box>
                </Link>
              ))}
            </Box>
          </Box>
        </Box>
      )}

      <Box sx={mainChaptersStyles.chaptersContainer}>
        {filteredChapters.map((chapter) => (
          <Box key={chapter.id} sx={mainChaptersStyles.chapterBox}>
            <Link to={`/main-chapters/${chapter.id}`} style={{ textDecoration: 'none' }}>
              <Typography variant="h2" component="h2" sx={mainChaptersStyles.chapterTitle}>
                -{chapter.attributes.title}-
              </Typography>
            </Link>
            <Box
              sx={mainChaptersStyles.chapterDescription}
              dangerouslySetInnerHTML={{ __html: chapter.attributes.description }}
            />
            {chapter.attributes.mainStoryboards?.data?.length > 0 && (
              <>
                <Box sx={pageStyles.arrowNavigationWrapper}>
                  <IconButton
                    className="arrow-button left"
                    onClick={() => scrollStoryboards(chapter.id, 'left')}
                    sx={cardStyles.arrowButton}
                  >
                    <ChevronLeftIcon fontSize="inherit" />
                  </IconButton>

                  <IconButton
                    className="arrow-button right"
                    onClick={() => scrollStoryboards(chapter.id, 'right')}
                    sx={cardStyles.arrowButton}
                  >
                    <ChevronRightIcon fontSize="inherit" />
                  </IconButton>

                  <Box
                    ref={(el) => scrollRefs.current[chapter.id] = el}
                    sx={{
                      ...pageStyles.storyboardContainer,
                      justifyContent: 'flex-start',
                      overflowX: 'auto',
                      scrollSnapType: chapter.attributes.mainStoryboards.data.length <= 3 ? 'none' : 'x mandatory',
                    }}
                  >
                    {chapter.attributes.mainStoryboards.data.map((storyboard,index) => {
                      const thumbUrl = storyboard.attributes.thumbnail?.data?.attributes?.url;
                      const fullImageUrl = thumbUrl ? UPLOADS_BASE_URL + thumbUrl : "";

                      return (
                        <Link
                          key={storyboard.id}
                          to={`/storyboard/${storyboard.id}`}
                          style={{ textDecoration: 'none' }}
                        >
                          <Paper
                            ref={index === 0 ? cardRef : null}
                            elevation={4}
                            sx={mainChaptersStyles.storyboardCard}
                          >
                            <Typography sx={mainChaptersStyles.storyboardTitle}>
                              {storyboard.attributes.title}
                            </Typography>

                            {fullImageUrl && (
                              <Box sx={mainChaptersStyles.storyboardImageContainer}>
                                <Box
                                  component="img"
                                  src={fullImageUrl}
                                  alt={storyboard.attributes.title}
                                  sx={mainChaptersStyles.storyboardImage}
                                  className="storyboard-image"
                                />
                              </Box>
                            )}
                          </Paper>
                        </Link>
                      );
                    })}
                  </Box>
                </Box>
              </>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
