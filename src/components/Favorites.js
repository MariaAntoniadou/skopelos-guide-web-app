import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  IconButton,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useTranslation } from "react-i18next";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const fetchFavorites = async () => {
      try {
        const favCol = collection(db, "users", user.uid, "favorites");
        const favSnap = await getDocs(favCol);
        const favs = favSnap.docs.map((doc) => ({
          ...doc.data(),
          docId: doc.id,
        }));
        setFavorites(favs);
      } catch (e) {
        console.error("Error fetching favorites:", e);
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  const removeFavorite = async (favId) => {
    if (!user) return;

    try {
      const favRef = doc(db, "users", user.uid, "favorites", favId);
      await deleteDoc(favRef);
      setFavorites((prev) => prev.filter((fav) => fav.docId !== favId));
    } catch (e) {
      console.error("Error removing favorite:", e);
    }
  };

  if (!user) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography variant="body1">
          {t("pleaseLogin", { defaultValue: "Please log in to view your favorites." })}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", padding: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {t("yourFavorites", { defaultValue: "Your Favorites" })}
      </Typography>

      {loading ? (
        <Typography>{t("loading", { defaultValue: "Loading..." })}</Typography>
      ) : favorites.length === 0 ? (
        <Typography>{t("noFavorites", { defaultValue: "No favorites yet." })}</Typography>
      ) : (
        <List>
          {favorites.map((fav) => (
            <div key={fav.docId}>
              <ListItem
                secondaryAction={
                  <IconButton
                    edge="end"
                    onClick={() => removeFavorite(fav.docId)}
                    color="error"
                  >
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
      )}
    </Box>
  );
}
