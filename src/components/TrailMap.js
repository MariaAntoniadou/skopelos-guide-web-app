import { Box, Paper, Typography } from '@mui/material';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function TrailMap({ points }) {
  // Collect coordinates for the trail polyline
  const trailCoords = (points || [])
    .map(pt => {
      const lat = pt.attributes.latitude;
      const lng = pt.attributes.longitude;
      return lat && lng ? [lat, lng] : null;
    })
    .filter(Boolean);

  const center = trailCoords[0] || [39.1, 23.7]; // fallback center
console.log(points);
  return (
    <Box sx={{ width: '100%', height: 400, my: 4 }}>
      <Paper elevation={3} sx={{ height: '100%', width: '100%' }}>
        <MapContainer center={center} zoom={12} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {trailCoords.length > 1 && (
            <Polyline positions={trailCoords} color="blue" />
          )}
          {(points || []).map(pt => {
            const lat = pt.attributes.latitude;
            const lng = pt.attributes.longitude;
            if (!lat || !lng) return null;
            return (
              <Marker key={pt.id} position={[lat, lng]}>
                <Popup>
                  <Typography variant="subtitle2">{pt.attributes.title}</Typography>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </Paper>
    </Box>
  );
}