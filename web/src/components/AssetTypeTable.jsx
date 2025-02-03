import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper
} from '@mui/material';
import useAssetStore from '../store/assetStore';

const AssetTypeTable = ({ data }) => {
  const { selectedAssetType, setSelectedAssetType } = useAssetStore();

  const handleRowClick = (row) => {
    setSelectedAssetType(row);
  };

  return (
    <>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
          <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Href</TableCell>
            <TableCell>Version</TableCell>
            <TableCell>Formats</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              onClick={() => handleRowClick(row)}
              selected={selectedAssetType && selectedAssetType.id === row.id}
              hover
              sx={{ cursor: 'pointer' }}
            >
              <TableCell component="th" scope="row">{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.href}</TableCell>
              <TableCell>{row.version}</TableCell>
              <TableCell>{row.formats}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default AssetTypeTable;
