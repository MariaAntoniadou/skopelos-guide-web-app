import { Box, Typography, Button, Avatar, Fade } from "@mui/material";
import { useAuth } from "../contexts/AuthContexts";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate} from "react-router-dom";
import Favorites from "./Favorites";
import { skopelosColors } from "../styles/colors";
import { useTranslation } from "react-i18next";
import { skopelosFonts } from "../styles/typographyStyles";

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation(); 

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  
  if (!user) return null;

  return (
    <Fade in timeout={600}>
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          background: "linear-gradient(135deg, #e3ecf7 0%, #f7fafc 100%)",
          py: 10,
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            maxWidth: 900,
            boxShadow: "0 4px 24px rgba(44,62,80,0.10)",
            borderRadius: 4,
            background: "#fff",
            overflow: "hidden",
          }}
        >
          
          <Box
            sx={{
              width: { xs: "100%", md: 320 },
              background: "linear-gradient(135deg, #e3ecf7 0%, #f7fafc 100%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 4,
              borderRight: { md: "1px solid #e3ecf7" },
            }}
          >
            <Avatar
              sx={{
                width: 72,
                height: 72,
                mb: 2,
                bgcolor: skopelosColors.oceanBlue,
                fontSize: 36,
                fontWeight: 700,
                letterSpacing: 2,
                boxShadow: "0 4px 16px rgba(44,62,80,0.13)",
                border: "3px solid #fff",
              }}
            >
              {user.email?.[0]?.toUpperCase() || "U"}
            </Avatar>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                mb: 0.5,
                letterSpacing: 2,
                color: skopelosColors.oceanBlue,
                fontFamily: skopelosFonts.text,
                textShadow: "0 2px 8px #b3c6e0",
              }}
            >
              {t('profile')}
            </Typography>
            <Typography
              sx={{
                color: "#555",
                mb: 2,
                fontSize: "1.08rem",
                wordBreak: "break-all",
                fontFamily: skopelosFonts.text,
                opacity: 0.85,
                textAlign: "center",
              }}
            >
              {user.email}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogout}
              sx={{
                fontWeight: 700,
                borderRadius: 4,
                background: "linear-gradient(90deg, #1ecbe1 0%, #122235 100%)",
                color: "#fff",
                mt: 2,
                px: 4,
                fontSize: "1.08rem",
                boxShadow: "0 2px 8px rgba(44,62,80,0.10)",
                letterSpacing: 1,
                textTransform: "none",
                transition: "background 0.3s, box-shadow 0.3s",
                '&:hover': {
                  background: "linear-gradient(90deg, #122235 0%, #1ecbe1 100%)",
                  boxShadow: "0 4px 16px rgba(44,62,80,0.18)",
                }
              }}
              fullWidth
            >
              {t('logout')}
            </Button>
          </Box>
          {/* Right Side: Favorites */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              p: 4,
              minWidth: 0,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                mb: 1,
                color: skopelosColors.oceanBlue,
                letterSpacing: 1,
                fontFamily: skopelosFonts.text,
              }}
            >
              {t('favorites')}
            </Typography>
            <Box
              sx={{
                width: "100%",
                mb: 2,
                maxHeight: 320,
                overflowY: "auto",
                borderRadius: 3,
                background: "rgba(232, 244, 255, 0.25)",
                boxShadow: "none",
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
              }}
            >
              <Favorites />
            </Box>
          </Box>
        </Box>
      </Box>
    </Fade>
  );

}