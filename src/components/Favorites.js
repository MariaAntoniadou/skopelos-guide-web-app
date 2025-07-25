import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { IconButton, Box, List, ListItem, ListItemText, Divider } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useTranslation } from "react-i18next"; 

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const user = auth.currentUser;
  const { t } = useTranslation(); // <-- use t

  useEffect(() => {
    if (!user) return;
    const fetchFavorites = async () => {
      const favCol = collection(db, "users", user.uid, "favorites");
      const favSnap = await getDocs(favCol);
      setFavorites(favSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchFavorites();
  }, [user]);

  const removeFavorite = async (favId) => {
    if (!user) return;
    const favDoc = doc(db, "users", user.uid, "favorites", favId);
    await deleteDoc(favDoc);
    setFavorites(favorites.filter(fav => fav.id !== favId));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <List>
        {favorites.length === 0 && (
          <ListItem>
            <ListItemText primary={t('noFavorites')} />
          </ListItem>
        )}
        {favorites.map(fav => (
          <div key={fav.id}>
            <ListItem
              secondaryAction={
                <IconButton edge="end" onClick={() => removeFavorite(fav.id)} color="error">
                  <FavoriteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={fav.title} />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </Box>
  );
}