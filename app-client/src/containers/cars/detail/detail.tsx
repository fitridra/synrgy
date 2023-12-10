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
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Name</Typography>
              <Typography variant="body1">{car.name}</Typography>

              <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>Price</Typography>
              <Typography variant="body1">{car.price}</Typography>
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
