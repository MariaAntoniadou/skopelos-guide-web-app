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
import { useTranslation } from "react-i18next";

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import {  Navigation } from 'swiper/modules';

export default function HomePage({ searchTerm }) {
  const [introChapters, setIntroChapters] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chapters, setChapters] = useState([]);
  const scrollRefs = useRef({});
  const { t, i18n } = useTranslation();
  const [locale] = useState(i18n.language || 'en');

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
    if (container) {
      const scrollAmount = 50;
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
        <Box sx={{ width: '100%',mt:10, mb: 1, position: 'relative' , height:850,}}>
          <Swiper
            modules={[ Navigation]}
            slidesPerView={1}
            navigation
            loop={true}
            style={{ width: '100%', height: '100%' }}
          >
            {introSlides.map((slide) => (
              <SwiperSlide key={slide.id} >
                <Link
                  to={`/chapter/${slide.id}`}
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    textDecoration: 'none',
                    position: 'relative'
                  }}
                >
                  {slide.attributes.thumbnail?.data?.attributes?.url ? (
                    <Box
                      component="img"
                      src={UPLOADS_BASE_URL + slide.attributes.thumbnail.data.attributes.url}
                      alt={slide.attributes.title}
                      sx={{
                        width: '100%',
                        height: { xs: 250, sm: 350, md: 850 },
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 0.4s cubic-bezier(.4,0,.2,1)',
                        
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: '100%',
                        height: { xs: 250, sm: 350, md: 500 },
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
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 100,
                      left: 450,
                      width: 1000,
                      bgcolor: 'rgba(15, 79, 68, 0.46)',
                      p: 1,
                      borderRadius:10,
                      textAlign: 'center',
                      fontWeight: 'bold',
                      textShadow: '0 2px 4px rgba(0,0,0,0.7)',
                    }}
                  >
                    <Typography variant="h3" sx={{ ...mainChaptersStyles.quoteText, color:'white', textAlign:'center'} }>
                      {slide.attributes.title}
                    </Typography>
                  </Box>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      )}

      <Box sx={navigationStyles.titleSection}>
        <Typography
          variant="h1"
          component="h1"
          sx={navigationStyles.mainTitle}
        >
          Σκόπελος
          <Box  sx={navigationStyles.subtitle}>
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
            <Link to={`/main-chapters/${chapter.id}`} style={{ textDecoration: 'none' }}>
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