import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import List from './list';
import useAction from './list.hooks';

jest.mock('./list.hooks');

describe('List Component', () => {
  it('renders loading state', () => {
    (useAction as jest.Mock).mockReturnValue({
      cars: [],
      loading: true,
      setParams: jest.fn(),
      params: {},
      meta: {},
      handleEdit: jest.fn(),
      handleRemove: jest.fn(),
      handleSearch: jest.fn(),
    });

    render(
      <MemoryRouter>
        <List />
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders list of cars', async () => {
    const mockCars = [
      {
        id: '1',
        plate: 'ABC123',
        manufacture: 'Toyota',
        model: 'Camry',
        rentPerDay: 50,
        capacity: 5,
        available: true,
        type: 'Sedan',
        year: 2022,
      }
    ];

    (useAction as jest.Mock).mockReturnValue({
      cars: mockCars,
      loading: false,
      setParams: jest.fn(),
      params: {},
      meta: {},
      handleEdit: jest.fn(),
      handleRemove: jest.fn(),
      handleSearch: jest.fn(),
    });

    render(
      <MemoryRouter>
        <List />
      </MemoryRouter>
    );

    await waitFor(() => {
        expect(screen.getByText('Plate')).toBeInTheDocument();
        expect(screen.getByText('Manufacture')).toBeInTheDocument();
        expect(screen.getByText('Model')).toBeInTheDocument();
        expect(screen.getByText('Rent Per Day')).toBeInTheDocument();
        expect(screen.getByText('Capacity')).toBeInTheDocument();
        expect(screen.getByText('Available')).toBeInTheDocument();
        expect(screen.getByText('Type')).toBeInTheDocument();
        expect(screen.getByText('Year')).toBeInTheDocument();
  
        expect(screen.getByText('ABC123')).toBeInTheDocument();
        expect(screen.getByText('Toyota')).toBeInTheDocument();
        expect(screen.getByText('Camry')).toBeInTheDocument();
        expect(screen.getByText('50')).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();
        expect(screen.getByText('Yes')).toBeInTheDocument();
        expect(screen.getByText('Sedan')).toBeInTheDocument();
        expect(screen.getByText('2022')).toBeInTheDocument();
    });
  });

  it('handles search input change', async () => {
    const mockHandleSearch = jest.fn();
    (useAction as jest.Mock).mockReturnValue({
      cars: [],
      loading: false,
      setParams: jest.fn(),
      params: {},
      meta: {},
      handleEdit: jest.fn(),
      handleRemove: jest.fn(),
      handleSearch: mockHandleSearch,
    });

    render(
      <MemoryRouter>
        <List />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText('Search cars plate');
    fireEvent.change(searchInput, { target: { value: 'ABC' } });

    expect(mockHandleSearch).toHaveBeenCalledWith('ABC');
  });

});
