import { TextField, Button, Stack } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const OfferingCreatedTable = ({ params, onSubmit }) => {
  return (
    <Stack 
      component="form" 
      onSubmit={onSubmit} 
      spacing={2} 
      sx={{ width: '100%', maxWidth: 300, margin: 'auto' }}
    >
      <TextField
        value={params.offerId}
        label="Offering ID"
        variant="outlined"
        helperText="ID of offering created"
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
        value={params.offerName}
        label="Offering Name"
        variant="outlined"
        helperText="Name of offering created"
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
        value={params.offerDescrip}
        label="Offering Description"
        variant="outlined"
        helperText="Description of offering created"
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
        value={params.prodId}
        label="Product ID"
        variant="outlined"
        helperText="Product included in offering created"
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
      <Alert severity="info">
        <AlertTitle sx={{ textAlign: 'left' }}>BAE process completed</AlertTitle>
        Go to EDC process.
      </Alert>
      <Button 
        type="submit" 
        variant="contained" 
        color="primary" 
        fullWidth
      >
        Continue
      </Button>
    </Stack>
  );
};

export default OfferingCreatedTable;