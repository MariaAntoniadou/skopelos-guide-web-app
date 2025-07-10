import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: '#0d1117', // πολύ σκούρο, ψηφιακό μπλε-μαύρο
        boxShadow: '0 0 15px #00fff7', // neon glow effect
        backdropFilter: 'blur(10px)', // θόλωμα για glass effect
      }}
    >
      <Toolbar
        sx={{
          minHeight: 70,
          px: 3,
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 600,
            color: '#00fff7',
            textTransform: 'none', // πολύ σημαντικό για να μην γίνει uppercase
            fontFamily: "'Roboto Condensed', sans-serif",
            letterSpacing: '0.1em',  // λίγο πιο ψηφιακό στυλ
          }}
        >
          Σκόπελος Guide
        </Typography>

        {['Αρχική', 'Κεφάλαια', 'Storyboard'].map((text) => {
          const link =
            text === 'Αρχική'
              ? '/'
              : text === 'Κεφάλαια'
              ? '/chapters/1'
              : '/storyboard/1';

          return (
            <Button
              key={text}
              component={Link}
              to={link}
              sx={{
                color: '#00fff7',
                fontWeight: 500,
                fontFamily: "'Roboto Condensed', sans-serif",
                textTransform: 'none',  // ΚΑΝΕΙΣ override το uppercase
                minWidth: 100,
                transition: 'color 0.3s ease',
                '&:hover': {
                  color: '#fff',
                  backgroundColor: 'rgba(0, 255, 247, 0.1)',
                },
              }}
            >
              {text}
            </Button>
          );
        })}
      </Toolbar>
    </AppBar>
  );
}
