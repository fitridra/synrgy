import { Box, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CommonPage from '../../../components/common-page/common-page';
import { CloudUpload } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useUpdate } from './update.hooks';
import { VisuallyHiddenInput } from './update.styled';

export default function Update() {
  const {
    formValues,
    loadingPhoto,
    loadingSubmit,
    fileItem,
    handleUploadPhoto,
    handleFormChange,
    handleSubmit,
  } = useUpdate();

  return (
    <CommonPage
      withBack
      component={'form'}
      title="Update Car"
      actionElement={
        <LoadingButton type="submit" variant="contained" loading={loadingSubmit}>
          Submit
        </LoadingButton>
      }
      onSubmit={handleSubmit}
    >
      <Box sx={{ width: '50%' }}>
        <TextField
          name="name"
          size="small"
          sx={{ width: '100%', mb: 3 }}
          label="Name"
          value={formValues.name}
          onChange={(e) => handleFormChange('name', e.target.value)}
        />
        <TextField
          name="price"
          size="small"
          sx={{ width: '100%', mb: 3 }}
          label="Price"
          value={formValues.price}
          onChange={(e) => handleFormChange('price', e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel id="size-label">Select Size</InputLabel>
          <Select
            labelId="size-label"
            id="size-select"
            sx={{ width: '100%', mb: 3 }}
            size="small"
            value={formValues.sizes_id}
            onChange={(e) => handleFormChange('sizes_id', e.target.value as string)}
            label="Select Size"
          >
            <MenuItem value="1">Small</MenuItem>
            <MenuItem value="2">Medium</MenuItem>
            <MenuItem value="3">Large</MenuItem>
          </Select>
        </FormControl>
        <LoadingButton
          component="label"
          variant="contained"
          startIcon={<CloudUpload />}
          sx={{ mb: 3 }}
          loading={loadingPhoto}
        >
          Upload Car Photo
          <VisuallyHiddenInput
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={handleUploadPhoto}
          />
        </LoadingButton>

        {fileItem && fileItem.url && (
          <Box>
            <img
              src={fileItem.secure_url}
              alt="preview"
              style={{ width: '100%', objectFit: 'cover' }}
            />
          </Box>
        )}
      </Box>
    </CommonPage>
  );
}
