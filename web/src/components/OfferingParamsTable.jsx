import { TextField, Button, Stack } from '@mui/material';

const offeringParamsTable = ({ productId, onSubmit }) => {
  return (
    <Stack 
      component="form" 
      onSubmit={onSubmit} 
      spacing={2} 
      sx={{ width: '100%', maxWidth: 300, margin: 'auto' }}
    >
      <TextField
        value={productId}
        label="Product ID"
        variant="outlined"
        helperText="ID of product created"
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
        name="offeringName"
        label="Offering Name"
        variant="outlined"
        defaultValue="Offer of Data traffic"
        helperText="Name of the offering to be created"
        fullWidth
        required
      />
      <TextField
        name="offeringDesc"
        label="Offering Description"
        variant="outlined"
        defaultValue="Data traffic of Santander"
        helperText="Description of the offering to be created"
        fullWidth
        required
      />
      <Button 
        type="submit" 
        variant="contained" 
        color="primary" 
        fullWidth
      >
        Create Offering
      </Button>
    </Stack>
  );
};

export default offeringParamsTable;