import { TextField, Button, Stack } from '@mui/material';
import config from '../config.js'

const AssetParametersTable = ({ selectedAssetType, onSubmit }) => {
  return (
    <Stack 
      component="form" 
      onSubmit={onSubmit} 
      spacing={2} 
      sx={{ width: '100%', maxWidth: 300, margin: 'auto' }}
    >
      <TextField
        value={selectedAssetType?.name || ''}
        label="Asset Type"
        variant="outlined"
        helperText="Asset Type already selected"
        fullWidth
        slotProps={{
          input: {
            readOnly: true,
          },
        }}
        sx={{
          '& .MuiInputBase-root': {
            backgroundColor: 'rgba(255, 255, 255, 0.15)', // Fondo blanco muy ligero
            '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 0, 0, 0.23)', // Color del borde por defecto
            },
          },
        }}
      />
      <TextField
        name="content"
        label="Asset Public Endpoint"
        variant="outlined"
        defaultValue={ config.provider.publicUrl }
        helperText="Consumer requests assets at this endpoint"
        fullWidth
        required
      />
      <TextField
        name="contentType"
        label="Content Type"
        variant="outlined"
        defaultValue="application/json"
        helperText="Media type of assets"
        fullWidth
        required
      />
      <Button 
        type="submit" 
        variant="contained" 
        color="primary" 
        fullWidth
      >
        Create Asset
      </Button>
    </Stack>
  );
};

export default AssetParametersTable;