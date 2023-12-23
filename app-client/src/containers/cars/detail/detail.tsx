import { Box, Typography, Stack, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import CommonPage from '../../../components/common-page/common-page';
import { useDetail } from './detail.hooks';

export default function carDetail() {
  const { id } = useParams<{ id?: string }>();
  const { car, fileItem, loading } = useDetail(id || '');

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!car) {
    return <Typography>Car not found.</Typography>;
  }

  return (
    <CommonPage withBack title="Car Detail">
      <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
        <Stack spacing={2}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Detail Information</Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Box sx={{ width: '100%' }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Plate</Typography>
              <Typography variant="body1">{car.plate}</Typography>

              <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>Manufacture</Typography>
              <Typography variant="body1">{car.manufacture}</Typography>

              <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>Model</Typography>
              <Typography variant="body1">{car.model}</Typography>

              <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>Rent Per Day</Typography>
              <Typography variant="body1">{car.rentPerDay}</Typography>

              <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>Capacity</Typography>
              <Typography variant="body1">{car.capacity}</Typography>

              <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>Description</Typography>
              <Typography variant="body1">{car.description}</Typography>

              <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>Available At</Typography>
              <Typography variant="body1">{car.availableAt}</Typography>

              <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>Transmission</Typography>
              <Typography variant="body1">{car.transmission}</Typography>

              <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>Available</Typography>
              <Typography variant="body1">{car.available ? 'Yes' : 'No'}</Typography>

              <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>Type</Typography>
              <Typography variant="body1">{car.type}</Typography>

              <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>Year</Typography>
              <Typography variant="body1">{car.year}</Typography>

              <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>Options</Typography>
              <Typography variant="body1">{car.options?.join(', ')}</Typography>

              <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>Specs</Typography>
              <Typography variant="body1">{car.specs?.join(', ')}</Typography>
            </Box>

            {fileItem && fileItem.url && (
              <Box sx={{ width: '100%' }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>Car Image</Typography>
                <img
                  src={fileItem.secure_url}
                  alt="Car Image"
                  style={{ width: '100%', objectFit: 'cover', marginTop: '8px' }}
                />
              </Box>
            )}
          </Stack>
        </Stack>
      </Paper>
    </CommonPage>
  );
}
