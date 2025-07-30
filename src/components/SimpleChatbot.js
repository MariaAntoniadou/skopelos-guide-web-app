import React, { useState, useRef, useEffect } from "react";
import { Box, Button, Paper, TextField, Typography, Chip, Stack } from "@mui/material";
import { skopelosFonts } from "../styles/typographyStyles";
import { getAllMainChapters } from "../api/apiService";
import { useNavigate } from "react-router-dom";
import ChatIcon from '@mui/icons-material/Chat';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { useWeather } from '../contexts/WeatherContext';
import { useTranslation } from 'react-i18next';

// -------------------- CONSTANTS --------------------
const faq = [
  { q: ["γεια"], a: "Γεια σας! Πώς μπορώ να βοηθήσω;" },
  { q: ["προορισμοί", "προορισμούς", "προορισμο"], a: "Δείτε τους προορισμούς στη σχετική σελίδα." },
  { q: ["διαδρομές", "διαδρομή"], a: "Οι διαδρομές εμφανίζονται στη σελίδα Διαδρομές." },
  { q: ["οικισμοι"], a: "Οι οικισμοί εμφανίζονται στη σελίδα Οικισμοί." },
  { q: ["αρχαιολογικοι χωροι"], a: "Οι αρχαιολογικοί χώροι είναι διαθέσιμοι στην αντίστοιχη ενότητα." },
  { q: ["πεζοπορία", "πεζοπορια"], a: "Ανακαλύψτε διαδρομές πεζοπορίας στη σχετική ενότητα." },
  { q: ["ποδηλασία", "ποδηλασια"], a: "Η ποδηλασία περιλαμβάνεται στους θεματικούς προορισμούς." },
  { q: ["λαϊκή τέχνη", "λαικη τεχνη"], a: "Δείτε τη λαϊκή τέχνη στην αντίστοιχη σελίδα." },
  { q: ["εκκλησίες", "μοναστήρια"], a: "Οι εκκλησίες και τα μοναστήρια παρουσιάζονται αναλυτικά." },
  { q: ["θεματικες"], a: "Δείτε τις θεματικές ενότητες στον ιστότοπο." },
  { q: ["καλες τεχνες"], a: "Οι καλές τέχνες περιλαμβάνονται στους θεματικούς προορισμούς." },
];

const quickReplies = ["Γεια", "Προορισμοί", "Διαδρομές", "Εκδηλώσεις"];
const chapterKeywords = ["προορισμ", "διαδρομ"];
const storyboardKeywords = [
  "οικισμ", "αρχαιολογ", "λαικη τεχνη", "εκκλησ", "μοναστ", "θαλασσ", "παρκ",
  "καλες τεχν", "καλες τεχνες", "καλλιτεχν", "καλες", "παραλι", "πεζοπορ", "ποδηλασ", "θεματικ"
];
const weatherKeywords = [
  "καιρός", "καιρο", "καιρι", "weather", "βρέχει", "βρεχει", "ζέστη"
].map(normalizeGreek);

// -------------------- UTILITIES --------------------
function normalizeGreek(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’]/g, "");
}

