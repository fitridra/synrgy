import { Box, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CommonPage from '../../../components/common-page/common-page';
import { CloudUpload } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useUpdate } from './update.hooks';
import { VisuallyHiddenInput } from './update.styled';

export default function Update() {
  const {
    formValues,
    loadingImage,
    loadingSubmit,
    fileItem,
    handleUploadImage,
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
          name="plate"
          size="small"
          sx={{ width: '100%', mb: 3 }}
          label="Plate"
          placeholder="ex: DBH-3491"
          value={formValues.plate}
          onChange={(e) => handleFormChange('plate', e.target.value)}
        />
        <TextField
          name="manufacture"
          size="small"
          sx={{ width: '100%', mb: 3 }}
          label="Manufacture"
          placeholder="ex: Ford"
          value={formValues.manufacture}
          onChange={(e) => handleFormChange('manufacture', e.target.value)}
        />
        <TextField
          name="model"
          size="small"
          sx={{ width: '100%', mb: 3 }}
          label="Model"
          placeholder="ex: F150"
          value={formValues.model}
          onChange={(e) => handleFormChange('model', e.target.value)}
        />
        <TextField
          name="rentPerDay"
          size="small"
          sx={{ width: '100%', mb: 3 }}
          label="Rent Per Day"
          placeholder="ex: 200000"
          value={formValues.rentPerDay}
          type="number"
          onChange={(e) => handleFormChange('rentPerDay', e.target.value)}
        />
        <TextField
          name="capacity"
          size="small"
          sx={{ width: '100%', mb: 3 }}
          label="Capacity"
          placeholder="ex: 2"
          value={formValues.capacity}
          type="number"
          onChange={(e) => handleFormChange('capacity', e.target.value)}
        />
        <TextField
          name="description"
          size="small"
          sx={{ width: '100%', mb: 3 }}
          label="Description"
          placeholder="ex: Brake assist. Leather-wrapped shift knob..."
          multiline
          rows={4}
          value={formValues.description}
          onChange={(e) => handleFormChange('description', e.target.value)}
        />
        <TextField
          name="availableAt"
          size="small"
          sx={{ width: '100%', mb: 3 }}
          label="Available At"
          placeholder="ex: 2022-03-23T15:49:05.563Z"
          type="datetime-local"
          value={formValues.availableAt}
          onChange={(e) => handleFormChange('availableAt', e.target.value)}
        />
        <TextField
          name="transmission"
          size="small"
          sx={{ width: '100%', mb: 3 }}
          label="Transmission"
          placeholder="ex: Automatic"
          value={formValues.transmission}
          onChange={(e) => handleFormChange('transmission', e.target.value)}
        />

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="available-label">Available</InputLabel>
          <Select
            labelId="available-label"
            id="available"
            value={formValues.available}
            label="Available"
            onChange={(e) => handleFormChange('available', e.target.value)}
          >
            <MenuItem value="true">Yes</MenuItem>
            <MenuItem value="false">No</MenuItem>
          </Select>
        </FormControl>

        <TextField
          name="type"
          size="small"
          sx={{ width: '100%', mb: 3 }}
          label="Type"
          placeholder="ex: Sedan"
          value={formValues.type}
          onChange={(e) => handleFormChange('type', e.target.value)}
        />
        <TextField
          name="year"
          size="small"
          sx={{ width: '100%', mb: 3 }}
          label="Year"
          placeholder="ex: 2022"
          value={formValues.year}
          type="number"
          onChange={(e) => handleFormChange('year', e.target.value)}
        />
        <TextField
          name="options"
          size="small"
          sx={{ width: '100%', mb: 3 }}
          label="Options"
          placeholder="ex: Cruise Control, Tinted Glass, AM/FM Stereo"
          value={formValues.options ? formValues.options.join(', ') : ''}
          onChange={(e) => handleFormChange('options', e.target.value)}
        />
        <TextField
          name="specs"
          size="small"
          sx={{ width: '100%', mb: 3 }}
          label="Specs"
          placeholder="ex: Brake assist, Leather-wrapped shift knob"
          value={formValues.specs ? formValues.specs.join(', ') : ''}
          onChange={(e) => handleFormChange('specs', e.target.value)}
        />
        <LoadingButton
          component="label"
          variant="contained"
          startIcon={<CloudUpload />}
          sx={{ mb: 3 }}
          loading={loadingImage}
        >
          Upload Car Photo
          <VisuallyHiddenInput
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={handleUploadImage}
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
