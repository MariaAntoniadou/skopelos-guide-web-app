import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import NavBar from './components/NavBar';
import MainChapters from './components/MainChapters';
import ChapterDetails from './components/ChapterDetails';
import StoryboardDetails from './components/StoryboardDetails';
import { skopelosColors } from './styles/colors';
import { skopelosFonts } from './styles/typographyStyles';

// Create a responsive theme for the entire app
const responsiveTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,     // Mobile
      sm: 600,   // Tablet
      md: 900,   // Desktop
      lg: 1200,  // Large Desktop
      xl: 1536,  // Extra Large
    },
  },
  
});

function App() {
  return (
    <ThemeProvider theme={responsiveTheme}>
      <CssBaseline />
      <Router>
        <Box sx={{ 
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          // Global responsive container
          width: '100%',
          maxWidth: '100vw',
          overflowX: 'hidden',
        }}>
          <NavBar />
          <Box sx={{ 
            flex: 1,
            // Global responsive content wrapper
            padding: { xs: 1, sm: 2, md: 3 },
            maxWidth: '1400px',
            margin: '0 auto',
            width: '100%',
          }}>
            <Routes>
              <Route path="/" element={<MainChapters />} />
              <Route path="/chapters/:id" element={<ChapterDetails />} />
              <Route path="/storyboard/:id" element={<StoryboardDetails />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;