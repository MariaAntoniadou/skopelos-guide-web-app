/*import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getMainChapters } from "../api/getMainChapters";
import { UPLOADS_BASE_URL } from "../config/api";

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { pageStyles, cardStyles } from '../styles/componentsStyles';
import { mainChaptersStyles } from '../styles/mainChaptersStyles';

// Accept searchTerm as a prop!
export default function MainChapters({ searchTerm }) {
  const [chapters, setChapters] = useState([]);
  const scrollRefs = useRef({});

  useEffect(() => {
    getMainChapters().then(setChapters);
  }, []);

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

 
  const filteredChapters = chapters.filter(chapter =>
    !searchTerm ||
    chapter.attributes.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={pageStyles.container}>
      <Box sx={pageStyles.contentWrapper}>
        
        <Box sx={mainChaptersStyles.quoteSection}>
          <Typography variant="body1" sx={mainChaptersStyles.quoteText}>
            "Ανακαλύψτε τις κρυφές ομορφιές της Σκοπέλου μέσα από μοναδικές εμπειρίες"
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
    </Box>
  );
}

*/