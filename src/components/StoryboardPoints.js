import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, IconButton, Tooltip } from '@mui/material';
import { fetchFromAPI } from '../api/fetchFromAPI';
import { ENDPOINTS, UPLOADS_BASE_URL } from '../config/api';
import { skopelosFonts } from '../styles/typographyStyles';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { db, auth } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { skopelosColors } from '../styles/colors';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link as MuiLink } from '@mui/material';

import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

export default function StoryboardPoints() {
  const { id } = useParams();
  const [point, setPoint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favId, setFavId] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetchFromAPI(ENDPOINTS.getPointById(id)).then((data) => {
      setPoint(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    const checkFavorite = async () => {
      if (!user || !point) return;
      const favCol = collection(db, "users", user.uid, "favorites");
      const favSnap = await getDocs(favCol);
      const found = favSnap.docs.find(doc => doc.data().pointId === point.id);
      if (found) {
        setIsFavorite(true);
        setFavId(found.id);
      } else {
        setIsFavorite(false);
        setFavId(null);
      }
    };
    checkFavorite();
  }, [user, point]);

  const handleFavorite = async () => {
    if (!user || !point) return;
    if (isFavorite && favId) {
      await deleteDoc(doc(db, "users", user.uid, "favorites", favId));
      setIsFavorite(false);
      setFavId(null);
    } else {
      const docRef = await addDoc(collection(db, "users", user.uid, "favorites"), {
        id: point.id,
        title: point.attributes.title,
        type: "point"
      });
      setIsFavorite(true);
      setFavId(docRef.id);
    }
  };
  
 

  if (loading) return <Box sx={{ textAlign: 'center', mt: 6 }}><CircularProgress /></Box>;
  if (!point) return <Typography sx={{ textAlign: 'center', mt: 6 }}>Not found</Typography>;

  const thumbUrl = point.attributes.thumbnail?.data?.attributes?.url
    ? UPLOADS_BASE_URL + point.attributes.thumbnail.data.attributes.url
    : null;


  const rawDescription = point.attributes.description || '';
  const stripped = rawDescription.replace(/<\/p><p>/g, ' ').replace(/<\/?p>/g, '');

   const cleanedStripped = (() => {
    let s = stripped;
    // remove underscores immediately before whitespace, punctuation or end-of-string (e.g. "μουσεία_,")
    s = s.replace(/_+(?=[\s.,;:!?()]}>"']|$)/g, '');
    // remove underscores immediately after whitespace, punctuation or start-of-string (e.g. " _λέξη")
    s = s.replace(/(^|[\s([{<"'`.,;:!?])_+/g, '$1');
    return s;
  })();

  return (
      <>
        <Typography
          variant="h4"
          sx={{
            fontFamily: skopelosFonts.titles,
            fontWeight: 600,
            color: skopelosColors.oceanBlue,
            textAlign: 'center',
            mb:4,
            mt:8,
          }}
        >
          {point.attributes.title}
          {user && (
          <Tooltip title={isFavorite ? "Αφαίρεση από αγαπημένα" : "Προσθήκη στα αγαπημένα"}>
            <IconButton onClick={handleFavorite}>
              {isFavorite ? (
                <FavoriteIcon sx={{ color: "#e53935", alignItems:'center', }} />
              ) : (
                <FavoriteBorderIcon sx={{ color: "#bbb" , alignItems:'center',}} />
              )}
            </IconButton>
          </Tooltip>
        )}
        </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column',sm:'column', md: 'column'},
          gap: 4,
          alignItems: 'center',
          mb: 6,
        }}
      >
        {thumbUrl && (
          <Box
            component="img"
            src={thumbUrl}
            alt={point.attributes.title}
            sx={{
              width: { xs: 300,sm:400, md: 500 },
              objectFit: 'cover',
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              alignItems: 'center',
            }}
          />
        )}
        <Box
          sx={{
            width: '100%',
            maxWidth: '800px',
            px: 2,
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              height: '2px',
              backgroundColor: skopelosColors.oceanBlue,
              width: '200px',
              margin: '0 auto 20px',
              borderRadius: '2px',
            }}
          />
          <ReactMarkdown
            children={cleanedStripped}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
             components={{
             p: ({ children }) => (
               <Typography
                component="div"
                sx={{
                  fontFamily: skopelosFonts.text,
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1rem' },
                  lineHeight: 1.6,
                  whiteSpace: 'pre-line',
                  textAlign: 'justify',
                  mb: 1.5,
                }}
              >
                {children}
              </Typography>
            ),
            em: ({ children }) => (
               <Typography component="span" sx={{ fontStyle: 'italic' }}>{children}</Typography>
             ),
             strong: ({ children }) => (
               <Typography component="span" sx={{ fontWeight: 700 }}>{children}</Typography>
             ),
             a: ({ href, children }) => (
               <MuiLink href={href} target="_blank" rel="noopener noreferrer">{children}</MuiLink>
             ),
             li: ({ children }) => (
               <li style={{ marginLeft: 16 }}>
                 <Typography component="span" sx={{ fontFamily: skopelosFonts.text }}>{children}</Typography>
               </li>
             ),
           }}
         />

          {/* Bottom decorative line */}
          <Box
            sx={{
              height: '2px',
              backgroundColor: skopelosColors.oceanBlue,
              width: '200px',
              margin: '20px auto 0',
              borderRadius: '2px',
            }}
          />
        </Box>
      </Box>
    </>
  );
}