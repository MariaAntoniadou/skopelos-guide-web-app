import { AppBar, Toolbar, Box, Typography } from '@mui/material';
import { skopelosColors } from '../styles/colors';
import NavButton from './NavButton';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { getMainChapters } from '../api/getMainChapters'; 

export default function NavBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    getMainChapters().then((data) => {
      setChapters(data);
    });
  }, []);

  const navigationItems = [
    { text: 'Αρχική', link: '/', icon: <HomeIcon /> },
    ...chapters.map(chapter => ({
      text: chapter.attributes.title,    // Real chapter title
      link: `/chapters/${chapter.id}`
    }))
  ];

  // Dynamic page titles based on current route
  useEffect(() => {
      if (location.pathname === '/') {
        document.title = 'Σκόπελος - Οδηγός Προορισμού';
      } 

  }, [location.pathname]);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);

    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: skopelosColors.oceanBlue,
          backdropFilter: 'blur(20px)',
          boxShadow: '0 4px 20px rgba(26, 54, 93, 0.3)',
          borderBottom: 'none',
          transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        <Toolbar
          sx={{
            minHeight: 70,
            px: { xs: 3, md: 6 },
            py: 1.5,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: '1400px',
            mx: 'auto',
            width: '100%',
          }}
        >
          <Box sx={{ display: 'flex', gap: 10 }}>
            {navigationItems.map((item) => (
              <NavButton
                key={item.text}
                text={item.text}
                link={item.link}
                icon={item.icon}
                refresh={item.refresh}
              />
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Image Section */}
      {isHomePage && (
        <>
          <Box
            component="img"
            src="/skopelos4.jpg"
            alt="Skopelos image"
            sx={{
              width: '100%',
              height: 450,
              objectFit: 'cover',
              display: 'block',
            }}
          />

          <Box
            sx={{
              backgroundColor: skopelosColors.background.primary,
              py: 2,
              position: 'relative',
              borderTop: `1px solid ${skopelosColors.borders.primary}`,
            }}
          >
            <Typography 
              variant="h1" 
              component="h1" 
              gutterBottom 
              sx={{
                color: skopelosColors.text.primary,
                fontSize: { xs: '2rem', md: '4rem' },
                fontWeight: 400,
                letterSpacing: '0.05em',
                marginBottom: 1,
                textAlign: 'center',
                fontFamily: "'Bona Nova', serif",
                textTransform: 'uppercase',
                background: `linear-gradient(135deg, ${skopelosColors.oceanBlue}, ${skopelosColors.brightBlue})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Σκοπελος
              <Box
                component="span"
                sx={{
                  display: 'block',
                  fontSize: { xs: '0.7rem', md: '0.9rem' },
                  fontWeight: 300,
                  textTransform: 'none',
                  letterSpacing: '0.2em',
                  marginTop: 0.5,
                  color: skopelosColors.text.secondary,
                  background: 'none',
                  WebkitTextFillColor: skopelosColors.text.secondary,
                }}
              >
                ΟΔΗΓΟΣ ΠΡΟΟΡΙΣΜΟΥ
              </Box>
            </Typography>
          </Box>
        </>
      )}
    </>
  );
}