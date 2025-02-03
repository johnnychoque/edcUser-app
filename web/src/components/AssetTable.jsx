import { Card, CardContent, Typography, Box } from '@mui/material';

const AssetTable = ({ data }) => {
  return (
    <Card sx={{ maxWidth: 400, margin: 'auto' }}>
      <CardContent>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">
            <strong>Asset Public Endpoint:</strong> {data.content} -
          </Typography>
          <Typography variant="body1">
            <strong>Content Type:</strong> {data.contentType} -
          </Typography>
          <Typography variant="body1">
            <strong>Asset ID:</strong> {data.assetId} -
          </Typography>
          <Typography variant="body1">
            <strong>Asset Type:</strong> {data.type} -
          </Typography>
          <Typography variant="body1">
            <strong>Asset Owner:</strong> {data.ownerId} -
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AssetTable;
