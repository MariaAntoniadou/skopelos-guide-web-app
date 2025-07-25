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
      maxWidth: 1200,
      mx: 'auto',
      p: { xs: 3, sm: 4, md: 6 },
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
    }}
  >
    
      <Typography sx={typographyStyles.chapterTitle}>
        -{chapter.attributes.title}-
      </Typography>
      <Typography
        variant="h2"
        sx={{
          fontFamily: skopelosFonts.text,
          fontSize: { xs: '1.1rem', md: '1.05rem' },
          fontWeight: 400,
          lineHeight: 1.2,
          marginBottom: { xs: 3, md: 4 },
          mt: -5,
        }}
        component="div"
        dangerouslySetInnerHTML={{ __html: chapter.attributes.description }}
      />
   
      {storyboards.length > 0 && (
        <Box>
        <Box
          sx={{
            display:'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
            gap: 1,
            mt:2,
          }}
        >
            {storyboards.map((storyboard) => {
              const thumbUrl = storyboard.attributes.thumbnail?.data?.attributes?.url;
              const fullImageUrl = thumbUrl ? UPLOADS_BASE_URL + thumbUrl : '';

              return (
                <Link
                  key={storyboard.id}
                  to={`/introduction-storyboard/${storyboard.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '16/9',
                      overflow: 'hidden',
                      boxShadow: 2,
                      background: '#eee',
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      '&:hover': { transform: 'scale(1.03)' },
                    }}
                  >
                    {fullImageUrl && (
                      <Box
                        component="img"
                        src={fullImageUrl}
                        alt={storyboard.attributes.title}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                    )}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        bgcolor: 'rgba(0,0,0,0.45)',
                        color: '#fff',
                        p: 2,
                        fontFamily: skopelosFonts.text,
                        fontWeight: 700,
                        fontSize: { xs: '1rem', md: '1.15rem' },
                        letterSpacing: 0.5,
                        textShadow: '0 2px 8px #000',
                      }}
                    >
                      {storyboard.attributes.title}
                    </Box>
                  </Box>
                </Link>
              );
            })}
          </Box>
        </Box>
      )}
  </Box>
);
}
