import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LanguageIcon from '@mui/icons-material/Language';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { getAllMainChapters } from '../api/apiService';
import { useAuth } from '../contexts/AuthContexts';
import NavButton from './NavButton';
import { navigationStyles } from '../styles/navigationStyles';
import { skopelosColors } from '../styles/colors';

export default function NavBar() {
  const isMobile = useMediaQuery('(max-width:900px)');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const [chapters, setChapters] = useState([]);
  const [hoveredStoryboards, setHoveredStoryboards] = useState([]);
  const [hoveredChapterId, setHoveredChapterId] = useState(null);

  const { user } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [locale, setLocale] = useState(i18n.language || 'en');

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

  const navigationItems = [
    { text: t("home"), link: '/', icon: <HomeIcon /> },
    ...chapters.map(ch => ({
      id: ch.id,
      text: ch.attributes.title,
      link: `/main-chapters/${ch.id}`,
    })),
    { text: t("events"), link: '/events' },
  ];

  useEffect(() => {
    if (isHomePage) {
      document.title = 'Σκόπελος - Οδηγός Προορισμού';
    }
  }, [isHomePage]);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 10);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  const handleLocaleChange = () => {
    const newLocale = locale === 'el' ? 'en' : 'el';
    setLocale(newLocale);
    i18n.changeLanguage(newLocale);
  };

  const handleShowStoryboards = async (chapterId) => {
    const chapter = chapters.find(c => c.id === chapterId);
    if (chapter && chapter.attributes.mainStoryboards?.data) {
      setHoveredStoryboards(chapter.attributes.mainStoryboards.data);
    } else {
      setHoveredStoryboards([]);
    }
  };

  const handleMouseEnter = (chapterId) => {
    setHoveredChapterId(chapterId);
    handleShowStoryboards(chapterId);
  };

  const handleMouseLeave = () => {
    setHoveredChapterId(null);
    setHoveredStoryboards([]);
  };

  const renderNavButtons = (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
      }}
    >
      {navigationItems.map((item) => (
        <Box
          key={item.text}
          sx={{ position: 'relative' }}
          onMouseEnter={item.id ? () => handleMouseEnter(item.id) : undefined}
          onMouseLeave={item.id ? handleMouseLeave : undefined}
        >
          <NavButton
            text={item.text}
            link={item.link}
            icon={item.icon}
          />
          {hoveredChapterId === item.id && hoveredStoryboards.length > 0 && (
            <Box
              sx={{
                position: 'absolute',
                bgcolor: skopelosColors.oceanBlue,
                color: 'white',
                zIndex: 1300,
                minWidth: '200px',
                py: 1,
                boxShadow: 3,
                borderRadius: 1,
              }}
            >
              {hoveredStoryboards.map((sb) => (
                <Typography
                  key={sb.id}
                  variant="body2"
                  onClick={() => {
                    navigate(`/storyboard/${sb.id}`);
                    handleMouseLeave();
                  }}
                  sx={{
                    px: 2,
                    py: 1,
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'rgba(19, 204, 211, 0.32)',
                    },
                  }}
                >
                  {sb.attributes.title}
                </Typography>
              ))}
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );

  const renderUserControls = (
    <Box sx={{ ml: 2, display: "flex", alignItems: "center", gap: 1 }}>
      {user ? (
        <IconButton color="inherit" onClick={() => navigate('/profile')}>
          <AccountCircleIcon sx={{ color: 'white' }} />
        </IconButton>
      ) : (
        <>
          <IconButton color="inherit" onClick={() => navigate('/login')}>
            <LoginIcon sx={{ color: 'white' }} />
          </IconButton>
          <IconButton color="inherit" onClick={() => navigate('/register')}>
            <PersonAddIcon sx={{ color: 'white' }} />
          </IconButton>
        </>
      )}
      <IconButton onClick={handleLocaleChange} sx={{ color: 'white' }}>
        <LanguageIcon />
        {locale === 'el' ? 'EN' : 'GR'}
      </IconButton>
    </Box>
  );

  const renderMobileDrawer = (
    <>
      <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: 'white' }}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250, p: 2 }}>
          <Typography variant="h6" gutterBottom>Μενού</Typography>
          <List>
            {navigationItems.map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={() => {
                  navigate(item.link);
                  setDrawerOpen(false);
                }}
              >
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
          <Box mt={2}>
            {renderUserControls}
          </Box>
        </Box>
      </Drawer>
    </>
  );

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <AppBar sx={isHomePage ? navigationStyles.appBarHome(isVisible) : navigationStyles.appBarOther(isVisible)}>
          <Toolbar sx={isHomePage ? navigationStyles.toolbarHome : navigationStyles.toolbarOther}>
            {/* Logo & Title */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                component="img"
                src="/skopelosNav2.png"
                alt="Skopelos Island"
                sx={{
                  height: 40,
                  width: 'auto',
                  mr: 2,
                }}
              />
              <Box>
                <Typography
                  variant="h1"
                  component="h1"
                  sx={navigationStyles.mainTitle}
                >
                  ΣΚΟΠΕΛΟΣ
                </Typography>
                <Box sx={navigationStyles.subtitle}>
                  {t('destinationGuide', { defaultValue: 'ΟΔΗΓΟΣ ΠΡΟΟΡΙΣΜΟΥ' })}
                </Box>
              </Box>
            </Box>

            {/* Nav items */}
            <Box sx={{ flexGrow: 1 }}>
              {isMobile ? renderMobileDrawer : renderNavButtons}
            </Box>

            {/* User controls */}
            {!isMobile && renderUserControls}
          </Toolbar>
        </AppBar>
      </Box>

      {/* Spacer για να μην "πέφτει" το περιεχόμενο κάτω από το AppBar */}
      {!isHomePage && <Box sx={{ height: { xs: '70px', sm: '90px', md: '110px' } }} />}
    </>
  );
}
