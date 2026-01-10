import React from 'react';
import { Box, Typography } from '@mui/material';

function PlaceholderPage({ title }) {
  return (
    <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <Typography variant="h4" color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        This page is under construction.
      </Typography>
    </Box>
  );
}

export default function Users() { return <PlaceholderPage title="Users" />; }
