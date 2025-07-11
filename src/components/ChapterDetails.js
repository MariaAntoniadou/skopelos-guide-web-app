import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import { getMainChapters } from '../api/getMainChapters'; 
import { UPLOADS_BASE_URL } from "../config/api";
import { pageStyles } from '../styles/componentsStyles';
import { chapterDetailsStyles } from '../styles/chapterDetailsStyles.js';
import HomeIcon from '@mui/icons-material/Home';

export default function ChapterDetails() {
  const { id } = useParams();
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMainChapters().then((all) => {
      const found = all.find((ch) => ch.id === Number(id));
      setChapter(found);
      setLoading(false);
    });
  }, [id]);

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
            Δεν βρέθηκε το κεφάλαιο.
          </Typography>
          <Box sx={chapterDetailsStyles.backButtonContainer}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Typography sx={chapterDetailsStyles.backButton}>
                Επιστροφή στην αρχική
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    );
  }

  // Group storyboards for elegant presentation
  const storyboards = chapter.attributes.mainStoryboards?.data || [];
  const storyboardRows = [];
  for (let i = 0; i < storyboards.length; i += 3) {
    storyboardRows.push(storyboards.slice(i, i + 3));
  }

  return (
    <Box sx={pageStyles.container}>
      <Box sx={pageStyles.contentWrapper}>
        {/* Chapter Title */}
        <Typography
          variant="h1"
          component="h1"
          sx={chapterDetailsStyles.chapterTitle}
        >
          {chapter.attributes.title}
        </Typography>

        {/* Chapter Description */}
        {chapter.attributes.description && (
          <Box
            sx={chapterDetailsStyles.descriptionBox}
            dangerouslySetInnerHTML={{ __html: chapter.attributes.description }}
          />
        )}

        {/* Elegant Storyboard Gallery */}
        {storyboards.length > 0 && (
          <Box sx={chapterDetailsStyles.storyboardGallery}>
            {storyboardRows.map((row, rowIndex) => (
              <Box key={rowIndex} sx={chapterDetailsStyles.storyboardRow}>
                {row.map((storyboard) => {
                  const thumbUrl = storyboard.attributes.thumbnail?.data?.attributes?.url;
                  const fullImageUrl = thumbUrl ? UPLOADS_BASE_URL + thumbUrl : "";

                  return (
                    <Link 
                      key={storyboard.id}
                      to={`/storyboard/${storyboard.id}?chapter=${id}`} 
                      style={{ textDecoration: 'none' }}
                    >
                      <Box sx={chapterDetailsStyles.storyboardCard}>
                        {/* Image Container */}
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
                                Δεν υπάρχει εικόνα
                              </Typography>
                            </Box>
                          )}
                        </Box>
                        
                        {/* Title */}
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
            ))}
          </Box>
        )}

        {/* Back Button */}
        <Box sx={chapterDetailsStyles.backButtonContainer}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            
            <Typography sx={chapterDetailsStyles.backButton}>
              
              <HomeIcon sx={{ 
                fontSize: '1rem', 
                marginRight: 1,
                verticalAlign: 'middle'
              }} />
              Επιστροφή στην αρχική 
            </Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}