import { Grid2, Paper, Typography, Box } from '@mui/material';

const UserTable = ({ data }) => {
  return (
    <Paper sx={{ padding: 2, maxWidth: 600, margin: 'auto' }}>
      <Grid2 container direction="column" spacing={2}>
        {Object.entries(data).map(([key, value]) => (
          <Grid2 container key={key}>
            <Grid2 xs={6}>
              <Box display="flex" justifyContent="flex-end" pr={2}>
                <Typography variant="body1" fontWeight="bold">
                  {key}:
                </Typography>
              </Box>
            </Grid2>
            <Grid2 xs={6}>
              <Box display="flex" justifyContent="flex-start">
                <Typography variant="body1">
                  {value}
                </Typography>
              </Box>
            </Grid2>
          </Grid2>
        ))}
      </Grid2>
    </Paper>
  );
};

export default UserTable;