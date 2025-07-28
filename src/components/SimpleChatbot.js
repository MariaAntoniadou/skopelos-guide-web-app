import React, { useState, useRef, useEffect } from "react";
import { Box, Button, Paper, TextField, Typography, Chip, Stack } from "@mui/material";
import { skopelosFonts} from "../styles/typographyStyles";
import { getAllMainChapters } from "../api/apiService";
import { useNavigate } from "react-router-dom";
import ChatIcon from '@mui/icons-material/Chat';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { useWeather } from '../contexts/WeatherContext';


const faq = [
  { q: ["γεια"], a: "Γεια σας! Πώς μπορώ να βοηθήσω;" },
  { q: ["προορισμοί", "προορισμούς","προορισμο"], a: "Δείτε τους προορισμούς στη σχετική σελίδα." },
  { q: ["διαδρομές","διαδρομή"], a: "Οι διαδρομές εμφανίζονται στη σελίδα Διαδρομές." },
  { q: ["Εκδηλώσεις", "εκδηλώσεις"],a: "Οι εκδηλώσεις εμφανίζονται στη σελίδα Εκδηλώσεις." },
  { q: ["οικισμοι"], a: "Οι οικισμοί εμφανίζονται στη σελίδα Οικισμοί." },
  { q: ["αρχαιολογικοι χωροι"], a: "Οι αρχαιολογικοί χώροι είναι διαθέσιμοι στην αντίστοιχη ενότητα." },
  { q: ["λαϊκή τέχνη", "λαικη τεχνη"], a: "Δείτε τη λαϊκή τέχνη στην αντίστοιχη σελίδα." },
  { q: ["παραλίες", "παραλιες","παραλια","παραλία"], a: "Οι παραλίες παρουσιάζονται στη σελίδα Παραλίες." },
  { q: ["πεζοπορία", "πεζοπορια"], a: "Ανακαλύψτε διαδρομές πεζοπορίας στη σχετική ενότητα." },
  { q: ["ποδηλασία", "ποδηλασια"], a: "Η ποδηλασία περιλαμβάνεται στους θεματικούς προορισμούς." },
  { q: ["εκκλησίες", "μοναστήρια"], a: "Οι εκκλησίες και τα μοναστήρια παρουσιάζονται αναλυτικά." },
  { q: ["καλες τεχνες", "τέχνες", "τεχνη"], a: "Οι καλές τέχνες περιλαμβάνονται στους θεματικούς προορισμούς." },
  { q: ["θεματικες"], a: "Δείτε τις θεματικές ενότητες στον ιστότοπο." }

];

const quickReplies = [
  "Γεια",
  "Προορισμοί",
  "Διαδρομές",
  "Εκδηλώσεις"
];

