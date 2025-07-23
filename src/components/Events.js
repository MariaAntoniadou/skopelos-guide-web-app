import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { getEventsDeep } from '../api/apiService';
import { skopelosColors } from '../styles/colors';
import {useTranslation} from "react-i18next";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const { t } = useTranslation();

  useEffect(() =>{
    getEventsDeep('el')
      .then(data => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const upcomingEvents = data.filter(event => {
          const eventDate = new Date(event.attributes.date);
          return eventDate >= today;
        });

        setEvents(upcomingEvents);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress size={50} />
      </Box>
    );

  return (
    <Box
      sx={{
        maxWidth: '100%',
        textAlign:'center',
        mt: 3,
        fontFamily: "'Roboto', sans-serif",
        color: '#222',
      }}
    >
    
      <Typography
        variant="h3"
        sx={{
          mb: 5,
          fontWeight: 500,
          letterSpacing: 4,
          color: skopelosColors.oceanBlue,
          textAlign: 'center',
          userSelect: 'none',
        }}
      >
        {t('events', { defaultValue: 'Εκδηλώσεις' })}
      </Typography>

      {events.length === 0 && (
        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            mt: 4,
            fontStyle: 'italic',
            color: '#666',
          }}
        >
          {t('noUpcomingEvents', { defaultValue: 'Δεν βρέθηκαν επερχόμενα events.' })}
        </Typography>
      )}

      {events.map(event => (
        <Box
          key={event.id}
          sx={{
            mb: 6,
            borderBottom: '1px solid #ddd',
            pb: 3,
            transition: 'background-color 0.3s ease',
            '&:hover': {
              backgroundColor: '#f5f9ff',
            },
            cursor: 'default',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 500,
              color: skopelosColors.oceanBlue,
              mb: 0.5,
              userSelect: 'text',
            }}
          >
            {event.attributes.title}
          </Typography>

          {event.attributes.thumbnail?.data?.attributes?.url && (
            <Box
              component="img"
              src={`https://skopelos-admin.inculture.app${event.attributes.thumbnail.data.attributes.url}`}
              alt={event.attributes.title}
              loading="lazy"
              sx={{
                width: '100%',
                maxWidth: 450,
                borderRadius: 2,
                my: 2,
                boxShadow: '0 3px 10px rgba(13, 71, 161, 0.15)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.03)',
                },
                userSelect: 'none',
              }}
            />
          )}

          <Typography
            variant="subtitle2"
            sx={{
              color: skopelosColors.oceanBlue,
              fontWeight: 700,
              mb: 1,
            }}
          >
            {new Date(event.attributes.date).toLocaleDateString('el-GR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: '#444',
              lineHeight: 1.6,
              userSelect: 'text',
              fontSize:{xs:18, sm:18, md:18},
            }}
            dangerouslySetInnerHTML={{ __html: event.attributes.description }}
          />
        </Box>
      ))}
    </Box>
  );
}
