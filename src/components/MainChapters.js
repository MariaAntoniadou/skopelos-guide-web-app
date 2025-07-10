import { getMainChapters } from "../api/getMainChapters";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UPLOADS_BASE_URL } from "../config/api";

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';


export default function MainChapters() {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    getMainChapters().then(setChapters);
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Καλώς ήρθατε στον τουριστικό οδηγό της Σκοπέλου!
      </Typography>
      <ul>
      {chapters.map((chapter) => (
        <li key={chapter.id} style={{ marginBottom: "2rem" }}>
          <Link to={`/chapters/${chapter.id}`} >
            <h2>{chapter.attributes.title}</h2>
          </Link>
          <div dangerouslySetInnerHTML={{ __html: chapter.attributes.description }} />
          {chapter.attributes.mainStoryboards?.data?.map((storyboard) => {
            const thumbUrl = storyboard.attributes.thumbnail?.data?.attributes?.url;
            const fullImageUrl = thumbUrl ? UPLOADS_BASE_URL + thumbUrl : "";

            return (
              <div key={storyboard.id} style={{ marginTop: "1rem" }}>
                <Link to={`/storyboard/${storyboard.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3>{storyboard.attributes.title}</h3>
                  {fullImageUrl ? (
                    <img
                      src={fullImageUrl}
                      alt={storyboard.attributes.title}
                      style={{ width: "200px" }}
                    />
                  ) : (
                    <p>Δεν υπάρχει εικόνα</p>
                  )}
                </Link>
              </div>
            );
          })}
        </li>
      ))}
    </ul>
    </Container>
  );
}
