import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getMainChapters } from "../api/getMainChapters";
import { UPLOADS_BASE_URL } from "../config/api";

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { pageStyles, cardStyles } from '../styles/componentsStyles';
import { mainChaptersStyles } from '../styles/mainChaptersStyles';

export default function MainChapters() {
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

  return (
    <Box sx={pageStyles.container}>
      <Box sx={pageStyles.contentWrapper}>
        {/* Quote Section */}
        <Box sx={mainChaptersStyles.quoteSection}>
          <Typography variant="body1" sx={mainChaptersStyles.quoteText}>
            "Ανακαλύψτε τις κρυφές ομορφιές της Σκοπέλου μέσα από μοναδικές εμπειρίες"
          </Typography>
          
          <Box sx={mainChaptersStyles.decorativeLine} />
        </Box>
        
        {/* Chapters Container */}
        <Box sx={mainChaptersStyles.chaptersContainer}>
          {chapters.map((chapter) => (
            <Box key={chapter.id} sx={mainChaptersStyles.chapterBox}>
              {/* Chapter Title */}
              <Link to={`/chapters/${chapter.id}`} style={{ textDecoration: 'none' }}>
                <Typography variant="h2" component="h2" sx={mainChaptersStyles.chapterTitle}>
                  {chapter.attributes.title}
                </Typography>
              </Link>
              
              {/* Chapter Description */}
              <Box 
                sx={mainChaptersStyles.chapterDescription}
                dangerouslySetInnerHTML={{ __html: chapter.attributes.description }} 
              />
              
              {/* Storyboards Section */}
              {chapter.attributes.mainStoryboards?.data?.length > 0 && (
                <>
                  <Box sx={pageStyles.arrowNavigationWrapper}>
                    <IconButton
                      className="arrow-button left"
                      onClick={() => scrollStoryboards(chapter.id, 'left')}
                      sx={{
                        ...cardStyles.arrowButton,
                        '&.left': cardStyles.arrowButton['&.left'],
                      }}
                    >
                      <Typography sx={mainChaptersStyles.arrowButtonText}>‹</Typography>
                    </IconButton>

                    <IconButton
                      className="arrow-button right"
                      onClick={() => scrollStoryboards(chapter.id, 'right')}
                      sx={{
                        ...cardStyles.arrowButton,
                        '&.right': cardStyles.arrowButton['&.right'],
                      }}
                    >
                      <Typography sx={mainChaptersStyles.arrowButtonText}>›</Typography>
                    </IconButton>
                    
                    <Box 
                      ref={(el) => scrollRefs.current[chapter.id] = el}
                      sx={pageStyles.storyboardContainer}
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
                            <Box sx={mainChaptersStyles.storyboardCard}>
                              <Typography sx={mainChaptersStyles.storyboardTitle}>
                                {storyboard.attributes.title}
                              </Typography>
                              
                              {fullImageUrl && (
                               <Box
                                component="img"
                                src={fullImageUrl}
                                alt={storyboard.attributes.title}
                                sx={mainChaptersStyles.storyboardImage}
                                className="storyboard-image"
                              />
                              )}
                            </Box>
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