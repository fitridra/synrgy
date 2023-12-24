import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Create from './create';
import '@testing-library/jest-dom';
import useAction from './create.hooks';

jest.mock('./create.hooks');

describe('Create Component', () => {
  it('renders create form', () => {
    const mockUseAction = useAction as jest.MockedFunction<typeof useAction>;
    mockUseAction.mockReturnValue({
      formValues: {},
      handleSubmit: jest.fn(),
      handleUploadImage: jest.fn(),
      loadingImage: false,
      loadingSubmit: false,
      setFormValues: jest.fn(),
      fileItem: undefined,
    });

    render(
      <MemoryRouter>
        <Create />
      </MemoryRouter>
    );

    expect(screen.getByText('Create new car')).toBeInTheDocument();
    expect(screen.getByLabelText('Plate')).toBeInTheDocument();
    expect(screen.getByLabelText('Manufacture')).toBeInTheDocument();
    expect(screen.getByLabelText('Model')).toBeInTheDocument();
    expect(screen.getByLabelText('Rent Per Day')).toBeInTheDocument();
    expect(screen.getByLabelText('Capacity')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Available At')).toBeInTheDocument();
    expect(screen.getByLabelText('Transmission')).toBeInTheDocument();
    expect(screen.getByLabelText('Available')).toBeInTheDocument();
    expect(screen.getByLabelText('Type')).toBeInTheDocument();
    expect(screen.getByLabelText('Year')).toBeInTheDocument();
    expect(screen.getByLabelText('Options')).toBeInTheDocument();
    expect(screen.getByLabelText('Specs')).toBeInTheDocument();
    expect(screen.getByLabelText('Upload Car Photo')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
});

  it('handles form submission', async () => {
    const mockUseAction = useAction as jest.MockedFunction<typeof useAction>;
    const handleSubmitMock = jest.fn();
    mockUseAction.mockReturnValue({
      formValues: {},
      handleSubmit: handleSubmitMock,
      handleUploadImage: jest.fn(),
      loadingImage: false,
      loadingSubmit: false,
      setFormValues: jest.fn(),
      fileItem: undefined,
    });

    render(
        <MemoryRouter>
        <Create />
      </MemoryRouter>
    );

    const submitButton = screen.getByRole('button', { name: /Submit/i });
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(handleSubmitMock).toHaveBeenCalled();
    });
  });

  it('handles image upload', async () => {
    const mockUseAction = useAction as jest.MockedFunction<typeof useAction>;
    const handleUploadImageMock = jest.fn();
    mockUseAction.mockReturnValue({
      formValues: {},
      handleSubmit: jest.fn(),
      handleUploadImage: handleUploadImageMock,
      loadingImage: false,
      loadingSubmit: false,
      setFormValues: jest.fn(),
      fileItem: undefined,
    });

    render(
        <MemoryRouter>
        <Create />
      </MemoryRouter>
    );

    const fileInput = screen.getByLabelText('Upload Car Photo').nextElementSibling as HTMLInputElement;
    const file = new File(['(content)'], 'car-photo.jpg', { type: 'image/jpeg' });
    Object.defineProperty(fileInput, 'files', {
      value: [file],
    });
    userEvent.upload(fileInput, file);

        await act(async () => {
        // Trigger the image upload operation
        fireEvent.change(fileInput, { target: { files: [file] } });
      
        // Wait for the asynchronous operation to complete
        await waitFor(() => {
          expect(handleUploadImageMock).toHaveBeenCalledWith(file);
        });
      });
  });
});