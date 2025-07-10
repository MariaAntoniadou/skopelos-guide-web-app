import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MainChapters from './components/MainChapters.js';
import ChapterDetails from './components/ChapterDetails.js';
import StoryboardDetails from './components/StoryboardDetails.js';
import NavBar from './components/NavBar.js';

import { Box } from '@mui/material';



function App() {
  return (
    <Router>
      <>
        <NavBar />
          <Routes>
            <Route path="/" element={<MainChapters />} />
            <Route path="/chapters/:id" element={<ChapterDetails />} />
            <Route path="/storyboard/:id" element={<StoryboardDetails />} />
          </Routes>
      </>
    </Router>
  );
}

export default App;


