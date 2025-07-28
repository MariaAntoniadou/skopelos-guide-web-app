import { Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { navButtonStyles } from '../styles/NavButtonStyles';

export default function NavButton({ text, link, icon, refresh }) {
  return (
    <Button
      component={Link}
      to={link}
      sx={navButtonStyles.button}
    >
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        ...navButtonStyles.text
      }}>
        {icon && (
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            opacity: 0.9,
            transition: 'opacity 0.3s ease',
          }}>
            {icon}
          </Box>
        )}
        <span>{text}</span>
      </Box>
    </Button>
  );
}