// -------------------- COMPONENT --------------------
export default function SimpleChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Γεια σας! Κάντε μια ερώτηση ή επιλέξτε μία από τις παρακάτω επιλογές." }
  ]);
  const [input, setInput] = useState("");
  const [chapters, setChapters] = useState([]);
  const chatEndRef = useRef(null);
  const navigate = useNavigate();
  const weather = useWeather();
  const { i18n } = useTranslation();
  const locale = i18n.language || 'en';

  useEffect(() => { getAllMainChapters(locale).then(setChapters); }, [locale]);
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, open]);

  const handleSend = async (msg) => {
    const userRaw = msg || input;
    const userMsg = normalizeGreek(userRaw.trim());
    if (!userMsg) return;
    setMessages(prev => [...prev, { from: "user", text: userRaw }]);

    if (weatherKeywords.some(k => userMsg.includes(k))) {
      const current = weather?.current;
      setMessages(prev => [...prev, {
        from: "bot",
        text: current
          ? `Ο καιρός στη Σκόπελο είναι ${current.condition.text}, θερμοκρασία ${Math.round(current.temp_c)}°C, αισθητή ${Math.round(current.feelslike_c)}°C.`
          : "Δεν μπορώ να ανακτήσω τον καιρό αυτή τη στιγμή."
      }]);
      return;
    }
    if (handleNavigation(userMsg)) return;

    const foundFaq = faq.find(entry =>
      entry.q.some(keyword => userMsg.includes(normalizeGreek(keyword)))
    );
    setMessages(prev => [...prev, {
      from: "bot",
      text: foundFaq ? foundFaq.a : "Συγγνώμη, δεν γνωρίζω την απάντηση."
    }]);
  };

  const handleNavigation = (userMsg) => {
    for (const keyword of chapterKeywords) {
      if (userMsg.includes(keyword)) {
        const match = chapters.find(ch =>
          normalizeGreek(ch.attributes.title).includes(keyword)
        );
        if (match) {
          setTimeout(() => navigate(`/main-chapters/${match.id}`), 1200);
          return true;
        }
      }
    }
    if (["εκδηλ", "πανηγυρ"].some(k => userMsg.includes(k))) {
      setTimeout(() => navigate("/events"), 1200);
      return true;
    }
    for (const chapter of chapters) {
      const storyboards = chapter.attributes.mainStoryboards?.data || [];
      for (const sb of storyboards) {
        const sbTitle = normalizeGreek(sb.attributes.title);
        for (const keyword of storyboardKeywords) {
          if (userMsg.includes(keyword) && sbTitle.includes(keyword)) {
            setTimeout(() =>
              navigate(`/storyboard/${sb.id}?chapter=${chapter.id}`), 1200);
            return true;
          }
        }
      }
    }
    return false;
  };

  return (
    <Box sx={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999 }}>
      {open ? (
        <Paper
          sx={{
            width: { xs: '88vw', sm: 450, md: 400 },
            minWidth: { xs: '0', sm: 450, md: 400 },
            height: { xs: 420, sm: 500 },
            maxHeight: '90vh',
            p: 2,
            display: "flex",
            flexDirection: "column",
            borderRadius: 4,
            boxShadow: 8,
            background: "linear-gradient(135deg, #e3ecf7 0%, #f7fafc 100%)",
            border: "2px solid rgba(130, 206, 209, 1)"
          }}
        >
          <Typography variant="h6" sx={{ mb: 1, color: 'rgba(95, 102, 102, 1)', textAlign: "center" }}>
            <SmartToyIcon sx={{ fontSize: 40 }} />
          </Typography>
          <Box sx={{
            flex: 1, overflowY: "auto", mb: 1, bgcolor: "#f7fafc",
            borderRadius: 2, p: 1, border: "1px solid #e3ecf7"
          }}>
            {messages.map((m, i) => (
              <Box key={i} sx={{ display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start" }}>
                <Typography
                  align={m.from === "bot" ? "left" : "right"}
                  sx={{
                    mb: 1,
                    bgcolor: m.from === "bot" ? "#e3ecf7" : 'rgba(130, 206, 209, 1)',
                    color: m.from === "bot" ? "#222" : "#fff",
                    px: 2, py: 1, borderRadius: 2, display: "inline-block",
                    maxWidth: "80%", boxShadow: m.from === "bot" ? 1 : 3,
                    fontFamily: skopelosFonts.text,
                  }}
                >
                  <b>{m.from === "bot" ? "Bot: " : "Εσείς: "}</b>{m.text}
                </Typography>
              </Box>
            ))}
            <div ref={chatEndRef} />
          </Box>
          <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: "wrap" }}>
            {quickReplies.map((reply, idx) => (
              <Chip
                key={idx}
                label={reply}
                color="primary"
                variant="outlined"
                onClick={() => handleSend(reply)}
                sx={{
                  mb: 0.5,
                  bgcolor: "#fff",
                  color: 'rgba(130, 206, 209, 1)',
                  borderColor: 'rgba(130, 206, 209, 1)',
                  fontWeight: 600,
                  "&:hover": { bgcolor: "#e3ecf7" }
                }}
              />
            ))}
          </Stack>
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              size="small"
              fullWidth
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSend(input);
                  setInput("");
                }
              }}
              placeholder="Γράψτε εδώ..."
              sx={{
                bgcolor: "#fff",
                borderRadius: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: 'rgba(130, 206, 209, 1)' },
                  "&:hover fieldset": { borderColor: 'rgba(130, 206, 209, 1)' },
                  "&.Mui-focused fieldset": { borderColor: 'rgba(130, 206, 209, 1)' }
                }
              }}
            />
            <Button
              onClick={() => { handleSend(input); setInput(""); }}
              variant="contained"
              sx={{
                bgcolor: 'rgba(130, 206, 209, 1)',
                color: "#fff",
                fontWeight: 700,
                "&:hover": { bgcolor: 'rgba(130, 206, 209, 1)' }
              }}
            >
              Send
            </Button>
          </Box>
          <Button
            onClick={() => setOpen(false)}
            sx={{
              mt: 1,
              bgcolor: "#e3ecf7",
              color: 'rgba(130, 206, 209, 1)',
              fontWeight: 700,
              borderRadius: 2,
              "&:hover": { bgcolor: "#d0e6f7" }
            }}
            fullWidth
          >
            Κλείσιμο
          </Button>
        </Paper>
      ) : (
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          sx={{
            border: '1px solid white',
            borderRadius: '12px',
            px: 4,
            py: 2,
            fontSize: 18,
            backgroundColor: 'rgba(130, 206, 209, 1)',
            backdropFilter: 'blur(6px)',
            transition: '0.3s',
            '&:hover': {
              backgroundColor: 'rgba(130, 206, 209, 1)',
              transform: 'scale(1.05)',
            },
          }}
        >
          <ChatIcon />
        </Button>
      )}
    </Box>
  );
}