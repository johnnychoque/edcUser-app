import { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import config from '../config.js'
import { useNavigate } from 'react-router-dom';

const Polling = ({ redirectTo, event, pollInterval = 5000 }) => {
  const [status, setStatus] = useState('pending');
  const [isPolling, setIsPolling] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const pollBackend = async () => {
      if (!isPolling) return;

      try {
        const response = await axios.get(
          `${config.api.host}:${config.api.port}/event/checkstatus?event=${event}`,
          { withCredentials: true }
        );
        if (response.data.status === 'completed') {
          setStatus('completed');
          setIsPolling(false);
          // Redirigir después de un breve retraso para permitir que se muestre el mensaje de completado
          setTimeout(() => navigate(redirectTo), 1500);
        } else {
          // Continuar el polling después del intervalo especificado
          setTimeout(pollBackend, pollInterval);
        }
      } catch (error) {
        console.error('Error polling backend:', error);
        setIsPolling(false);
      }
    };

    pollBackend();

    // Limpiar el polling cuando el componente se desmonte
    return () => setIsPolling(false);
  }, [isPolling, event, pollInterval, redirectTo, navigate]);

  return (
    <div>
      {status === 'pending' && (
        <CircularProgress />
      )}
    </div>
  );
};

export default Polling;