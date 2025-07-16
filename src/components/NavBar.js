import { AppBar, Toolbar, Box } from '@mui/material';
import { navigationStyles } from '../styles/navigationStyles';
import NavButton from './NavButton';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { getAllMainChapters } from '../api/apiService';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { useAuth } from '../contexts/AuthContexts';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';


export default function NavBar({ searchTerm, setSearchTerm }) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [inputValue, setInputValue] = useState(searchTerm);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [chapters, setChapters] = useState([]);
  const { user } = useAuth();

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

  const navigationItems = [
    { text: 'Αρχική', link: '/', icon: <HomeIcon /> },
    ...chapters.map(chapter => ({
      text: chapter.attributes.title,
      link: `/chapters/${chapter.id}`
    }))
  ];

  const navigate = useNavigate();

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

  // Keep input in sync if searchTerm changes from outside
  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  // Handler for Enter key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    setSearchTerm(inputValue);
    // Find exact match (case-insensitive)
    const match = chapters.find(
      ch => ch.attributes.title.toLowerCase() === inputValue.trim().toLowerCase()
    );
    if (match) {
      navigate(`/chapters/${match.id}`);
    }
  };

  return (
    <>
      {isHomePage && (
        <Box sx={{ position: 'relative' }}>

          <AppBar sx={navigationStyles.appBarHome(isVisible)}>
            <Toolbar sx={navigationStyles.toolbarHome}>
              <Box sx={navigationStyles.navButtonsHome}>
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
              <Box sx={{ ml: 1, flex: 1, maxWidth: 320 }}>
                <TextField
                  variant="outlined"
                  placeholder="Αναζήτηση..."
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  size="small"
                  fullWidth
                  sx={{
                    backgroundColor: 'rgba(255,255,255,0.85)',
                    borderRadius: '24px',
                    boxShadow: 1,
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                    fontSize: '1rem',
                    pl: 2,
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="end" onClick={handleSearch}>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{
                    style: {
                      textAlign: 'left',
                      fontFamily: 'inherit',
                    }
                  }}
                />
              </Box>
              <Box sx={{ ml: 1, display: "flex", alignItems: "center", gap: 1 }}>
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
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
      )}

      {!isHomePage && (
        <AppBar sx={navigationStyles.appBarOther(isVisible)}>
          <Toolbar sx={navigationStyles.toolbarOther}>
            <Box sx={navigationStyles.navButtonsOther}>
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
            <Box sx={{ ml: 2, display: "flex", alignItems: "center", gap: 1 }}>
              {user ? (
                <>
                  <IconButton color="inherit" onClick={() => navigate('/profile')}>
                    <AccountCircleIcon fontSize="large" sx={{ color: "white" }} />
                  </IconButton>
                  
                </>
              ) : (
                <IconButton color="inherit" onClick={() => navigate('/login')}>
                  <LoginIcon fontSize="large" />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      )}

      {!isHomePage && <Box sx={{ height: '110px' }} />}
    </>
  );
}
  