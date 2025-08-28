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
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { useWeather } from '../contexts/WeatherContext';


export default function NavBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const weather = useWeather();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY] = useState(0);
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
      setIsVisible(currentScrollY <10);
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
        <IconButton color="inherit" onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          navigate('/profile');
        }}>
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
      
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            background: 'linear-gradient(135deg, #e3ecf7 0%, #f7fafc 100%)',
            borderTopRightRadius: 24,
            borderBottomRightRadius: 24,
            boxShadow: 6,
            p: 0,
          }
        }}
      >
        <Box sx={{ width: 250, p: 2 }}>
          {/* Logo or Title */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box
              component="img"
              src="/skopelosNav2.png"
              alt="Skopelos Island"
              sx={{ height: 36, width: 'auto', mr: 1 }}
            />
            <Typography variant="h6" sx={{ fontWeight: 700, color: skopelosColors.oceanBlue }}>
              Μενού
            </Typography>
          </Box>
          
          <List>
            {navigationItems.map((item) => (
              <ListItem
                component="button"
                key={item.text}
                onClick={() => {
                  navigate(item.link);
                  setDrawerOpen(false);
                }}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  cursor: 'pointer',
                  '&:hover': {
                    background: 'rgba(30,203,225,0.12)',
                    color: skopelosColors.oceanBlue,
                  },
                }}
              >
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 1,
              mt: 3,
            }}
          >
            {user ? (
              <ListItem component="button" onClick={() => {
                navigate('/profile');
                setDrawerOpen(false);
              }}
              sx={{
                borderRadius: 2,
                mb: 1,
                cursor: 'pointer',
                '&:hover': {
                  background: 'rgba(30,203,225,0.12)',
                  color: skopelosColors.oceanBlue,
                },
              }}>
                <AccountCircleIcon sx={{ mr: 1 }} />
                <ListItemText primary={t('profile') || 'Profile'} />
              </ListItem>
            ) : (
              <>
                <ListItem component="button" onClick={() => {
                  navigate('/login');
                  setDrawerOpen(false);
                }}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  cursor: 'pointer',
                  '&:hover': {
                    background: 'rgba(30,203,225,0.12)',
                    color: skopelosColors.oceanBlue,
                  },
                }}>
                  <LoginIcon sx={{ mr: 1 }} />
                  <ListItemText primary={t('login') || 'Login'} />
                </ListItem>

                <ListItem component="button" onClick={() => {
                  navigate('/register');
                  setDrawerOpen(false);
                }}
                 sx={{
                  borderRadius: 2,
                  mb: 1,
                  cursor: 'pointer',
                  '&:hover': {
                    background: 'rgba(30,203,225,0.12)',
                    color: skopelosColors.oceanBlue,
                  },
                }}>
                  <PersonAddIcon sx={{ mr: 1 }} />
                  <ListItemText primary={t('register') || 'Register'} />
                </ListItem>
              </>
            )}

            <ListItem component="button" onClick={handleLocaleChange} sx={{
              borderRadius: 2,
              mb: 1,
              cursor: 'pointer',
              '&:hover': {
                background: 'rgba(30,203,225,0.12)',
                color: skopelosColors.oceanBlue,
              },
            }}>
              <LanguageIcon sx={{ mr: 1 }} />
              <ListItemText primary={locale === 'el' ? 'English' : 'Ελληνικά'} />
            </ListItem>
          </Box>
        </Box>
      </Drawer>
    </>
  );

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <AppBar sx={navigationStyles.appBarHome(isVisible) }>
          <Toolbar sx={navigationStyles.toolbarHome }>
           
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
                  {t('skopelosTitle')}
                </Typography>
                <Box sx={navigationStyles.subtitle}>
                  {t('destinationGuide')}
                </Box>
              </Box>
            </Box>

          
            <Box sx={{ flexGrow: 1 ,display: { xs: 'none', md: 'block' } 
          }}>
              {renderNavButtons}
            </Box>
            {weather?.current && (
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                <WbSunnyIcon sx={{ color: '#fbc02d', fontSize: 24, mr: 0.5 }} />
                <Typography sx={{ fontWeight: 500, fontSize: '1.1rem', color: 'white' }}>
                  {Math.round(weather.current.temp_c)}°C
                </Typography>
              </Box>
            )}
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDrawerOpen(true);
                }}
                sx={{ color: 'white', ml: 1, display: { xs: 'block', md: 'none' }}}
                edge="end"
              >
                <MenuIcon />
              </IconButton>
          <Box sx={{ 
            display: { xs: 'none', md: 'flex' } 
          }}>
            {renderUserControls}
          </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {renderMobileDrawer}
      {!isHomePage && <Box sx={{ height: { xs: '70px', sm: '90px', md: '110px' } }} />}
    </>
  );
}
