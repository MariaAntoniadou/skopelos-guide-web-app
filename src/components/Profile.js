import { Box, Typography, Button, Paper, Divider, Avatar, Fade } from "@mui/material";
import { useAuth } from "../contexts/AuthContexts";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Favorites from "./Favorites";
import { skopelosColors } from "../styles/colors";
import { useTranslation } from "react-i18next"; // <-- use i18n

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation(); // <-- use t

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  if (!user) return null;

  return (
    <Fade in timeout={600}>
      <Box sx={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #f7fafc 0%, #e3ecf7 100%)",
        py: 4,
      }}>
        <Paper
          elevation={4}
          sx={{
            p: 2,
            width: "100%",
            maxWidth: 800,
            borderRadius: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "0 4px 24px 0 rgba(44, 62, 80, 0.10)",
            background: "#fff",
            transition: "box-shadow 0.3s",
            "&:hover": {
              boxShadow: "0 8px 32px 0 rgba(44, 62, 80, 0.18)",
            },
          }}
        >
          <Avatar
            sx={{
              width: 56,
              height: 56,
              mb: 1.5,
              bgcolor: skopelosColors.oceanBlue,
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: 1,
              boxShadow: "0 2px 8px rgba(44,62,80,0.10)",
            }}
          >
            {user.email?.[0]?.toUpperCase() || "U"}
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, letterSpacing: 1 }}>
            {t('profile')}
          </Typography>
          <Typography sx={{ color: "#555", mb: 1, fontSize: "1rem", wordBreak: "break-all" }}>
            {user.email}
          </Typography>
          <Divider sx={{ width: "100%", mb: 1.5 }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
            {t('favorites')}
          </Typography>
          <Box sx={{
            width: "100%",
            mb: 1,
            maxHeight: 260,
            overflowY: "auto",
            borderRadius: 2,
            background: "#f8fafc",
            boxShadow: "0 1px 4px rgba(44,62,80,0.04)",
            p: 1,
            scrollBehavior: "smooth",
            scrollbarWidth: "thin",
            "&::-webkit-scrollbar": {
              width: 6,
              borderRadius: 8,
              backgroundColor: "#e3ecf7",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#b3c6e0",
              borderRadius: 8,
            },
          }}>
            <Favorites />
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogout}
            sx={{
              fontWeight: 600,
              borderRadius: 3,
              backgroundColor: skopelosColors.oceanBlue,
              color: "#fff",
              mt: 1,
              px: 3,
              fontSize: "1rem",
              boxShadow: "0 2px 8px rgba(44,62,80,0.10)",
              '&:hover': {
                backgroundColor: "#122235ff",
              }
            }}
            fullWidth
          >
            {t('logout')}
          </Button>
        </Paper>
      </Box>
    </Fade>
  );
}