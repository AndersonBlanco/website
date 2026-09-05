// RushEvents.tsx

import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import { Box, Paper, Typography } from '@mui/material';
import { Event as EventIcon, AccessTime as AccessTimeIcon, Place as PlaceIcon } from '@mui/icons-material';
import { FadeInSection } from './FadeInSection';  

interface RushEvent {
  _id?: string;
  Name: string;
  Day: string;
  EndDay?: string;
  Time: string;
  Location: string;
  Description: string;
}

/**
 * Parse a date string (e.g. "2025-09-13") as a local date,
 * avoiding timezone shift issues from UTC parsing.
 */
function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}

const dateFormatOptions: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
};

/**
 * Format the display date for an event.
 * Single-day: "Saturday, September 13"
 * Multi-day:  "Saturday, September 13 – Sunday, September 14"
 */
function formatEventDate(day: string, endDay?: string): string {
  const start = parseLocalDate(day);
  const startStr = start.toLocaleDateString('en-US', dateFormatOptions);

  if (!endDay || endDay === day) {
    return startStr;
  }

  const end = parseLocalDate(endDay);
  const endStr = end.toLocaleDateString('en-US', dateFormatOptions);
  return `${startStr} – ${endStr}`;
}

export function RushEvents({ events }: { events: RushEvent[] }) {
  return (
    <Timeline position="alternate">
      {events.map((event, index) => (
        <TimelineItem key={event._id ?? index}>
          <TimelineSeparator>
            <TimelineDot sx={{ backgroundColor: '#134b91', color: 'white' }}>
              <EventIcon />
            </TimelineDot>
            {index < events.length - 1 && <TimelineConnector />}
          </TimelineSeparator>

          <TimelineContent sx={{ py: 2 }}>
            {/* Wrap our card in the FadeInSection */}
            <FadeInSection>
              <Paper elevation={3} sx={{ p: 2, display: 'inline-block', maxWidth: '400px' }}>
                {/* Event Name */}
                <Box display="flex" justifyContent="center" alignItems="center" mb={0}>
                  <Typography
                    variant="h6"
                    component="h1"
                    gutterBottom
                    sx={{ textAlign: 'center', fontWeight: 'bold' }}
                  >
                    {event.Name}
                  </Typography>
                </Box>

                {/* Day & Time */}
                <Box display="flex" alignItems="center" gap={3} mb={1}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <AccessTimeIcon fontSize="small" />
                    <Typography variant="body2" sx={{ textAlign: 'left' }}>
                      {formatEventDate(event.Day, event.EndDay)}, {event.Time}
                    </Typography>
                  </Box>

                  {/* Location */}
                  <Box display="flex" alignItems="center" gap={1}>
                    <PlaceIcon fontSize="small" />
                    <Typography variant="body2" sx={{ textAlign: 'left' }}>
                      {event.Location}
                    </Typography>
                  </Box>
                </Box>

                {/* Description */}
                <Box display="flex" justifyContent="left" gap={0}>
                  <Typography variant="body2" sx={{ textAlign: 'left' }}>
                    {event.Description}
                  </Typography>
                </Box>
              </Paper>
            </FadeInSection>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
