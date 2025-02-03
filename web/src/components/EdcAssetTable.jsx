import {
  Stack,
  Button,
  TextField
} from '@mui/material';

const EdcAssetTable = ({ prod, onSubmit }) => {
  const getSlotProps = () => ({
    input: {
      readOnly: true,
    },
  });

  const getSx = () => ({
    '& .MuiInputBase-root': {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(0, 0, 0, 0.23)',
      },
    },
  });

  return (
      <Stack 
      component="form" 
      onSubmit={onSubmit} 
      spacing={2} 
      sx={{ width: '100%', maxWidth: 300, margin: 'auto' }}
    >
      <TextField
        value={prod.id || ''}
        label="Offering ID"
        variant="outlined"
        fullWidth
        slotProps={getSlotProps()}
        sx={getSx()}
      />
      <TextField
        value={prod.name || ''}
        label="Offering Name"
        variant="outlined"
        fullWidth
        slotProps={getSlotProps()}
        sx={getSx()}
      />
      <TextField
        value={prod.description || ''}
        label="Offering Description"
        variant="outlined"
        fullWidth
        slotProps={getSlotProps()}
        sx={getSx()}
      />
      <TextField
        value={prod.content || ''}
        label="EDC Public Endpoint"
        variant="outlined"
        fullWidth
        slotProps={getSlotProps()}
        sx={getSx()}
      />
      <TextField
        value={prod.contenttype || ''}
        label="Media Type of Assets"
        variant="outlined"
        fullWidth
        slotProps={getSlotProps()}
        sx={getSx()}
      />
      <TextField
        name="provDataUrl"
        label="Provider Datastore URL"
        variant="outlined"
        defaultValue="https://jsonplaceholder.typicode.com/users"
        helperText="Internal URL where provider stores the data"
        fullWidth
        required
      />
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

export default EdcAssetTable;