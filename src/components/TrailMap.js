import { Box, Paper } from '@mui/material';
import { MapContainer, TileLayer, Marker, Polyline, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import React from 'react';
import axios from 'axios';

const transparentIcon = new L.Icon({
  iconUrl:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAApJREFUCNdjYAAAAAIAAeIhvDMAAAAASUVORK5CYII=',
  iconSize: [1, 1],
});

const intermediateIcon = new L.Icon({
  iconUrl: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
  iconSize: [24, 24],
  iconAnchor: [12, 24],
});

const startIcon = new L.Icon({
  iconUrl: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const endIcon = new L.Icon({
  iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

function getTrailColor() {
  return '#3182ce'; // blue
}

async function getSnappedRoute(coords) {
  const apiKey = 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImM3NjIxZWE0MDZhZjRmYWJhYzRmNWM5NDlkOWU5YWYyIiwiaCI6Im11cm11cjY0In0=';
  const url = 'https://api.openrouteservice.org/v2/directions/foot-walking/geojson';
  const body = { coordinates: coords.map(([lat, lng]) => [lng, lat]) };
  const headers = {
    'Authorization': apiKey,
    'Content-Type': 'application/json',
  };
  const response = await axios.post(url, body, { headers });
  return response.data.features[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
}

function FitMapBounds({ bounds }) {
  const map = useMap();
  React.useEffect(() => {
    if (bounds && bounds.length) {
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [bounds, map]);
  return null;
}

export default function TrailMap({ points = [], trails = [] }) {
  const [snappedPaths, setSnappedPaths] = React.useState({});
  const [bounds, setBounds] = React.useState(null);

  const pointCoords = points
    .map(pt => {
      const lat = pt.attributes?.latitude;
      const lng = pt.attributes?.longitude;
      return lat && lng ? [lat, lng] : null;
    })
    .filter(Boolean);


  React.useEffect(() => {
    let cancelled = false;
    async function fetchAllSnapped() {
      const newSnapped = {};
      let allTrailCoords = [];

      for (const trail of trails) {
        const path = Array.isArray(trail.path) ? trail.path : [];
        if (path.length < 2) continue;
        try {
          const snapped = await getSnappedRoute(path);
          if (!cancelled) {
            newSnapped[trail.id] = snapped;
            allTrailCoords = [...allTrailCoords, ...snapped];
          }
        } catch (e) {
          if (!cancelled) {
            newSnapped[trail.id] = path;
            allTrailCoords = [...allTrailCoords, ...path];
          }
        }
      }

      if (!cancelled) {
        setSnappedPaths(newSnapped);
        const all = [...pointCoords, ...allTrailCoords];
        if (all.length) {
          const bounds = L.latLngBounds(all);
          setBounds(bounds);
        }
      }
    }

    if (trails.length > 0) fetchAllSnapped();
    return () => { cancelled = true; };
  }, [trails]);

  return (
    <Box
      sx={{
        width: '100%',
        height: { xs: 390, sm: 470, md: 550 },
        my: 4,
        borderRadius: 5,
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #e3f0ff 0%, #f8fafc 100%)',
        boxShadow: '0 8px 32px 0 rgba(49,130,206,0.13), 0 1.5px 6px 0 rgba(49,130,206,0.10)',
        border: '2px solid #e3e8f0',
        position: 'relative',
      }}
    >
      <Paper elevation={0} sx={{ height: '100%', width: '100%', borderRadius: 0, boxShadow: 'none' }}>
        <MapContainer center={[39.1, 23.7]} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {bounds && <FitMapBounds bounds={bounds} />}

          {points.map(pt => {
            const lat = pt.attributes?.latitude;
            const lng = pt.attributes?.longitude;
            if (!lat || !lng) return null;
            const isIntermediate = pt.attributes.type === 'intermediate';
            return (
              <Marker
                key={pt.id}
                position={[lat, lng]}
                icon={isIntermediate ? intermediateIcon : transparentIcon}
              >
                <Tooltip
                  direction="top"
                  offset={[0, 0]}
                  className="map-label"
                  opacity={1}
                >
                  <span style={{
                    fontFamily: 'inherit',
                    fontWeight: 400,
                    fontSize: '0.8rem',
                    color: '#080e13ff',
                    padding: '2px 10px',
                  }}>
                    {pt.attributes.title}
                  </span>
                </Tooltip>
              </Marker>
            );
          })}

          {trails.map((trail) => {
            const color = getTrailColor();
            const path = Array.isArray(trail.path) ? trail.path : [];
            const snapped = snappedPaths[trail.id] || path;
            const start = snapped[0];
            const end = snapped[snapped.length - 1];

            return (
              <React.Fragment key={trail.id}>
                <Polyline
                  positions={snapped}
                  pathOptions={{
                    color,
                    weight: 6,
                    opacity: 0.85,
                    lineJoin: 'round',
                    lineCap: 'round',
                    dashArray: trail.type === 'biking' ? '8 8' : undefined,
                  }}
                  smoothFactor={2}
                />
                {start && <Marker position={start} icon={startIcon} />}
                {end && <Marker position={end} icon={endIcon} />}
              </React.Fragment>
            );
          })}
        </MapContainer>
      </Paper>
    </Box>
  );
}
