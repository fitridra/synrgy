import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Update from './update';
import '@testing-library/jest-dom';
import { useUpdate } from './update.hooks';

jest.mock('./update.hooks');

describe('Update Component', () => {
  it('renders update form', () => {
    const mockUseUpdate = useUpdate as jest.MockedFunction<typeof useUpdate>;
    mockUseUpdate.mockReturnValue({
      formValues: {
        plate: 'ABC123',
        manufacture: 'Toyota',
        model: 'Camry',
        rentPerDay: 50,
        capacity: 5,
        description: 'A spacious and comfortable car',
        availableAt: '2022-03-23T15:49:05.563Z',
        transmission: 'Automatic',
        available: true,
        type: 'Sedan',
        year: '2022',
        options: ['Leather Seats', 'GPS'],
        specs: ['Engine: V6', 'Mileage: 30 mpg']
      },
      loadingImage: false,
      loadingSubmit: false,
      fileItem: {
        url: 'https://example.com/car-photo.jpg',
        secure_url: 'https://example.com/car-photo.jpg',
      },
      setFormValues: jest.fn(),
      handleUploadImage: jest.fn(),
      handleFormChange: jest.fn(),
      handleSubmit: jest.fn(),
    });

    render(
        <Update />
    );

    expect(screen.getByLabelText('Plate')).toHaveValue('ABC123');
    expect(screen.getByLabelText('Manufacture')).toHaveValue('Toyota');
    expect(screen.getByLabelText('Model')).toHaveValue('Camry');
    expect(screen.getByLabelText('Rent Per Day')).toHaveValue('50');
    expect(screen.getByLabelText('Capacity')).toHaveValue('5');
    expect(screen.getByLabelText('Description')).toHaveValue('A spacious and comfortable car');
    expect(screen.getByLabelText('Available At')).toHaveValue('2022-03-23T15:49:05.563Z');
    expect(screen.getByLabelText('Transmission')).toHaveValue('Automatic');
    expect(screen.getByLabelText('Type')).toHaveValue('Sedan');
    expect(screen.getByLabelText('Year')).toHaveValue('2022');
    expect(screen.getByLabelText('Options')).toHaveValue(['Leather Seats', 'GPS']);
    expect(screen.getByLabelText('Specs')).toHaveValue(['Engine: V6', 'Mileage: 30 mpg']);

  });

  it('handles form submission', async () => {
    const mockUseUpdate = useUpdate as jest.MockedFunction<typeof useUpdate>;
    const handleSubmitMock = jest.fn();
    mockUseUpdate.mockReturnValue({
      formValues: {
        plate: 'ABC123',
        manufacture: 'Toyota',
        model: 'Camry',
        rentPerDay: 50,
        capacity: 5,
        description: 'A spacious and comfortable car',
        availableAt: '2022-03-23T15:49:05.563Z',
        transmission: 'Automatic',
        available: true,
        type: 'Sedan',
        year: '2022',
        options: ['Leather Seats', 'GPS'],
        specs: ['Engine: V6', 'Mileage: 30 mpg']
      },
      loadingImage: false,
      loadingSubmit: false,
      fileItem: {
        url: 'https://example.com/car-photo.jpg',
        secure_url: 'https://example.com/car-photo.jpg',
      },
      setFormValues: jest.fn(),
      handleUploadImage: jest.fn(),
      handleFormChange: jest.fn(),
      handleSubmit: handleSubmitMock,
    });

    render(
        <Update />
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(handleSubmitMock).toHaveBeenCalled();
    });
  });

  it('handles image upload', () => {
    const mockUseUpdate = useUpdate as jest.MockedFunction<typeof useUpdate>;
    const handleUploadImageMock = jest.fn();

    const sampleFormValues = {
      plate: 'ABC123',
      manufacture: 'Toyota',
      model: 'Camry',
      rentPerDay: 50,
      capacity: 5,
      description: 'A spacious and comfortable car',
      availableAt: '2022-03-23T15:49:05.563Z',
      transmission: 'Automatic',
      available: true,
      type: 'Sedan',
      year: '2022',
      options: ['Leather Seats', 'GPS'],
      specs: ['Engine: V6', 'Mileage: 30 mpg']
    };

    const sampleFileItem = {
      url: 'https://example.com/car-photo.jpg',
      secure_url: 'https://example.com/car-photo.jpg',
    };

    mockUseUpdate.mockReturnValue({
      formValues: sampleFormValues,
      loadingImage: false,
      loadingSubmit: false,
      fileItem: sampleFileItem,
      setFormValues: jest.fn(),
      handleUploadImage: handleUploadImageMock,
      handleFormChange: jest.fn(),
      handleSubmit: jest.fn(),
    });

    render(
        <Update />
    );

    const fileInput = screen.getByLabelText('Upload Car Photo').nextElementSibling as HTMLInputElement;
    const file = new File(['(content)'], 'car-photo.jpg', { type: 'image/jpeg' });
    Object.defineProperty(fileInput, 'files', {
      value: [file],
    });
    userEvent.upload(fileInput, file);

    expect(handleUploadImageMock).toHaveBeenCalledWith(file);
  });
});