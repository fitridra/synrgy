import {
  Box,
  Button,
  CircularProgress,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { parseISO, format } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import { HeaderElementStyled, SearchContainer, CreateButtonContainer } from './list.styled';
import useAction from './list.hooks';
import { ICars } from '../cars.types';
import CommonPage from '../../../components/common-page/common-page';
import SearchIcon from '@mui/icons-material/Search';
import { Add as AddIcon } from '@mui/icons-material';

export default function List() {
  const navigate = useNavigate();
  const {
    cars,
    loading,
    setParams,
    params,
    meta,
    handleEdit,
    handleRemove,
    handleSearch,
  } = useAction();

  const renderLoading = () => (
    <TableRow>
      <TableCell colSpan={6} align="center">
        <CircularProgress />
      </TableCell>
    </TableRow>
  );

  const renderContent = () =>
    cars?.map((record: ICars) => (
      <TableRow
        key={record.id}
        sx={{
          '&:last-child td, &:last-child th': { border: 0 },
          '&:hover': {
            cursor: 'pointer',
            backgroundColor: '#f0f0f0',
          },
          position: 'relative',
        }}
        onClick={() => navigate(`/detail/${record.id}`)}
      >
        <TableCell component="th">
          <Box sx={{ mb: 1 }}>{record.name}</Box>
        </TableCell>

        <TableCell>{record.price}</TableCell>
        <TableCell>
          {format(parseISO(`${record.createdAt}`), 'dd/MM/yyyy HH:mm:ss')}
        </TableCell>
        <TableCell>
          <Stack
            direction={'row'}
            justifyContent={'center'}
            alignItems={'center'}
            sx={{
              height: '100%',
            }}
            gap={1}
          >
            <Button
              type="button"
              variant="contained"
              color="error"
              onClick={(e) => handleRemove(e, record)}
            >
              Remove
            </Button>
            <Button
              type="button"
              variant="outlined"
              onClick={(e) => handleEdit(e, record)}
            >
              Edit
            </Button>
          </Stack>
        </TableCell>
     </TableRow>
    ));

    return (
      <CommonPage
        title="Cars"
        actionElement={
          <HeaderElementStyled>
            <SearchContainer>
              <TextField
                name="search"
                placeholder="Search cars name"
                onChange={handleSearch}
                size="small"
                variant="outlined"
              />
              <SearchIcon className="search-icon"/>
            </SearchContainer>
            <CreateButtonContainer>
              <Link to={'/create'}>
                <Button type="button" variant="contained" color="primary">
                  <AddIcon /> Create New
                </Button>
              </Link>
            </CreateButtonContainer>
          </HeaderElementStyled>
        }
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="cars table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Price</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Created At</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{loading ? renderLoading() : renderContent()}</TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={meta?.totalPages || 1}
            variant="outlined"
            shape="rounded"
            color="primary"
            siblingCount={1}
            boundaryCount={1}
            showFirstButton
            showLastButton
            onChange={(_, page: number) => {
              setParams({
                ...params,
                page,
              });
            }}
          />
        </Box>
      </CommonPage>
    );
  }