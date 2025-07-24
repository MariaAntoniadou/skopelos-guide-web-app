import { skopelosColors } from './colors';
import { typographyStyles } from './typographyStyles';

export const navigationStyles = {
  appBarHome: (isVisible) => ({
    bgcolor: 'rgba(28, 35, 34, 0.59)',
    boxShadow: '0 4px 20px rgba(26, 54, 93, 0.4), 0 1px 4px rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    left: '50%',
    transform: isVisible
      ? 'translateX(-50%) translateY(0)'
      : 'translateX(-50%) translateY(-120%)',
    transition: 'transform 0.3s ease-in-out',
    //width: '100%',
    top:50
  }),
  appBarOther: (isVisible) => ({
    bgcolor: 'rgba(28, 35, 34, 0.59)',
    boxShadow: '0 4px 20px rgba(26, 54, 93, 0.4), 0 1px 4px rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    left: '50%',
    transform: isVisible
      ? 'translateX(-50%) translateY(0)'
      : 'translateX(-50%) translateY(-120%)',
    transition: 'transform 0.3s ease-in-out',
    width: '100%',
    top:50
  }),
  toolbarHome: {
    minHeight: { xs: 45, md: 50 },
    //px: { xs: 2, md: 2 },
    py: 2,
    display: 'inherit',
    justifyContent: 'center',
    alignItems: 'center',
    //borderRadius: '12px',
  },
  toolbarOther: {
    minHeight: { xs: 60, md: 70 },
    px: { xs: 2, md: 4 },
    py: 1.5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    //borderRadius: '16px',
  },
  navButtonsHome: {
    display: 'flex',
    gap: { xs: 3, sm: 5, md: 8 },
    justifyContent: 'center',
  },
  navButtonsOther: {
    display: 'flex',
    gap: { xs: 4, sm: 6, md: 10 },
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  titleSection: {
    backgroundColor: skopelosColors.background.primary,
  },
  mainTitle: {
    ...typographyStyles.pageTitle,
    fontSize: { xs: '2rem', sm: '2rem', md: '2rem' },
    background: `linear-gradient(135deg, white, white)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    display: 'block',
    fontSize: { xs: '1rem', sm: '1rem', md: '1rem' },
    fontWeight: 700,
    letterSpacing: '0.2em',
    color: skopelosColors.oceanBlue,
  },
};