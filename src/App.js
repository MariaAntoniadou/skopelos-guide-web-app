import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import IntroductionChapters from './components/IntroductionChapters';
import ChapterDetails from './components/ChapterDetails';
import StoryboardDetails from './components/StoryboardDetails';
import Login from './components/Login';
import Profile from './components/Profile';
import Register from "./components/Register";
import StoryboardPoints from './components/StoryboardPoints';
import StoryboardSlides from './components/StoryboardSlides';
import TrailDetails from './components/TrailDetails';
import Events from './components/Events';


function App() {
  return (
    <Router>
      <Box sx={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '100vw',
        overflowX: 'hidden',
        backgroundColor: 'transparent', 
        border: 'none',
        outline: 'none',
      }}>
      
      <Box 
        sx={{ 
          flex: 1, 
          width: '100%', 
          maxWidth: '100vw',  
        }}
      >
         <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chapter/:id" element={<IntroductionChapters />} />
          <Route path="/main-chapters/:id" element={<ChapterDetails />} />
          <Route path="/storyboard/:id" element={<StoryboardDetails />} />
          <Route path="/point/:id" element={<StoryboardPoints />} />
          <Route path="/introduction-storyboard/:id" element={<StoryboardSlides />} />
          <Route path="/trails/:id" element={<TrailDetails />} />
          <Route path="/events" element={<Events />}/>
        </Routes>
        
      </Box>
      </Box>
    </Router>
  );
}

export default App;
