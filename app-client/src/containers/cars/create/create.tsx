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
    handleUploadPhoto,
    loadingPhoto,
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
          name="name"
          size="small"
          sx={{ width: '100%', mb: 3 }}
          label="Name"
          onChange={(e) =>
            setFormValues({
              ...formValues,
              name: e.target.value,
            })
          }
          value={formValues?.name}
        />
        <TextField
          name="price"
          size="small"
          sx={{ width: '100%', mb: 3 }}
          label="Price"
          type="number"
          onChange={(e) =>
            setFormValues({
              ...formValues,
              price: Number(e.target.value),
            })
          }
        />
        <FormControl fullWidth>
          <InputLabel id="size-label">Select Size</InputLabel>
          <Select
            labelId="size-label"
            sx={{ width: '100%', mb: 3 }}
            size="small"
            id="size-select"
            name="sizes_id"
            label="Select Size"
            onChange={(e) =>
              setFormValues({
                ...formValues,
                sizes_id: Number(e.target.value),
              })
            }
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