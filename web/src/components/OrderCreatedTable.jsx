import { TextField, Button, Stack } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const orderCreatedTable = ({ order, onSubmit }) => {
  return (
    <Stack 
      component="form" 
      onSubmit={onSubmit} 
      spacing={2} 
      sx={{ width: '100%', maxWidth: 300, margin: 'auto' }}
    >
      <TextField
        value={order.id}
        label="Order ID"
        variant="outlined"
        helperText="ID of order created"
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
        value={order.orderItem[0].productOffering.id}
        label="Product ID"
        variant="outlined"
        helperText="Product included in the order"
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
        value={order.orderItem[0].product.productCharacteristic.find(
          char => char.name === "Asset type")?.value}
        label="Asset Type"
        variant="outlined"
        helperText="Asset Type included in the order"
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
        value={order.orderItem[0].product.productCharacteristic.find(
          char => char.name === "Location")?.value}
        label="Asset Public Endpoint"
        variant="outlined"
        helperText="Provider endpoint to get the assets"
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

export default orderCreatedTable;