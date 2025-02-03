// Lista de eventos soportados
const supportedEvents = [ "ContractNegotiationVerified", 
                          "ContractNegotiationFinalized",
                          "TransferProcessInitiated",
                          "TransferProcessStarted"
                        ];

// Objeto para almacenar el estado de cada evento
let eventStatus = {};
supportedEvents.forEach(event => {
  eventStatus[event] = 'pending';
});

const handleApiError = (error, next, customErrorMessage) => {
  if (error.response) {
    const customError = new Error(customErrorMessage || 'Error en la llamada al API');
    customError.status = error.response.status;
    customError.responseBody = error.response.data;
    next(customError);
  } else if (error.request) {
    console.log(error.request);
    next(new Error('No se recibió respuesta del servidor'));
  } else {
    console.log('Error', error.message);
    next(error);
  }
};

export class EventController {

  static async checkStatus (req, res, next) {
    const { event } = req.query;
    console.log('Recibido en checkstatus el evento', event);
    try {
      if (!event || !supportedEvents.includes(event)) {
        return res.status(400).json({ error: 'Invalid or missing event type' });
      }
      res.json({ status: eventStatus[event] });
    } catch (error) {
      handleApiError(
        error, 
        next, 
        'Error en la llamada al API EVENT checkStatus'
      );
    }
  }

  static async updateStatus (req, res, next) {
    const { event } = req.body;
    console.log('Recibido en updateStatus', req.body);
    try {
      if (!event || !supportedEvents.includes(event)) {
        console.log('DSP Event not included in the list:', event);
        return res.status(400).json({ error: 'DSP Event not included in the list' });
      }
      eventStatus[event] = 'completed';
      console.log("Status updated successfully for DSP event", event);
      res.json({ message: `Status updated successfully for ${event}` });
    } catch (error) {
      handleApiError(
        error, 
        next, 
        'Error en la llamada al API EVENT updateStatus'
      );
    }
  }
  
  static async resetStatus (req, res, next) {
    const { event } = req.body;
    try {
      if (event && supportedEvents.includes(event)) {
        eventStatus[event] = 'pending';
        res.json({ message: `Status reset to pending for ${event}` });
      } else if (!event) {
        supportedEvents.forEach(evt => {
          eventStatus[evt] = 'pending';
        });
        res.json({ message: 'All event statuses reset to pending' });
      } else {
        res.status(400).json({ error: 'Invalid event type' });
      }
    } catch (error) {
      handleApiError(
        error, 
        next, 
        'Error en la llamada al API EVENT resetStatus'
      );
    }
  }

}