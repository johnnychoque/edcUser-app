import { TextField, Button, Stack } from '@mui/material';

const OrderParamsTable = ({ params, onSubmit }) => {
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
        helperText="ID of offering selected"
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
        helperText="Product included in Offering"
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
        value={params.userId}
        label="User ID"
        variant="outlined"
        helperText="User creating the order"
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
        value={params.userEmail}
        label="User Email"
        variant="outlined"
        helperText="Email used as contact"
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
      <Button 
        type="submit" 
        variant="contained" 
        color="primary" 
        fullWidth
      >
        Create Order
      </Button>
    </Stack>
  );
};

export default OrderParamsTable;