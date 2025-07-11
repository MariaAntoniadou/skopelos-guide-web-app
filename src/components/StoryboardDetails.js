import { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Box, Typography, CircularProgress, Chip } from '@mui/material';
import { fetchFromAPI } from '../api/fetchFromAPI';
import { ENDPOINTS, UPLOADS_BASE_URL } from '../config/api';
import { pageStyles } from '../styles/componentsStyles';
import { storyboardDetailsStyles } from '../styles/storyboardDetailsStyles';
import { skopelosFonts } from '../styles/typographyStyles';
import HomeIcon from '@mui/icons-material/Home';

export default function StoryboardDetails() {
  const [storyboard, setStoryboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const chapterId = searchParams.get('chapter');

  useEffect(() => {
    fetchFromAPI(ENDPOINTS.getStoryboardById(id)).then((data) => {
      setStoryboard(data);
      setLoading(false);
    }).catch((err) => {
      console.error('Error fetching storyboard:', err);
      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    if (storyboard?.attributes?.title) {
      document.title = `${storyboard.attributes.title} - Σκόπελος`;
    }
  }, [storyboard]);

  if (loading) {
    return (
      <Box sx={storyboardDetailsStyles.loadingContainer}>
        <CircularProgress sx={storyboardDetailsStyles.loadingSpinner} />
      </Box>
    );
  }

  if (!storyboard) {
    return (
      <Box sx={storyboardDetailsStyles.errorContainer}>
        <Typography variant="h6">Δεν βρέθηκε το storyboard</Typography>
      </Box>
    );
  }

  const { title, topbarTitle, tags, thumbnail } = storyboard.attributes;
  const sb = storyboard.attributes;

  const thumbUrl = sb.thumbnail?.data?.attributes?.url 
    ? UPLOADS_BASE_URL + sb.thumbnail.data.attributes.url
    : null;

  // Determine back button text and link based on chapter
  const getBackButtonInfo = () => {
    switch(chapterId) {
      case '7':
        return { text: 'Επιστροφή στους προορισμούς', link: '/chapters/7' };
      case '9':
        return { text: 'Επιστροφή στις διαδρομές', link: '/chapters/9' };
      default:
        return { text: 'επιστροφή στην αρχική', link: '/' };
    }
  };

  const backButtonInfo = getBackButtonInfo();

  return (
    <Box sx={pageStyles.container}>
      <Box sx={storyboardDetailsStyles.contentWrapper}>
        
        {/* Main Content Section */}
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 4, md: 6 },
          marginBottom: { xs: 4, md: 6 },
          alignItems: { xs: 'center', md: 'flex-start' }
        }}>
          
          {/* Left Side - Content Area */}
          <Box sx={{
            flex: 1,
            textAlign: { xs: 'center', md: 'left' },
            padding: { xs: 2, md: 3 }
          }}>
            
            {/* Main Title */}
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontFamily: skopelosFonts.titles,
                fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.8rem' },
                fontWeight: 400,
                color: '#1a365d',
                lineHeight: 1.2,
                marginBottom: { xs: 2, md: 3 },
                letterSpacing: '0.02em',
              }}
            >
              {title}
            </Typography>
            
            {/* Decorative Divider */}
            <Box sx={{
              width: { xs: '80px', md: '100px' },
              height: '3px',
              backgroundColor: '#3182ce',
              margin: { xs: '0 auto 2rem', md: '0 0 2rem 0' },
              borderRadius: '2px',
            }} />
            
            {/* Subtitle/Topbar Title */}
            {topbarTitle && (
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
                }}
              >
                {topbarTitle}
              </Typography>
            )}

            {/* Description */}
            {sb.description && (
              <Box sx={{
                backgroundColor: 'rgba(245, 245, 245, 0.7)',
                padding: { xs: 2, md: 3 },
                borderRadius: '12px',
                marginBottom: { xs: 3, md: 4 },
                border: '1px solid rgba(0,0,0,0.05)'
              }}>
                <Typography sx={{
                  fontFamily: skopelosFonts.text,
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  lineHeight: 1.7,
                  color: '#2d3748',
                  textAlign: { xs: 'center', md: 'left' }
                }}>
                  {sb.description}
                </Typography>
              </Box>
            )}
          </Box>

          {/* Right Side - Image Container */}
          <Box sx={{
            flex: 1,
            maxWidth: { xs: '100%', md: '50%' },
            height: { xs: '280px', sm: '350px', md: '450px' },
            borderRadius: '16px',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
          }}>
            {thumbUrl ? (
              <>
                <Box
                  component="img"
                  src={thumbUrl}
                  alt={title}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    }
                  }}
                />
                <Box sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.3) 100%)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  '&:hover': {
                    opacity: 1,
                  }
                }} />
              </>
            ) : (
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                backgroundColor: '#f7fafc',
                borderRadius: '16px',
                border: '2px dashed #cbd5e0',
                color: '#a0aec0'
              }}>
                <Typography sx={{
                  fontFamily: skopelosFonts.text,
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  fontStyle: 'italic'
                }}>
                  Δεν υπάρχει εικόνα
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        {/* Tags Section */}
        {tags?.data?.length > 0 && (
          <Box sx={{
            marginTop: { xs: 5, md: 7 },
            marginBottom: { xs: 5, md: 7 },
            textAlign: 'center'
          }}>
            <Typography
              variant="h3"
              sx={{
                fontFamily: skopelosFonts.text,
                fontSize: { xs: '1.1rem', md: '1.3rem' },
                fontWeight: 600,
                color: '#1a365d',
                marginBottom: { xs: 3, md: 4 },
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Χαρακτηριστικά
            </Typography>

            <Box sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: { xs: 1.5, md: 2 },
              justifyContent: 'center',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              {tags.data.map((tag) => {
                const tagTitle = tag.attributes.title;
                const tagColor = tag.attributes.color || '#3182ce';
                const iconUrl = tag.attributes.icon?.data?.attributes?.url 
                  ? UPLOADS_BASE_URL + tag.attributes.icon.data.attributes.url 
                  : null;

                return (
                  <Chip
                    key={tag.id}
                    label={tagTitle}
                    icon={iconUrl ? (
                      <Box
                        component="img"
                        src={iconUrl}
                        alt={tagTitle}
                        sx={{
                          width: '20px',
                          height: '20px',
                          objectFit: 'contain',
                          filter: 'brightness(0) invert(1)', // Make icon white
                        }}
                      />
                    ) : null}
                    sx={{
                      backgroundColor: tagColor,
                      color: 'white',
                      fontFamily: skopelosFonts.text,
                      fontSize: { xs: '0.8rem', md: '0.9rem' },
                      fontWeight: 500,
                      height: { xs: '32px', md: '36px' },
                      borderRadius: '18px',
                      padding: '0 12px',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: tagColor,
                        transform: 'translateY(-2px)',
                        boxShadow: `0 4px 12px ${tagColor}40`,
                      },
                    }}
                  />
                );
              })}
            </Box>
          </Box>
        )}

        {/* Back Button */}
        <Box sx={{
          textAlign: 'center',
          marginTop: { xs: 6, md: 8 }
        }}>
          <Link to={backButtonInfo.link} style={{ textDecoration: 'none' }}>
            <Typography sx={{
              fontFamily: skopelosFonts.text,
              fontSize: { xs: '0.9rem', md: '1rem' },
              fontWeight: 500,
              color: '#3182ce',
              padding: { xs: '10px 20px', md: '12px 24px' },
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              transition: 'all 0.3s ease',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#3182ce',
                color: 'white',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(49, 130, 206, 0.3)',
              },
            }}>
              
              {backButtonInfo.text}
            </Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}