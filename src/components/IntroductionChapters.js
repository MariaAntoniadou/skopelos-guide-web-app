import { useParams, Link } from 'react-router-dom';
import { useEffect, useState} from 'react';
import { Box, Typography} from '@mui/material';
import { skopelosFonts } from '../styles/typographyStyles';
import { getIntroductionChaptersDeep } from '../api/apiService';
import { UPLOADS_BASE_URL } from '../config/api';
import { typographyStyles } from '../styles/typographyStyles';
import { useTranslation } from "react-i18next"; 

export default function IntroductionChapters() {
  const { id } = useParams();
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation(); 

  useEffect(() => {
    async function fetchData() {
      const data = await getIntroductionChaptersDeep('en');
      const found = data.find((c) => String(c.id) === String(id));
      setChapter(found);
      setLoading(false);
    }
    fetchData();
  }, [id]);;

  if (loading) return <Typography>{t('loadingIntro', { defaultValue: 'Loading...' })}</Typography>;
  if (!chapter) return <Typography>{t('chapterNotFound', { defaultValue: 'Not found' })}</Typography>;

  const storyboards = chapter.attributes.storyboards?.data || [];

  return (
  <Box
    sx={{
      maxWidth: 1600,
      mx: 'auto',
      p: { xs: 1, sm: 2, md: 5 },
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      gap: 8,
      alignItems: 'flex-start',
    }}
  >
    {/* Left side: Title & Description */}
    <Box sx={{ flex: 1, minWidth: 260 }}>
      <Typography sx={typographyStyles.chapterTitle}>
        {chapter.attributes.title}
      </Typography>
      <Typography
        variant="h2"
        sx={{
          fontFamily: skopelosFonts.text,
          fontSize: { xs: '1.1rem', md: '1.05rem' },
          fontWeight: 400,
          lineHeight: 1.5,
          marginBottom: { xs: 3, md: 4 },
          mt: 4,
        }}
        component="div"
        dangerouslySetInnerHTML={{ __html: chapter.attributes.description }}
      />
    </Box>

    {/* Right side: Storyboards */}
    {storyboards.length > 0 && (
      <Box
        sx={{
          flex: 2,
          mt: { xs: 4, md: 0 },
          display: 'block',
          flexDirection: 'column',
          gap: 2,
          ml:10,
        }}
      >
        {storyboards.map((storyboard, idx) => {
          const thumbUrl = storyboard.attributes.thumbnail?.data?.attributes?.url;
          const fullImageUrl = thumbUrl ? UPLOADS_BASE_URL + thumbUrl : '';

          return (
            <Box
              key={storyboard.id}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                mb: 1,
                p: 0,
                background: 'none',
                boxShadow: 'none',
                borderRadius: 0,
                borderBottom: '1px solid #f0f0f0',
              }}
            >
              {fullImageUrl && (
                <Box
                  component="img"
                  src={fullImageUrl}
                  alt={storyboard.attributes.title}
                  sx={{
                    height: 150,
                    width: 350,
                    objectFit: 'contain',
                    mr: 7,
                    boxShadow: 'none',
                    background: '#fff',
                    display: 'block',
                    //maxWidth: 180,
                  }}
                />
              )}
              <Link
                to={`/introduction-storyboard/${storyboard.id}`}
                style={{ textDecoration: 'none', flex: 1 }}
              >
                <Typography
                  sx={{
                    fontFamily: skopelosFonts.text,
                    fontWeight: 700,
                    fontSize: { xs: '1.08rem', md: '1.15rem' },
                    color: '#232323',
                    lineHeight: 0.5,
                    wordBreak: 'break-word',
                    letterSpacing: 0.5,
                  }}
                >
                  {storyboard.attributes.title}
                </Typography>
              </Link>
            </Box>
          );
        })}
      </Box>
    )}
  </Box>
);
}
