import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { typographyStyles } from "../styles/typographyStyles";
import { useNavigate } from "react-router-dom";
import {skopelosColors} from '../styles/colors.js';
import { useTranslation } from "react-i18next";

export default function Register() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/profile");
    } catch (err) {
      setError(t("registerError"));
    }
    setLoading(false);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
      <Paper elevation={6} sx={{ p: 4, minWidth: 320, borderRadius: 4 }}>
        <Typography variant="h5" sx={typographyStyles.sectionTitle} gutterBottom>
          {t("register")}
        </Typography>
        <form onSubmit={handleRegister}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
            sx={{ backgroundColor: "white", borderRadius: 2, ...typographyStyles.bodyText }}
            InputLabelProps={{ sx: { ...typographyStyles.bodyText } }}
          />
          <TextField
            label="Κωδικός"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
            sx={{ backgroundColor: "white", borderRadius: 2, ...typographyStyles.bodyText }}
            InputLabelProps={{ sx: { ...typographyStyles.bodyText } }}
          />
          {error && (
            <Typography color="error" sx={{ mt: 1, textAlign: "center", ...typographyStyles.bodyText }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              fontWeight: 600,
              borderRadius: 3,
              fontSize: "1.1rem",
              letterSpacing: "0.05em",
              backgroundColor: skopelosColors.oceanBlue,
              color: "#fff",
              '&:hover': {
                backgroundColor: "#122235ff",
              }
            }}
            disabled={loading}
          >
            {t("register")}
          </Button>
        </form>
        <Button
          onClick={() => navigate("/login")}
          sx={{ mt: 2,fontWeight:550, textTransform: "none", color: "#122235ff",}}
        >
          {t("alreadyHaveAccount")}
        </Button>
      </Paper>
    </Box>
  );
}