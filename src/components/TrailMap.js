import { useEffect, useState } from 'react';
import { Box, Paper, Typography, Dialog, DialogTitle, DialogContent } from '@mui/material';
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-gpx';

// Custom orange icon for all points
const createIcon = (url) =>
  new L.Icon({
    iconUrl: url,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

const icons = {
  default: createIcon(process.env.PUBLIC_URL + '/placeholder.png'),
};

// Fit map bounds to GPX files, but do NOT show GPX markers
function FitMapToAllGPX({ gpxUrls = [], points = [] }) {
  const map = useMap();

  useEffect(() => {
    if (gpxUrls.length === 0) return;

    const group = L.featureGroup().addTo(map);
    const gpxLayers = [];

    const promises = gpxUrls.map(
      (url) =>
        new Promise((resolve) => {
          const gpx = new L.GPX(url, {
            async: true,
            markers: {
            startIcon: null,
            endIcon: null,
            shadow: null
        },
            
            polyline_options: {
              color: '#3182ce',
              weight: 5,
              opacity: 0.9,
              lineCap: 'round',
              lineJoin: 'round',
            },
          });

          gpx.on('loaded', () => {
            group.addLayer(gpx);
            gpxLayers.push(gpx);
            resolve();
          });

          gpx.addTo(map);
        })
    );

    Promise.all(promises).then(() => {
      // Collect all point coordinates
      const pointLatLngs = points
        .map(pt => {
          const lat = pt.attributes?.latitude;
          const lng = pt.attributes?.longitude;
          return lat && lng ? L.latLng(lat, lng) : null;
        })
        .filter(Boolean);

      // Combine GPX bounds and point bounds
      let bounds = group.getBounds();
      if (pointLatLngs.length > 0) {
        bounds = bounds.extend(L.latLngBounds(pointLatLngs));
      }
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [40, 40] });
      }
    });

    return () => {
      gpxLayers.forEach((gpx) => group.removeLayer(gpx));
      map.removeLayer(group);
    };
  }, [gpxUrls, map, points]);

  return null;
}

export default function TrailMap({ points = [], trails = [] }) {
  const [selectedPoint, setSelectedPoint] = useState(null);
  const gpxUrls = trails
    .map((trail) => trail?.attributes?.gpx?.data?.attributes?.url)
    .filter((url) => typeof url === 'string' && url.endsWith('.gpx'))
    .map((url) => `https://skopelos-admin.inculture.app${url}`);

  return (
    <>
      <Box sx={{ width: '100%', height: { xs: 390, sm: 470, md: 550 }, my: 4 }}>
        <Paper elevation={0} sx={{ height: '100%', width: '100%' }}>
          <MapContainer center={[39.145, 23.725]} // Central coordinates for Skopelos island
            zoom={12}  style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <FitMapToAllGPX gpxUrls={gpxUrls} points={points} />

            {points.map((pt) => {
              const lat = pt.attributes?.latitude;
              const lng = pt.attributes?.longitude;
              if (!lat || !lng) return null;

              return (
                <Marker
                  key={pt.id}
                  position={[lat, lng]}
                  icon={icons.default}
                  eventHandlers={{
                    click: () => setSelectedPoint(pt),
                  }}
                >
                  <Tooltip
                    direction="top"
                    offset={[0, 0]}
                    className="map-label"
                    opacity={1}
                  >
                    <span style={{ fontStyle: 'italic', fontSize: '1rem', color: '#064828ff', fontWeight: 550 }}>
                      {pt.attributes.title}
                    </span>
                  </Tooltip>
                </Marker>
              );
            })}
          </MapContainer>
        </Paper>
      </Box>

      {/* Modal/Popup for details */}
      <Dialog open={Boolean(selectedPoint)} onClose={() => setSelectedPoint(null)} fullWidth maxWidth="sm">
        <DialogTitle>{selectedPoint?.attributes?.title}</DialogTitle>
        <DialogContent>
          <Typography variant="caption" sx={{ mt: 2, display: 'flex', color: 'blue' }}>
            Συντεταγμένες: {selectedPoint?.attributes?.latitude}, {selectedPoint?.attributes?.longitude}
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
}