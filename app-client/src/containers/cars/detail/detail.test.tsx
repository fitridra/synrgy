import { render, screen } from '@testing-library/react';
import CarDetail from './detail';
import '@testing-library/jest-dom';
import { useDetail } from './detail.hooks';

jest.mock('./detail.hooks');

describe('CarDetail Component', () => {
  it('renders loading message when loading', () => {
    (useDetail as jest.Mock).mockReturnValue({ loading: true });

    render(
        <CarDetail />
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders "Car not found." when car is not available', () => {
    (useDetail as jest.Mock).mockReturnValue({ loading: false, car: null });

    render(
        <CarDetail />
    );

    expect(screen.getByText('Car not found.')).toBeInTheDocument();
  });

  it('renders car details when available', () => {
    const carDetails = {
      id: '1',
      plate: 'ABC123',
      manufacture: 'Toyota',
      model: 'Camry',
      rentPerDay: 50,
      capacity: 5,
      description: 'A spacious and comfortable car',
      availableAt: 'Some location',
      transmission: 'Automatic',
      available: true,
      type: 'Sedan',
      year: 2022,
      options: ['Leather Seats', 'GPS'],
      specs: ['Engine: V6', 'Mileage: 30 mpg'],
    };

    (useDetail as jest.Mock).mockReturnValue({ loading: false, car: carDetails });

    render(
        <CarDetail />
    );

    expect(screen.getByText('Car Detail')).toBeInTheDocument();
    expect(screen.getByText('Detail Information')).toBeInTheDocument();
    expect(screen.getByText(`Plate: ${carDetails.plate}`)).toBeInTheDocument();
    expect(screen.getByText(`Manufacture: ${carDetails.manufacture}`)).toBeInTheDocument();
    expect(screen.getByText(`Model: ${carDetails.model}`)).toBeInTheDocument();
    expect(screen.getByText(`Rent Per Day: ${carDetails.rentPerDay}`)).toBeInTheDocument();
    expect(screen.getByText(`Capacity: ${carDetails.capacity}`)).toBeInTheDocument();
    expect(screen.getByText(`Description: ${carDetails.description}`)).toBeInTheDocument();
    expect(screen.getByText(`Available At: ${carDetails.availableAt}`)).toBeInTheDocument();
    expect(screen.getByText(`Transmission: ${carDetails.transmission}`)).toBeInTheDocument();
    expect(screen.getByText(`Available: ${carDetails.available}`)).toBeInTheDocument();
    expect(screen.getByText(`Type: ${carDetails.type}`)).toBeInTheDocument();
    expect(screen.getByText(`Year: ${carDetails.year}`)).toBeInTheDocument();
    expect(screen.getByText(`Options: ${carDetails.options}`)).toBeInTheDocument();
    expect(screen.getByText(`Specs: ${carDetails.specs}`)).toBeInTheDocument();
    expect(screen.getByAltText('Car Image')).toBeInTheDocument();
  });

});