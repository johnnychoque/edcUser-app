import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper
} from '@mui/material';
import { useOfferingStore } from '../store/offeringStore';

const OfferListTable = ({ data }) => {
  const selectedOffer = useOfferingStore(state => state.selectedOffer);
  const setSelectedOffer = useOfferingStore(state => state.setSelectedOffer);
  
  const handleRowClick = (row) => {
    setSelectedOffer(row);
  };

  return (
    <>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
          <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Href</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              onClick={() => handleRowClick(row)}
              selected={selectedOffer && selectedOffer.id === row.id}
              hover
              sx={{ cursor: 'pointer' }}
            >
              <TableCell component="th" scope="row">{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.href}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default OfferListTable;