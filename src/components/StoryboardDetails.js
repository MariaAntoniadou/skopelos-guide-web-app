import { useEffect, useState } from "react";
import { Link , useParams } from "react-router-dom";
import { UPLOADS_BASE_URL } from "../config/api";
import { ENDPOINTS } from '../config/api';
import { fetchFromAPI } from '../api/fetchFromAPI';



export default function StoryboardDetails(){
  const [storyboard, setStoryboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const {id}  = useParams();
  
  
    useEffect(() => {
      fetchFromAPI(ENDPOINTS.getStoryboardById(id)).then((data) => {
        setStoryboard(data);
        setLoading(false);
      }).catch((err) => {
        setLoading(false);
      });
    }, [id]);

    if (loading) return <p>Φόρτωση...</p>;

    if (!storyboard || !storyboard.attributes) {
      return <p>Δεν βρέθηκε το storyboard.</p>;
    }

    const { title, topbarTitle, tags, thumbnail} = storyboard.attributes;
    const sb = storyboard.attributes;

    const thumbUrl = sb.thumbnail?.data?.attributes?.url ? UPLOADS_BASE_URL + thumbnail.data.attributes.url
    : null;
    

    return (
    <div style={{ padding: "1rem" }}>
      <h1>{title}</h1>
      <h2 style={{ color: "gray" }}>{topbarTitle}</h2>

      {thumbUrl && (
        <img
          src={thumbUrl}
          alt={title}
          style={{ width: "300px", borderRadius: "8px", marginBottom: "1rem" }}
        />
      )}
      <h3>Tags</h3>
      <ul style={{ listStyle: "none", padding: 0, display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {tags?.data?.map((tag) => {
          
          const { title, icon } = tag.attributes;
          const iconUrl = icon?.data?.attributes?.url
            ? UPLOADS_BASE_URL + icon.data.attributes.url
            : null;

          return (
            <li key={tag.id} >
              {iconUrl && (
                <img src={iconUrl} alt={title} style={{ width: "20px", height: "20px" }} />
              )}
              <span>{title}</span>
            </li>
          );
        })}
      </ul>
      <Link to="/">Επιστροφή στην αρχική</Link>
    </div>
  );
}