export default function SimpleChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Γεια σας! Κάντε μια ερώτηση ή επιλέξτε μία από τις παρακάτω επιλογές." }
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);
  const navigate = useNavigate();
  const [chapters, setChapters] = useState([]);
  const weather = useWeather();


  useEffect(() => {
    getAllMainChapters("el").then(setChapters);
  }, []);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);


  const normalizeGreek = (str) =>
    str
      .toLowerCase()
      .normalize("NFD") // splits accents into separate characters
      .replace(/[\u0300-\u036f]/g, "") // removes accents
      .replace(/['’]/g, ""); // removes apostrophes


  const handleSend = async (msg) => {
    const userRaw = msg || input;
    const userMsg = normalizeGreek(userRaw.trim());
    if (!userMsg) return;

    setMessages(prev => [...prev, { from: "user", text: userRaw }]);

    const weatherKeywords = ["καιρός", "καιρο", "καιρι", "weather", "βρέχει","βρεχει", "ζέστη"];
    const normalizedWeatherKeywords = weatherKeywords.map(k => normalizeGreek(k));

    if (normalizedWeatherKeywords.some(k => userMsg.includes(k))) {
      const current = weather?.current;
      if (current) {
        const weatherText = `Ο καιρός στη Σκόπελο είναι ${current.condition.text}, θερμοκρασία ${Math.round(current.temp_c)}°C, αισθητή ${Math.round(current.feelslike_c)}°C.`;
        setMessages(prev => [...prev, { from: "bot", text: weatherText }]);
      } else {
        setMessages(prev => [...prev, { from: "bot", text: "Δεν μπορώ να ανακτήσω τον καιρό αυτή τη στιγμή." }]);
      }
      return;
    }

    const foundFaq = faq.find(entry =>
      entry.q.some(keyword => userMsg.includes(normalizeGreek(keyword)))
    );

    const botReply = foundFaq
      ? foundFaq.a
      : "Συγγνώμη, δεν γνωρίζω την απάντηση.";

    setMessages(prev => [...prev, { from: "bot", text: botReply }]);
    setInput("");

    
    if (userMsg.includes("προορισμ")) {
      const chapter = chapters.find(ch =>
        normalizeGreek(ch.attributes.title).includes("προορισμ")
      );
      if (chapter) setTimeout(() => navigate(`/main-chapters/${chapter.id}`), 1200);
    }

    if (userMsg.includes("διαδρομ")) {
      const chapter = chapters.find(ch =>
        normalizeGreek(ch.attributes.title).includes("διαδρομ")
      );
      if (chapter) setTimeout(() => navigate(`/main-chapters/${chapter.id}`), 1200);
    }

    if (userMsg.includes("εκδηλ")) {
      setTimeout(() => navigate("/events"), 1200);
    }
      // Match other thematic categories
      const storyboardKeywords = [
      "οικισμ",
      "αρχαιολογ",
      "λαϊκ", "λαικ",
      "εκκλησ",
      "μοναστ",
      "θαλασσ",
      "παρκ",
      "τεχν",
      "καλλιτεχν", "καλες",
      "παραλι",
      "πεζοπορ",
      "ποδηλασ",
      "θεματικ"
    ];

    for (const keyword of storyboardKeywords) {
      if (userMsg.includes(keyword)) {
        for (const chapter of chapters) {
          const storyboards = chapter.attributes.mainStoryboards?.data || [];
          const match = storyboards.find(sb =>
            normalizeGreek(sb.attributes.title).includes(keyword)
          );
          if (match) {
            setTimeout(() => navigate(`/storyboard/${match.id}?chapter=${chapter.id}`), 1200);
            return;
          }
        }
      }
    }

    

  };


  return (
    <Box sx={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999 }}>
      {open ? (
        <Paper
          sx={{
            width: { xs: '88vw', sm: 450, md: 400 },   // 98vw on mobile, 350px on small screens, 400px on medium+
            minWidth: { xs: '0', sm: 450, md: 400 },
            height: { xs: 420, sm: 500 },              // slightly taller on mobile if you want
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
          <Typography
            variant="h6"
            sx={{
              mb:1,
              color: 'rgba(95, 102, 102, 1)',
              textAlign: "center"
            }}
          >
            <SmartToyIcon sx={{fontSize:40}}/>
          </Typography>
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              mb: 1,
              bgcolor: "#f7fafc",
              borderRadius: 2,
              p: 1,
              border: "1px solid #e3ecf7"
            }}
          >
            {messages.map((m, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  justifyContent: m.from === "user" ? "flex-end" : "flex-start"
                }}
              >
                <Typography
                  align={m.from === "bot" ? "left" : "right"}
                  sx={{
                    mb: 1,
                    bgcolor: m.from === "bot" ? "#e3ecf7" : 'rgba(130, 206, 209, 1)',
                    color: m.from === "bot" ? "#222" : "#fff",
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    display: "inline-block",
                    maxWidth: "80%",
                    boxShadow: m.from === "bot" ? 1 : 3,
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
                  "&:hover": {
                    bgcolor: "#e3ecf7"
                  }
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
                  "& fieldset": {
                    borderColor: 'rgba(130, 206, 209, 1)'
                  },
                  "&:hover fieldset": {
                    borderColor: 'rgba(130, 206, 209, 1)'
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: 'rgba(130, 206, 209, 1)'
                  }
                }
              }}
            />
            <Button
              onClick={()=>{
                handleSend(input);
              setInput("");
              }}
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
        <Button variant="contained" onClick={() => setOpen(true)} 
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
        }}><ChatIcon />
        </Button>
      )}
    </Box>
  );
}