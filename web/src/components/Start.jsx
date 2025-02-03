import config from '../config.js'
import { Button } from '@mui/material'

const Start = () => {
  const handleClick = async () => {
    window.location.href = config.api.host+':'+config.api.port+'/auth/login';
  };

  return (
    <Button onClick={handleClick} variant='contained' sx={{ mt: 2 }}>
      Let's start
    </Button>
  );
};

export default Start;