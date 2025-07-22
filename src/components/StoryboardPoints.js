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

export default function StoryboardPoints() {
  const { id } = useParams();
  const [point, setPoint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favId, setFavId] = useState(null);
  const user = auth.currentUser;

  useEffect(() => {
    fetchFromAPI(ENDPOINTS.getPointById(id)).then((data) => {
      setPoint(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  // Check if this point is already a favorite
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
      // Remove favorite
      await deleteDoc(doc(db, "users", user.uid, "favorites", favId));
      setIsFavorite(false);
      setFavId(null);
    } else {
      // Add favorite
      const docRef = await addDoc(collection(db, "users", user.uid, "favorites"), {
        pointId: point.id,
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

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 6, p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Typography
          variant="h4"
          sx={{
            mr: 1,
            fontFamily: skopelosFonts.titles,
            fontWeight: 600,
            color: '#1a365d',
          }}
        >
          {point.attributes.title}
        </Typography>
        {user && (
          <Tooltip title={isFavorite ? "Αφαίρεση από αγαπημένα" : "Προσθήκη στα αγαπημένα"}>
            <IconButton onClick={handleFavorite}>
              {isFavorite ? (
                <FavoriteIcon sx={{ color: "#e53935" }} />
              ) : (
                <FavoriteBorderIcon sx={{ color: "#bbb" }} />
              )}
            </IconButton>
          </Tooltip>
        )}
      </Box>
      {thumbUrl && (
        <Box
          component="img"
          src={thumbUrl}
          alt={point.attributes.title}
          sx={{
            width: 800,
            maxHeight: 340,
            objectFit: 'cover',
            borderRadius: 4,
            mb: 3,
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          }}
        />
      )}
      <Typography
        sx={{
          fontFamily: skopelosFonts.text,
          fontSize: { xs: '1.1rem', md: '1.2rem' },
          color: '#444',
          lineHeight: 1.7,
        }}
        component="div"
        dangerouslySetInnerHTML={{ __html: point.attributes.description }}
      />
    </Box>
  );
}