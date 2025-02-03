import { Box, Typography } from '@mui/material';

const JSONViewer = ({ data }) => {
  return (
    <Box
      sx={{
        width: '600px',
        height: '410px',
        overflow: 'auto',
        border: '2px solid green',
        padding: '10px',
      }}
    >
      <Typography 
        component="pre" 
        sx={{ 
          whiteSpace: 'pre-wrap', 
          wordWrap: 'break-word',
          textAlign: 'left',
          fontFamily: 'monospace',
          fontSize: '12px', 
        }}
      >
        {JSON.stringify(data, null, 2)}
      </Typography>
    </Box>
  );
};

export default JSONViewer;
