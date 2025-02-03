import { TextField, Button, Stack } from '@mui/material';

const productParametersTable = ({ productParameter, onSubmit }) => {
  return (
    <Stack 
      component="form" 
      onSubmit={onSubmit} 
      spacing={2} 
      sx={{ width: '100%', maxWidth: 300, margin: 'auto' }}
    >
      <TextField
        value={productParameter?.content || ''}
        label="Asset Public Endpoint"
        variant="outlined"
        helperText="Consumer requests assets at this endpoint"
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
        value={productParameter?.contentType || ''}
        label="Content Type"
        variant="outlined"
        helperText="Media type of assets to be requested"
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
        value={productParameter?.assetId || ''}
        label="Asset ID"
        variant="outlined"
        helperText="ID of asset already created"
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
        value={productParameter?.assetType || ''}
        label="Asset Type"
        variant="outlined"
        helperText="Type of asset already created"
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
        value={productParameter?.ownerId || ''}
        label="Owner ID"
        variant="outlined"
        helperText="ID of user who created the asset"
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
        name="productName"
        label="Product Name"
        variant="outlined"
        defaultValue="Data traffic"
        helperText="Name of the product to be created"
        fullWidth
        required
      />
      <Button 
        type="submit" 
        variant="contained" 
        color="primary" 
        fullWidth
      >
        Create Product
      </Button>
    </Stack>
  );
};

export default productParametersTable;