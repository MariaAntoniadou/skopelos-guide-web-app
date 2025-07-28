import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { getAllMainChapters } from '../api/apiService.js'; 
import { UPLOADS_BASE_URL } from "../config/api";
import { pageStyles } from '../styles/componentsStyles';
import { chapterDetailsStyles } from '../styles/chapterDetailsStyles.js';
import { useTranslation } from 'react-i18next'; 

export default function ChapterDetails() {
  const { id } = useParams();
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation(); 
  const locale = i18n.language || 'en';

 
  useEffect(() => {
    async function fetchChapter() {
      try {
        const allChapters = await getAllMainChapters(locale);
        const found = allChapters.find((ch) => ch.id === Number(id));
        setChapter(found || null);
      } catch (error) {
        console.error('Error fetching main chapters:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchChapter();
  }, [id, locale]);

  
  useEffect(() => {
    if (chapter?.attributes?.title) {
      document.title = `${chapter.attributes.title} - Σκόπελος`;
    }
  }, [chapter]);

  if (loading) {
    return (
      <Box sx={{ ...pageStyles.container, ...chapterDetailsStyles.loadingContainer }}>
        <CircularProgress sx={chapterDetailsStyles.loadingSpinner} />
      </Box>
    );
  }

  if (!chapter) {
    return (
      <Box sx={pageStyles.container}>
        <Box sx={pageStyles.contentWrapper}>
          <Typography variant="h4" sx={chapterDetailsStyles.errorContainer}>
            {t('chapterNotFound')}
          </Typography>
          <Box sx={chapterDetailsStyles.backButtonContainer}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Typography sx={chapterDetailsStyles.backButton}>
                {t('backToHome')}
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    );
  }

  const storyboards = chapter.attributes.mainStoryboards?.data || [];

  const renderStoryboardRows = () => {
    const rows = [];
    for (let i = 0; i < storyboards.length; i += 3) {
      rows.push(storyboards.slice(i, i + 3));
    }

    return rows.map((row, rowIndex) => (
      <Box key={rowIndex} sx={chapterDetailsStyles.storyboardRow}>
        {row.map((storyboard) => {
          const imageFormats = storyboard.attributes.thumbnail?.data?.attributes?.formats;
          const highResUrl =
            imageFormats?.large?.url ||
            imageFormats?.medium?.url ||
            imageFormats?.small?.url ||
            storyboard.attributes.thumbnail?.data?.attributes?.url;
          const fullImageUrl = highResUrl ? UPLOADS_BASE_URL + highResUrl : "";

          return (
            <Link 
              key={storyboard.id}
              to={`/storyboard/${storyboard.id}?chapter=${id}`} 
              style={{ textDecoration: 'none' }}
            >
              <Box sx={chapterDetailsStyles.storyboardCard}>
                <Box sx={chapterDetailsStyles.storyboardImageContainer}>
                  {fullImageUrl ? (
                    <>
                      <Box
                        component="img"
                        src={fullImageUrl}
                        alt={storyboard.attributes.title}
                        sx={chapterDetailsStyles.storyboardImage}
                      />
                      <Box 
                        className="image-overlay"
                        sx={chapterDetailsStyles.imageOverlay}
                      />
                    </>
                  ) : (
                    <Box sx={chapterDetailsStyles.noImagePlaceholder}>
                      <Typography sx={chapterDetailsStyles.noImageText}>
                        {t('noImage', { defaultValue: 'Δεν υπάρχει εικόνα' })}
                      </Typography>
                    </Box>
                  )}
                </Box>
                <Typography 
                  className="card-title"
                  sx={chapterDetailsStyles.storyboardTitle}
                >
                  {storyboard.attributes.title}
                </Typography>
              </Box>
            </Link>
          );
        })}
      </Box>
    ));
  };

  return (
    <Box sx={pageStyles.container}>
      <Box sx={pageStyles.contentWrapper}>
        
        <Typography
          variant="h1"
          component="h1"
          sx={chapterDetailsStyles.chapterTitle}
        >
          {chapter.attributes.title}
        </Typography>

        {chapter.attributes.description && (
          <Box
            sx={{
              ...chapterDetailsStyles.descriptionBox,
              maxWidth: '1800px',
            }}
            dangerouslySetInnerHTML={{ __html: chapter.attributes.description }}
          />
        )}

        {storyboards.length > 0 && (
          <Box sx={chapterDetailsStyles.storyboardGallery}>
            {renderStoryboardRows()}
          </Box>
        )}

        <Box sx={chapterDetailsStyles.backButtonContainer}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography sx={chapterDetailsStyles.backButton}>
              <HomeIcon 
                sx={{ 
                  fontSize: '1rem', 
                  marginRight: 1,
                  verticalAlign: 'middle'
                }} 
              />
              {t('backToHome')}
            </Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}