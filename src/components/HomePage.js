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


export default function HomePage({ searchTerm }) {
  const [introChapters, setIntroChapters] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chapters, setChapters] = useState([]);
  const scrollRefs = useRef({});

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getIntroductionChaptersDeep('en');
        setIntroChapters(data);
      } catch (err) {
        setError('Failed to fetch introduction chapters.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
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

  if (loading) return <Typography>Loading introduction chapters...</Typography>;
  if (error) return <Typography>{error}</Typography>;

  return (
    <Box>
      <Box
        component="img"
        src="/skopelos4.jpg"
        alt="Skopelos image"
        sx={{
          width: '100%',
          height: { xs: 250, sm: 350, md: 550 },
          objectFit: 'cover',
          display: 'block',
          mb: 4,
        }}
      />

      <Box sx={navigationStyles.titleSection}>
        <Typography
          variant="h1"
          component="h1"
          gutterBottom
          sx={navigationStyles.mainTitle}
        >
          Σκοπελος
          <Box component="span" sx={navigationStyles.subtitle}>
            ΟΔΗΓΟΣ ΠΡΟΟΡΙΣΜΟΥ
          </Box>
        </Typography>
      </Box>
      
      <Box sx={mainChaptersStyles.quoteSection}>
          <Typography variant="body1" sx={mainChaptersStyles.quoteText}>
            "Ανακαλύψτε τις κρυφές ομορφιές της Σκοπέλου μέσα από μοναδικές εμπειρίες"
          </Typography>
          <Box sx={mainChaptersStyles.decorativeLine} />
        </Box>

      <Box
        sx={{
          mt: 6,
          px: { xs: 1, md: 0 },
          py: 4,
          bgcolor: '#fafbfc',
          borderRadius: 3,
          maxWidth: '100%', 
          mx: 'auto',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          transition: 'box-shadow 0.3s',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 20,
          justifyContent: 'center',
          alignItems: 'stretch',
        }}
      >

      {introChapters && introChapters.length > 0 ? (
        introChapters.map((chapter) => {
          const thumbnailData = chapter.attributes.thumbnail?.data;
          const imageUrl = thumbnailData
            ? (thumbnailData.attributes.formats?.medium?.url || thumbnailData.attributes.url)
            : null;

          return (
            <Box
              key={chapter.id}
              component={Link}
              to={`/chapter/${chapter.id}`}
              sx={{
                width: 300,
                minHeight: 260,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textDecoration: 'none',
                background: '#fcfcfd',
                borderRadius: 3,
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                p: 0,
                overflow: 'hidden',
                transition: 'box-shadow 0.2s, transform 0.2s',
                '&:hover': {
                  boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
                  transform: 'translateY(-2px) scale(1.01)',
                },
              }}
            >
              {imageUrl && (
                <Box
                  component="img"
                  src={`${UPLOADS_BASE_URL}${imageUrl}`}
                  alt={chapter.attributes.title}
                  sx={{
                    width: '100%',
                    height: 170,
                    objectFit: 'cover',
                    display: 'block',
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                    boxShadow: 'none',
                    mb: 0,
                  }}
                />
              )}
              <Box sx={{ width: '100%', p: 2, textAlign: 'center' }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#232323',
                    fontWeight: 600,
                    fontSize: { xs: '1.15rem', md: '1.22rem' },
                    lineHeight: 1.3,
                  }}
                >
                  {chapter.attributes.title}
                </Typography>
              </Box>
            </Box>
          );
        })
      ) : (
        <Typography>No introduction chapters found.</Typography>
      )}
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
