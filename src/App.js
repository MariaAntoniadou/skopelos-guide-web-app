import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import IntroductionChapters from './components/IntroductionChapters';
import { useState } from 'react';
import ChapterDetails from './components/ChapterDetails';
import StoryboardDetails from './components/StoryboardDetails';
import Login from './components/Login';
import Profile from './components/Profile';
import Register from "./components/Register";
import StoryboardPoints from './components/StoryboardPoints';
import StoryboardSlides from './components/StoryboardSlides';
import TrailDetails from './components/TrailDetails';


function App() {
  const [searchTerm, setSearchTerm] = useState('');
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
       <NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Box sx={{ flex: 1, width: '100%', maxWidth: '100vw' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chapter/:id" element={<IntroductionChapters />} />
          <Route path="/chapters/:id" element={<ChapterDetails />} />
          <Route path="/storyboard/:id" element={<StoryboardDetails />} />
          <Route path="/point/:id" element={<StoryboardPoints />} />
          <Route path="/introduction-storyboard/:id" element={<StoryboardSlides />} />
          <Route path="/trails/:id" element={<TrailDetails />} />
        </Routes>
        
      </Box>
      </Box>
    </Router>
  );
}

export default App;
