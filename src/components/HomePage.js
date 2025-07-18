import { useEffect, useState, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { getIntroductionChaptersDeep } from '../api/apiService';
import { UPLOADS_BASE_URL } from '../config/api';
import { navigationStyles } from '../styles/navigationStyles';
import { mainChaptersStyles } from '../styles/mainChaptersStyles';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { pageStyles, cardStyles } from '../styles/componentsStyles';
import { getAllMainChapters } from "../api/apiService";
import { skopelosColors } from '../styles/colors';
import { useTranslation } from "react-i18next"; // <-- add this

export default function HomePage({ searchTerm }) {
  const [introChapters, setIntroChapters] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chapters, setChapters] = useState([]);
  const scrollRefs = useRef({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useTranslation(); // <-- add this

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
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    async function fetchMainChapters() {
      try {
        const response = await getAllMainChapters('en');
        setChapters(response || []);
      } catch (err) {
        console.error('Error fetching main chapters:', err);
      }
    }
    fetchMainChapters();
  }, []);

  const introSlides = introChapters
    ? introChapters.filter(ch => ch.id === 18 || ch.id === 30)
    : [];

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? introSlides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === introSlides.length - 1 ? 0 : prev + 1));
  };

  const filteredChapters = chapters.filter(chapter =>
    !searchTerm ||
    chapter.attributes.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const scrollStoryboards = (chapterId, direction) => {
    const container = scrollRefs.current[chapterId];
    if (container) {
      const scrollAmount = 300;
      const newScrollLeft = direction === 'left'
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  if (loading) return <Typography>{t('loadingIntro', { defaultValue: 'Loading introduction chapters...' })}</Typography>;
  if (error) return <Typography>{error}</Typography>;

  return (
    <Box>
      {/* --- SPECIAL INTRO CHAPTERS SLIDES DESIGN --- */}
      {introSlides.length > 0 && (
        <Box sx={{ width: '100%', mb: 6, position: 'relative' }}>
          <Box
            sx={{
              width: '100%',
              maxWidth: '100vw',
              mb: 4,
              position: 'relative',
              overflow: 'hidden',
              boxShadow: 3,
              minHeight: { xs: 250, sm: 350, md: 580 },
              background: '#eee',
              transition: 'all 0.5s cubic-bezier(.4,0,.2,1)',
            }}
          >
            {/* Make the whole slide clickable */}
            <Link
              to={`/chapter/${introSlides[currentSlide].id}`}
              style={{ display: 'block', width: '100%', height: '100%', textDecoration: 'none' }}
            >
              {/* Image */}
              {introSlides[currentSlide].attributes.thumbnail?.data?.attributes?.formats?.thumbnail?.url ? (
                <Box
                  component="img"
                  src={UPLOADS_BASE_URL + introSlides[currentSlide].attributes.thumbnail.data.attributes.url}
                  alt={introSlides[currentSlide].attributes.title}
                  sx={{
                    width: '100%',
                    height: { xs: 250, sm: 350, md: 550 },
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'all 0.5s cubic-bezier(.4,0,.2,1)',
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: '100%',
                    height: { xs: 250, sm: 350, md: 550 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#ccc',
                    color: '#555',
                    fontSize: '2rem',
                  }}
                >
                  {t('noImage', { defaultValue: 'No image available' })}
                </Box>
              )}
              {/* Overlay */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  bgcolor: skopelosColors.oceanBlue,
                  color: '#fff',
                  p: { xs: 2, md: 4 },
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, }}>
                  {introSlides[currentSlide].attributes.title}
                </Typography>
              </Box>
            </Link>
            {/* Slide navigation */}
            <IconButton
              onClick={handlePrev}
              sx={{
                position: 'absolute',
                top: '50%',
                left: 10,
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(0,0,0,0.4)',
                color: '#fff',
                zIndex: 2,
                '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
              }}
            >
              <ChevronLeftIcon fontSize="large" />
            </IconButton>
            <IconButton
              onClick={handleNext}
              sx={{
                position: 'absolute',
                top: '50%',
                right: 10,
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(0,0,0,0.4)',
                color: '#fff',
                zIndex: 2,
                '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
              }}
            >
              <ChevronRightIcon fontSize="large" />
            </IconButton>
          </Box>
        </Box>
      )}

      <Box sx={navigationStyles.titleSection}>
        <Typography
          variant="h1"
          component="h1"
          gutterBottom
          sx={navigationStyles.mainTitle}
        >
          Σκοπελος
          <Box component="span" sx={navigationStyles.subtitle}>
            {t('destinationGuide', { defaultValue: 'ΟΔΗΓΟΣ ΠΡΟΟΡΙΣΜΟΥ' })}
          </Box>
        </Typography>
      </Box>

      <Box sx={mainChaptersStyles.quoteSection}>
        <Typography variant="body1" sx={mainChaptersStyles.quoteText}>
          {t('discoverSkopelos', { defaultValue: 'Ανακαλύψτε τις κρυφές ομορφιές της Σκοπέλου μέσα από μοναδικές εμπειρίες' })}
        </Typography>
        <Box sx={mainChaptersStyles.decorativeLine} />
      </Box>

      <Box sx={mainChaptersStyles.chaptersContainer}>
        {filteredChapters.map((chapter) => (
          <Box key={chapter.id} sx={mainChaptersStyles.chapterBox}>
            <Link to={`/chapters/${chapter.id}`} style={{ textDecoration: 'none' }}>
              <Typography variant="h2" component="h2" sx={mainChaptersStyles.chapterTitle}>
                {chapter.attributes.title}
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
                      justifyContent: chapter.attributes.mainStoryboards.data.length <= 3 ? 'center' : 'flex-start',
                      overflowX: chapter.attributes.mainStoryboards.data.length <= 3 ? 'visible' : 'auto',
                      scrollSnapType: chapter.attributes.mainStoryboards.data.length <= 3 ? 'none' : 'x mandatory',
                    }}
                  >
                    {chapter.attributes.mainStoryboards.data.map((storyboard) => {
                      const thumbUrl = storyboard.attributes.thumbnail?.data?.attributes?.url;
                      const fullImageUrl = thumbUrl ? UPLOADS_BASE_URL + thumbUrl : "";

                      return (
                        <Link
                          key={storyboard.id}
                          to={`/storyboard/${storyboard.id}`}
                          style={{ textDecoration: 'none' }}
                        >
                          <Paper
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