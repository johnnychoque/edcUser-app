import { Typography } from '@mui/material';

const EdcTitle = ({ title }) => {
  return (
    <Typography 
      sx={{
        fontSize: '1.5rem',  // 24px
        fontWeight: 700,
        lineHeight: 1.15,
        color: '#D4AF37'
      }}
      variant="h5"
    >
      {title}
    </Typography>
  );
};

export default EdcTitle;
