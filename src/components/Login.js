import { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { useAuth } from "../contexts/AuthContexts";
import { typographyStyles } from "../styles/typographyStyles";
import { skopelosColors } from "../styles/colors";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // <-- add this

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation(); // <-- add this

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/profile");
    } catch (err) {
      setError(t("loginError", { defaultValue: "Λάθος email ή κωδικός." }));
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (loading) {
    return null;
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
      <Paper
        elevation={6}
        sx={{
          p: { xs: 3, md: 5 },
          minWidth: { xs: 300, md: 400 },
          maxWidth: "95vw",
          backgroundColor: "white",
          borderRadius: 4,
          boxShadow: 6,
        }}
      >
        {user ? (
          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              onClick={handleLogout}
              sx={{
                mt: 3,
                fontWeight: 600,
                borderRadius: 3,
                backgroundColor: skopelosColors.oceanBlue,
                color: "#fff",
                '&:hover': {
                  backgroundColor: "#122235ff",
                }
              }}
            >
              {t("logout", { defaultValue: "Αποσύνδεση" })}
            </Button>
          </Box>
        ) : (
          <form onSubmit={handleLogin}>
            <Typography variant="h4" sx={{ ...typographyStyles.pageTitle, mb: 2, fontSize: "2rem" }}>
              {t("login", { defaultValue: "Σύνδεση" })}
            </Typography>
            <TextField
              label={t("email", { defaultValue: "Email" })}
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              required
              sx={{
                backgroundColor: "white",
                borderRadius: 2,
                ...typographyStyles.bodyText,
              }}
              InputLabelProps={{ sx: { ...typographyStyles.bodyText } }}
            />
            <TextField
              label={t("password", { defaultValue: "Κωδικός" })}
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              required
              sx={{
                backgroundColor: "white",
                borderRadius: 2,
                ...typographyStyles.bodyText,
              }}
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
              {t("login", { defaultValue: "Σύνδεση" })}
            </Button>
          </form>
        )}
        <Button
          onClick={() => navigate("/register")}
          sx={{ mt: 2, textTransform: "none" }}
        >
          {t("noAccountRegister", { defaultValue: "Δεν έχετε λογαριασμό; Εγγραφείτε" })}
        </Button>
      </Paper>
    </Box>
  );
}