import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {getMainChapters} from '../api/getMainChapters'; 
import { UPLOADS_BASE_URL } from "../config/api";

export default function ChapterDetails() {
  const { id } = useParams();
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);

 useEffect(() =>  {
  getMainChapters().then((all) => {
    const found = all.find((ch) => ch.id === Number(id));
    setChapter(found);
    setLoading(false);
  });
}, [id]);

  if (loading) return <p>Φόρτωση...</p>;
  if (!chapter) return <p>Δεν βρέθηκε το κεφάλαιο.</p>;

  const { title, description, mainStoryboards } = chapter.attributes;

  return (
    <div>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: description }} />
      <h2>Storyboards</h2>
      <ul>
        {mainStoryboards.data.map((storyboard) => {
          const sb = storyboard.attributes;
          const thumbUrl = sb.thumbnail?.data?.attributes?.url;
          const fullImageUrl = thumbUrl ? UPLOADS_BASE_URL + thumbUrl : "";

          return (
            <li key={storyboard.id} style={{ marginBottom: '2rem' }}>
              <Link to={`/storyboard/${storyboard.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3>{sb.title}</h3>
                {fullImageUrl ? (
                  <img src={fullImageUrl} alt={sb.title} style={{ width: '200px', borderRadius: '8px' }} />
                ) : (
                  <p>Δεν υπάρχει εικόνα</p>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
      <Link to="/">Επιστροφή στην αρχική</Link>
    </div>
  );
}
