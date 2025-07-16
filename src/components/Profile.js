import { Box, Typography, Button, Paper } from "@mui/material";
import { useAuth } from "../contexts/AuthContexts";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { typographyStyles } from "../styles/typographyStyles";
import { skopelosColors } from "../styles/colors";
import { useEffect } from "react";

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;


  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
      <Paper elevation={6} sx={{ p: 4, minWidth: 320, borderRadius: 4 }}>
        <Typography variant="h5" sx={typographyStyles.sectionTitle} gutterBottom>
          Το προφίλ μου
        </Typography>
        <Typography sx={{ ...typographyStyles.bodyText, mb: 3 }}>
          Email: <b>{user.email}</b>
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogout}
          sx={{
            fontWeight: 600,
            borderRadius: 3,
            backgroundColor: skopelosColors.oceanBlue,
            color: "#fff",
            '&:hover': {
              backgroundColor: "#122235ff",
            }
          }}
        >
          Αποσύνδεση
        </Button>
      </Paper>
    </Box>
  );
}
