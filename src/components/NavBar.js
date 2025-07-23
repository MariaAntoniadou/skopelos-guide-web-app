import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton
} from '@mui/material';
import { navigationStyles } from '../styles/navigationStyles';
import NavButton from './NavButton';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { getAllMainChapters } from '../api/apiService';
import { useAuth } from '../contexts/AuthContexts';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from "react-i18next";
import { skopelosColors } from '../styles/colors';

export default function NavBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [chapters, setChapters] = useState([]);
  const { user } = useAuth();
  const { t, i18n } = useTranslation();
  const [locale, setLocale] = useState(i18n.language || 'en');
  const [hoveredStoryboards, setHoveredStoryboards] = useState([]);
  const [hoveredChapterId, setHoveredChapterId] = useState(null);
  const navigate = useNavigate();

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
    ...chapters.map(chapter => ({
      id: chapter.id,
      text: chapter.attributes.title,
      link: `/main-chapters/${chapter.id}`
    
    })),
    {text: t("events"), link: '/events'},
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
    <Box sx={isHomePage ? navigationStyles.navButtonsHome : navigationStyles.navButtonsOther}>
      {navigationItems.map((item) => (
  <Box
    key={item.text}
    sx={{ position: 'relative', display: 'inline-block' }}
    onMouseEnter={item.id ? () => handleMouseEnter(item.id) : undefined}
    onMouseLeave={item.id ? handleMouseLeave : undefined}
  >
    <NavButton
      text={item.text}
      link={item.link}
      icon={item.icon}
      refresh={item.refresh}
    />

    {/* Dropdown κάτω από το κουμπί */}
    {hoveredChapterId === item.id && hoveredStoryboards.length > 0 && (
      <Box
        sx={{
          position: 'absolute',
          top: '100%',
          //left: 0,
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
              }
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
        <>
          <IconButton color="inherit" onClick={() => navigate('/profile')}>
            <AccountCircleIcon fontSize="large" sx={{ color: "white" }} />
          </IconButton>
        </>
      ) : (
        <>
          <IconButton color="inherit" onClick={() => navigate('/login')}>
            <LoginIcon fontSize="large" />
          </IconButton>
          <IconButton color="inherit" onClick={() => navigate('/register')}>
            <PersonAddIcon fontSize="large" />
          </IconButton>
        </>
      )}
      <IconButton onClick={handleLocaleChange} sx={{ color: 'white' }}>
        <LanguageIcon />
        {locale === 'el' ? 'EN' : 'GR'}
      </IconButton>
    </Box>
  );

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <AppBar sx={isHomePage ? navigationStyles.appBarHome(isVisible) : navigationStyles.appBarOther(isVisible)}>
          <Toolbar sx={isHomePage ? navigationStyles.toolbarHome : navigationStyles.toolbarOther}>
            {renderNavButtons}
            {renderUserControls}
          </Toolbar>
        </AppBar>

      </Box>

      {!isHomePage && <Box sx={{ height: '110px' }} />}
    </>
  );
}
