import { Box, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CommonPage from '../../../components/common-page/common-page';
import { CloudUpload } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import useAction from './create.hooks';
import { VisuallyHiddenInput } from './create.styled';

export default function Create() {

  const {
    formValues,
    handleSubmit,
    handleUploadImage,
    loadingImage,
    loadingSubmit,
    setFormValues,
    fileItem,
  } = useAction();

  return (
    <CommonPage
      withBack
      component={'form'}
      title="Create new car"
      actionElement={
        <LoadingButton
          type="submit"
          variant="contained"
          loading={loadingSubmit}
        >
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
          onChange={(e) =>
              setFormValues({
                  ...formValues,
                  plate: e.target.value,
              })
          }
        />
        <TextField
          name="manufacture"
          size="small"
          sx={{ width: '100%', mb: 3 }}
          label="Manufacture"
          placeholder="ex: Ford"
          onChange={(e) =>
              setFormValues({
                  ...formValues,
                  manufacture: e.target.value,
              })
          }
        />
        <TextField
          name="model"
          size="small"
          sx={{ width: '100%', mb: 3 }}
          label="Model"
          placeholder="ex: F150"
          onChange={(e) =>
              setFormValues({
                  ...formValues,
                  model: e.target.value,
              })
          }
        />
        <TextField
          name="rentPerDay"
          size="small"
          sx={{ width: '100%', mb: 3 }}
          label="Rent Per Day"
          placeholder="ex: 200000"
          type="number"
          onChange={(e) =>
            setFormValues({
              ...formValues,
              rentPerDay: Number(e.target.value),
            })
          }
        />
        <TextField
          name="capacity"
          size="small"
          sx={{ width: '100%', mb: 3 }}
          label="Capacity"
          placeholder="ex: 2"
          type="number"
          onChange={(e) =>
            setFormValues({
              ...formValues,
              capacity: Number(e.target.value),
            })
          }
        />
        <TextField
          name="description"
          size="small"
          sx={{ width: '100%', mb: 3 }}
          label="Description"
          placeholder="ex: Brake assist. Leather-wrapped shift knob..."
          multiline
          rows={4}
          onChange={(e) =>
            setFormValues({
              ...formValues,
              description: e.target.value,
            })
          }
        />
        <TextField
          name="availableAt"
          size="small"
          sx={{ width: '100%', mb: 3 }}
          label="Available At"
          placeholder="ex: 2022-03-23T15:49:05.563Z"
          type="datetime-local"
          onChange={(e) =>
            setFormValues({
              ...formValues,
              availableAt: e.target.value,
            })
          }
        />
        <TextField
          name="transmission"
          size="small"
          sx={{ width: '100%', mb: 3 }}
          label="Transmission"
          placeholder="ex: Automatic"
          onChange={(e) =>
            setFormValues({
              ...formValues,
              transmission: e.target.value,
            })
          }
        />

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="available-label">Available</InputLabel>
          <Select
            labelId="available-label"
            id="available"
            label="Available"
            onChange={(e) =>
              setFormValues({
                ...formValues,
                available: e.target.value === 'true',
              })
            }
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
          onChange={(e) =>
            setFormValues({
              ...formValues,
              type: e.target.value,
            })
          }
        />
        <TextField
          name="year"
          size="small"
          sx={{ width: '100%', mb: 3 }}
          label="Year"
          placeholder="ex: 2022"
          type="number"
          onChange={(e) =>
            setFormValues({
              ...formValues,
              year: e.target.value,
            })
          }
        />
        <TextField
          name="options"
          size="small"
          sx={{ width: '100%', mb: 3 }}
          label="Options"
          placeholder="ex: Cruise Control, Tinted Glass, AM/FM Stereo"
          onChange={(e) =>
            setFormValues({
              ...formValues,
              options: e.target.value.split(',').map((option) => option.trim()),
            })
          }
        />
        <TextField
          name="specs"
          size="small"
          sx={{ width: '100%', mb: 3 }}
          label="Specs"
          placeholder="ex: Brake assist, Leather-wrapped shift knob"
          onChange={(e) =>
            setFormValues({
              ...formValues,
              specs: e.target.value.split(',').map((spec) => spec.trim()),
            })
          }
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