import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { typographyStyles } from "../styles/typographyStyles";
import { useNavigate } from "react-router-dom";

export default function Register() {
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
      navigate("/profile"); // Redirect to profile after registration
    } catch (err) {
      setError("Το email χρησιμοποιείται ή ο κωδικός είναι αδύναμος.");
    }
    setLoading(false);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
      <Paper elevation={6} sx={{ p: 4, minWidth: 320, borderRadius: 4 }}>
        <Typography variant="h5" sx={typographyStyles.sectionTitle} gutterBottom>
          Εγγραφή
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
              backgroundColor: "#2c3e50",
              color: "#fff",
              '&:hover': {
                backgroundColor: "#122235ff",
              }
            }}
            disabled={loading}
          >
            Εγγραφή
          </Button>
        </form>
        <Button
          onClick={() => navigate("/login")}
          sx={{ mt: 2, textTransform: "none" }}
        >
          Έχεις ήδη λογαριασμό; Σύνδεση
        </Button>
      </Paper>
    </Box>
  );
}